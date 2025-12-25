from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import uuid
from datetime import datetime
from pathlib import Path

from .config import get_settings, Settings
from .models import (
    UploadResponse, ChatRequest, ChatResponse,
    ResourceInfo, Citation
)
from .services.pdf_processor import PDFProcessor
from .services.embeddings import EmbeddingService
from .services.vector_store import VectorStore
from .services.rag_service import RAGService

# Load settings early (required for middleware)
settings = get_settings()

# Initialize FastAPI app
app = FastAPI(
    title="NotebookLLM RAG API",
    description="Backend API for PDF-based Retrieval Augmented Generation",
    version="1.0.0"
)

# -------------------------
# CORS MIDDLEWARE (FIXED)
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global service instances
vector_store = None
embedding_service = None
rag_service = None
pdf_processor = None

# -------------------------
# STARTUP INITIALIZATION
# -------------------------
@app.on_event("startup")
async def startup_event():
    global vector_store, embedding_service, rag_service, pdf_processor

    # Create directories
    Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)
    Path(settings.chroma_persist_dir).mkdir(parents=True, exist_ok=True)

    pdf_processor = PDFProcessor(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap
    )

    embedding_service = EmbeddingService(
        api_key=settings.mistral_api_key,
        model=settings.mistral_embed_model
    )

    vector_store = VectorStore(
        persist_directory=settings.chroma_persist_dir,
        collection_name=settings.chroma_collection_name
    )

    rag_service = RAGService(
        mistral_api_key=settings.mistral_api_key,
        vector_store=vector_store,
        embedding_service=embedding_service,
        chat_model=settings.mistral_chat_model
    )

    print("✅ All services initialized successfully")

# -------------------------
# ROUTES
# -------------------------
@app.get("/")
async def root():
    return {
        "status": "ok",
        "service": "NotebookLLM RAG API",
        "version": "1.0.0"
    }

@app.post("/api/resources/upload", response_model=UploadResponse)
async def upload_pdf(
    file: UploadFile = File(...),
    settings: Settings = Depends(get_settings)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    resource_id = str(uuid.uuid4())
    file_path = os.path.join(settings.upload_dir, f"{resource_id}.pdf")

    content = await file.read()
    if len(content) > settings.max_upload_size:
        raise HTTPException(
            status_code=400,
            detail=f"File exceeds {settings.max_upload_size / (1024 * 1024)}MB"
        )

    with open(file_path, "wb") as f:
        f.write(content)

    page_texts = pdf_processor.extract_text_from_pdf(file_path)
    if not page_texts:
        raise HTTPException(status_code=400, detail="No text extracted")

    chunks = pdf_processor.chunk_text(page_texts)
    embeddings = await embedding_service.generate_embeddings(
        [c["text"] for c in chunks]
    )

    metadata = {
        "filename": file.filename,
        "page_count": len(page_texts),
        "upload_date": datetime.now().isoformat()
    }

    vector_store.add_document_chunks(
        resource_id=resource_id,
        chunks=chunks,
        embeddings=embeddings,
        metadata=metadata
    )

    return UploadResponse(
        resource_id=resource_id,
        filename=file.filename,
        page_count=len(page_texts),
        status="success",
        message="PDF processed successfully",
        upload_date=datetime.now().isoformat()
    )

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_pdf(request: ChatRequest):
    result = await rag_service.answer_question(
        question=request.question,
        resource_id=request.resource_id,
        conversation_history=request.conversation_history,
        top_k=settings.top_k_results
    )

    return ChatResponse(
        answer=result["answer"],
        citations=[
            Citation(**c) for c in result["citations"]
        ],
        resource_id=request.resource_id
    )

@app.post("/api/chat/stream")
async def chat_with_pdf_stream(request: ChatRequest):
    async def generate():
        async for chunk in rag_service.answer_question_stream(
            question=request.question,
            resource_id=request.resource_id,
            conversation_history=request.conversation_history,
            top_k=settings.top_k_results
        ):
            yield chunk

    return StreamingResponse(generate(), media_type="text/plain")
