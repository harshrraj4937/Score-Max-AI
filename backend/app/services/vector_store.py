import chromadb
from chromadb.config import Settings
from typing import List, Dict, Optional
import uuid

class VectorStore:
    """Service for storing and retrieving document chunks using ChromaDB"""
    
    def __init__(self, persist_directory: str, collection_name: str):
        # Initialize ChromaDB with persistence
        self.client = chromadb.Client(Settings(
            persist_directory=persist_directory,
            anonymized_telemetry=False
        ))
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}  # Use cosine similarity
        )
    
    def add_document_chunks(
        self, 
        resource_id: str,
        chunks: List[Dict],
        embeddings: List[List[float]],
        metadata: Dict
    ) -> int:
        """
        Add document chunks to the vector store
        
        Args:
            resource_id: Unique identifier for the resource
            chunks: List of chunk dictionaries with text and metadata
            embeddings: List of embedding vectors for each chunk
            metadata: Document-level metadata (filename, page_count, etc.)
            
        Returns:
            Number of chunks added
        """
        try:
            ids = []
            texts = []
            chunk_metadata = []
            
            for i, chunk in enumerate(chunks):
                # Create unique ID for each chunk
                chunk_id = f"{resource_id}_chunk_{i}"
                ids.append(chunk_id)
                texts.append(chunk['text'])
                
                # Combine chunk metadata with document metadata
                meta = {
                    'resource_id': resource_id,
                    'chunk_id': chunk['chunk_id'],
                    'page': chunk['page'],
                    'word_count': chunk['word_count'],
                    'filename': metadata.get('filename', ''),
                }
                chunk_metadata.append(meta)
            
            # Add to ChromaDB
            self.collection.add(
                ids=ids,
                embeddings=embeddings,
                documents=texts,
                metadatas=chunk_metadata
            )
            
            return len(chunks)
            
        except Exception as e:
            raise Exception(f"Failed to add chunks to vector store: {str(e)}")
    
    def search_similar_chunks(
        self, 
        query_embedding: List[float],
        resource_id: str,
        top_k: int = 5
    ) -> List[Dict]:
        """
        Search for similar chunks in the vector store
        
        Args:
            query_embedding: Embedding vector of the query
            resource_id: Filter results to specific resource
            top_k: Number of results to return
            
        Returns:
            List of similar chunks with metadata and relevance scores
        """
        try:
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=top_k,
                where={"resource_id": resource_id}
            )
            
            # Format results
            chunks = []
            if results['ids'] and len(results['ids'][0]) > 0:
                for i in range(len(results['ids'][0])):
                    chunk = {
                        'text': results['documents'][0][i],
                        'page': results['metadatas'][0][i]['page'],
                        'chunk_id': results['metadatas'][0][i]['chunk_id'],
                        'relevance_score': 1 - results['distances'][0][i],  # Convert distance to similarity
                    }
                    chunks.append(chunk)
            
            return chunks
            
        except Exception as e:
            raise Exception(f"Failed to search vector store: {str(e)}")
    
    def delete_document(self, resource_id: str) -> bool:
        """Delete all chunks for a specific resource"""
        try:
            # Get all chunks for this resource
            results = self.collection.get(
                where={"resource_id": resource_id}
            )
            
            if results['ids']:
                self.collection.delete(ids=results['ids'])
                return True
            
            return False
            
        except Exception as e:
            raise Exception(f"Failed to delete document: {str(e)}")
    
    def get_resource_chunk_count(self, resource_id: str) -> int:
        """Get the number of chunks for a specific resource"""
        try:
            results = self.collection.get(
                where={"resource_id": resource_id}
            )
            return len(results['ids']) if results['ids'] else 0
        except:
            return 0

