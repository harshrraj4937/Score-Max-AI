from mistralai import Mistral
from typing import List, Dict, AsyncIterator
from .embeddings import EmbeddingService
from .vector_store import VectorStore
from .pdf_processor import PDFProcessor

class RAGService:
    """Retrieval Augmented Generation service"""
    
    def __init__(
        self,
        mistral_api_key: str,
        vector_store: VectorStore,
        embedding_service: EmbeddingService,
        chat_model: str = "mistral-large-latest"
    ):
        self.mistral_client = Mistral(api_key=mistral_api_key)
        self.vector_store = vector_store
        self.embedding_service = embedding_service
        self.chat_model = chat_model
    
    async def answer_question(
        self,
        question: str,
        resource_id: str,
        conversation_history: List[Dict] = None,
        top_k: int = 5
    ) -> Dict:
        """
        Answer a question using RAG pipeline
        
        Args:
            question: User's question
            resource_id: ID of the PDF resource to query
            conversation_history: Previous conversation messages
            top_k: Number of relevant chunks to retrieve
            
        Returns:
            Dictionary with answer and citations
        """
        try:
            # Step 1: Generate embedding for the question
            question_embedding = await self.embedding_service.generate_single_embedding(question)
            
            # Step 2: Retrieve relevant chunks
            relevant_chunks = self.vector_store.search_similar_chunks(
                query_embedding=question_embedding,
                resource_id=resource_id,
                top_k=top_k
            )
            
            if not relevant_chunks:
                return {
                    'answer': "I couldn't find relevant information in the uploaded PDF to answer your question.",
                    'citations': []
                }
            
            # Step 3: Build context from retrieved chunks
            context = self._build_context(relevant_chunks)
            
            # Step 4: Create enhanced prompt
            system_prompt = self._create_system_prompt(context)
            
            # Step 5: Prepare messages for Mistral
            messages = [
                {"role": "system", "content": system_prompt}
            ]
            
            # Add conversation history if provided
            if conversation_history:
                for msg in conversation_history[-6:]:  # Last 3 exchanges
                    messages.append({
                        "role": msg.get("role", "user"),
                        "content": msg.get("content", "")
                    })
            
            # Add current question
            messages.append({"role": "user", "content": question})
            
            # Step 6: Get answer from Mistral
            response = self.mistral_client.chat.complete(
                model=self.chat_model,
                messages=messages,
                temperature=0.7,
                max_tokens=1000
            )
            
            answer = response.choices[0].message.content
            
            # Step 7: Format citations
            citations = [
                {
                    'page': chunk['page'],
                    'text': chunk['text'][:200] + "..." if len(chunk['text']) > 200 else chunk['text'],
                    'relevance_score': chunk['relevance_score']
                }
                for chunk in relevant_chunks[:3]  # Top 3 citations
            ]
            
            return {
                'answer': answer,
                'citations': citations
            }
            
        except Exception as e:
            raise Exception(f"RAG pipeline failed: {str(e)}")
    
    async def answer_question_stream(
        self,
        question: str,
        resource_id: str,
        conversation_history: List[Dict] = None,
        top_k: int = 5
    ) -> AsyncIterator[str]:
        """
        Answer question with streaming response
        
        Yields:
            Chunks of the answer text
        """
        try:
            # Retrieve context (same as non-streaming)
            question_embedding = await self.embedding_service.generate_single_embedding(question)
            relevant_chunks = self.vector_store.search_similar_chunks(
                query_embedding=question_embedding,
                resource_id=resource_id,
                top_k=top_k
            )
            
            if not relevant_chunks:
                yield "I couldn't find relevant information in the uploaded PDF to answer your question."
                return
            
            context = self._build_context(relevant_chunks)
            system_prompt = self._create_system_prompt(context)
            
            messages = [{"role": "system", "content": system_prompt}]
            
            if conversation_history:
                for msg in conversation_history[-6:]:
                    messages.append({
                        "role": msg.get("role", "user"),
                        "content": msg.get("content", "")
                    })
            
            messages.append({"role": "user", "content": question})
            
            # Stream response from Mistral
            stream = self.mistral_client.chat.stream(
                model=self.chat_model,
                messages=messages,
                temperature=0.7,
                max_tokens=1000
            )
            
            for chunk in stream:
                if chunk.data.choices[0].delta.content:
                    yield chunk.data.choices[0].delta.content
            
        except Exception as e:
            yield f"Error: {str(e)}"
    
    def _build_context(self, chunks: List[Dict]) -> str:
        """Build context string from retrieved chunks"""
        context_parts = []
        
        for chunk in chunks:
            context_parts.append(f"[Page {chunk['page']}]: {chunk['text']}")
        
        return "\n\n".join(context_parts)
    
    def _create_system_prompt(self, context: str) -> str:
        """Create system prompt with context"""
        return f"""You are an AI study assistant helping students learn from their study materials. 
You have access to content from a PDF document uploaded by the student.

Answer questions based ONLY on the provided context from the PDF. If the answer is not in the context, say so clearly.

When you reference information, mention the page number in square brackets like [Page X].

CONTEXT FROM PDF:
{context}

INSTRUCTIONS:
- Answer accurately based on the context
- Cite page numbers when referencing specific information
- Be clear and educational
- If information is not in the context, acknowledge it
- Break down complex concepts into simpler explanations when helpful"""

