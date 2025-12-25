from mistralai import Mistral
from typing import List
import numpy as np

class EmbeddingService:
    """Service for generating embeddings using Mistral AI"""
    
    def __init__(self, api_key: str, model: str = "mistral-embed"):
        if not api_key:
            raise ValueError("Mistral API key is required")
        
        self.client = Mistral(api_key=api_key)
        self.model = model
    
    async def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for a list of texts
        
        Args:
            texts: List of text strings to embed
            
        Returns:
            List of embedding vectors
        """
        try:
            # Mistral AI embeddings API
            response = self.client.embeddings.create(
                model=self.model,
                inputs=texts
            )
            
            # Extract embeddings from response
            embeddings = [item.embedding for item in response.data]
            return embeddings
            
        except Exception as e:
            raise Exception(f"Failed to generate embeddings: {str(e)}")
    
    async def generate_single_embedding(self, text: str) -> List[float]:
        """Generate embedding for a single text"""
        embeddings = await self.generate_embeddings([text])
        return embeddings[0]
    
    @staticmethod
    def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
        """Calculate cosine similarity between two vectors"""
        vec1 = np.array(vec1)
        vec2 = np.array(vec2)
        
        dot_product = np.dot(vec1, vec2)
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        return float(dot_product / (norm1 * norm2))

