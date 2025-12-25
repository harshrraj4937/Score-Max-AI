# NotebookLLM Backend - RAG Service

This is the backend service for the NotebookLLM application, providing PDF-based Retrieval Augmented Generation (RAG) capabilities using Mistral AI.

## Features

- PDF text extraction and processing
- Document chunking with overlap
- Mistral AI embeddings generation
- ChromaDB vector storage
- Context-aware Q&A with citations
- Streaming responses

## Tech Stack

- **FastAPI** - Modern async web framework
- **PyPDF2** - PDF text extraction
- **Mistral AI** - Embeddings and chat completion
- **ChromaDB** - Vector database
- **Python 3.11+**

## Setup

### Local Development

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Create `.env` file:
```bash
echo "MISTRAL_API_KEY=your_mistral_api_key" > .env
```

3. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
```

### Docker

Build and run with Docker:
```bash
docker build -f Dockerfile.backend -t notebookllm-backend .
docker run -p 5000:5000 -e MISTRAL_API_KEY=your_key notebookllm-backend
```

## API Endpoints

### Upload PDF
```bash
POST /api/resources/upload
Content-Type: multipart/form-data

Response:
{
  "resource_id": "uuid",
  "filename": "document.pdf",
  "page_count": 25,
  "status": "success",
  "message": "Successfully processed...",
  "upload_date": "ISO date"
}
```

### Chat with PDF
```bash
POST /api/chat
Content-Type: application/json

{
  "question": "What is photosynthesis?",
  "resource_id": "uuid",
  "conversation_history": []
}

Response:
{
  "answer": "Photosynthesis is...",
  "citations": [
    {
      "page": 12,
      "text": "excerpt...",
      "relevance_score": 0.95
    }
  ],
  "resource_id": "uuid"
}
```

### Get Resource Info
```bash
GET /api/resources/{resource_id}

Response:
{
  "resource_id": "uuid",
  "filename": "document.pdf",
  "page_count": 25,
  "upload_date": "ISO date",
  "status": "ready",
  "chunk_count": 150
}
```

## Architecture

```
PDF Upload → Text Extraction → Chunking → Embeddings → Vector Store
                                                             ↓
Question → Embedding → Vector Search → Context → Mistral AI → Answer
```

## Configuration

Edit `app/config.py` to customize:
- Chunk size and overlap
- Top-k retrieval results
- File size limits
- Model selection

## Directory Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration
│   ├── models.py            # Pydantic models
│   └── services/
│       ├── pdf_processor.py # PDF extraction
│       ├── embeddings.py    # Mistral embeddings
│       ├── vector_store.py  # ChromaDB
│       └── rag_service.py   # RAG pipeline
├── uploads/                 # Uploaded PDFs
├── chroma_db/              # Vector database
└── requirements.txt
```

