import PyPDF2
from typing import List, Dict
import re

class PDFProcessor:
    """Service for extracting and chunking PDF text"""
    
    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
    
    def extract_text_from_pdf(self, pdf_path: str) -> Dict[int, str]:
        """
        Extract text from PDF with page numbers
        
        Args:
            pdf_path: Path to PDF file
            
        Returns:
            Dictionary mapping page numbers to text content
        """
        page_texts = {}
        
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text = page.extract_text()
                    
                    # Clean up text
                    text = self._clean_text(text)
                    
                    if text.strip():
                        page_texts[page_num + 1] = text  # 1-indexed pages
        
        except Exception as e:
            raise Exception(f"Failed to extract PDF text: {str(e)}")
        
        return page_texts
    
    def _clean_text(self, text: str) -> str:
        """Clean extracted text"""
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        # Remove special characters that might cause issues
        text = text.strip()
        return text
    
    def chunk_text(self, page_texts: Dict[int, str]) -> List[Dict]:
        """
        Chunk text with overlap, preserving page information
        
        Args:
            page_texts: Dictionary of page numbers to text
            
        Returns:
            List of chunks with metadata
        """
        chunks = []
        chunk_id = 0
        
        for page_num, text in page_texts.items():
            # Simple word-based chunking (approximation of token count)
            words = text.split()
            
            # If page is shorter than chunk size, keep it as one chunk
            if len(words) <= self.chunk_size:
                chunks.append({
                    'chunk_id': chunk_id,
                    'page': page_num,
                    'text': text,
                    'word_count': len(words)
                })
                chunk_id += 1
            else:
                # Create overlapping chunks
                start = 0
                while start < len(words):
                    end = start + self.chunk_size
                    chunk_words = words[start:end]
                    chunk_text = ' '.join(chunk_words)
                    
                    chunks.append({
                        'chunk_id': chunk_id,
                        'page': page_num,
                        'text': chunk_text,
                        'word_count': len(chunk_words)
                    })
                    
                    chunk_id += 1
                    start += self.chunk_size - self.chunk_overlap
                    
                    # Break if we've covered the text
                    if end >= len(words):
                        break
        
        return chunks
    
    def get_page_count(self, pdf_path: str) -> int:
        """Get the number of pages in a PDF"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                return len(pdf_reader.pages)
        except Exception as e:
            raise Exception(f"Failed to read PDF: {str(e)}")

