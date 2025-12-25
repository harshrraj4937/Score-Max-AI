from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UploadResponse(BaseModel):
    """Response model for PDF upload"""
    resource_id: str
    filename: str
    page_count: int
    status: str
    message: str
    upload_date: str

class ChatRequest(BaseModel):
    """Request model for chat"""
    question: str = Field(..., min_length=1, max_length=1000)
    resource_id: str
    conversation_history: Optional[List[dict]] = []

class Citation(BaseModel):
    """Citation with page number and text"""
    page: int
    text: str
    relevance_score: float

class ChatResponse(BaseModel):
    """Response model for chat"""
    answer: str
    citations: List[Citation]
    resource_id: str

class ResourceInfo(BaseModel):
    """Resource metadata"""
    resource_id: str
    filename: str
    page_count: int
    upload_date: str
    status: str
    chunk_count: int

class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    detail: str

