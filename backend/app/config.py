import os
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings"""
    
    # API Configuration
    app_name: str = "NotebookLLM RAG API"
    debug: bool = True
    
    # Mistral AI Configuration
    mistral_api_key: str = os.getenv("MISTRAL_API_KEY", "")
    mistral_embed_model: str = "mistral-embed"
    mistral_chat_model: str = "mistral-large-latest"
    
    # File Upload Configuration
    upload_dir: str = "./uploads"
    max_upload_size: int = 20 * 1024 * 1024  # 20MB
    allowed_extensions: set = {".pdf"}
    
    # ChromaDB Configuration
    chroma_persist_dir: str = "./chroma_db"
    chroma_collection_name: str = "pdf_documents"
    
    # RAG Configuration
    chunk_size: int = 500  # tokens
    chunk_overlap: int = 50  # tokens
    top_k_results: int = 5  # number of chunks to retrieve
    
    # CORS
    cors_origins: list = ["http://localhost:5173", "http://localhost:3000", "http://localhost:80", "*"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()

