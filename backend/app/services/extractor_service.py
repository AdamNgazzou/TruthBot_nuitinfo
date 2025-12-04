"""
Text extraction service
Handles extraction of text from various file types
"""
import PyPDF2
from docx import Document
from PIL import Image
import pytesseract
from typing import Optional


class ExtractorService:
    """Service for extracting text from different file types"""
    
    @staticmethod
    def extract_from_pdf(file_path: str) -> str:
        """
        Extract text from PDF file
        
        Args:
            file_path: Path to PDF file
            
        Returns:
            Extracted text
        """
        text = ""
        try:
            with open(file_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                for page in reader.pages:
                    text += page.extract_text()
        except Exception as e:
            raise Exception(f"Error extracting PDF: {str(e)}")
        return text
    
    @staticmethod
    def extract_from_docx(file_path: str) -> str:
        """
        Extract text from DOCX file
        
        Args:
            file_path: Path to DOCX file
            
        Returns:
            Extracted text
        """
        try:
            doc = Document(file_path)
            text = "\n".join([para.text for para in doc.paragraphs])
            return text
        except Exception as e:
            raise Exception(f"Error extracting DOCX: {str(e)}")
    
    @staticmethod
    def extract_from_txt(file_path: str) -> str:
        """
        Extract text from TXT file
        
        Args:
            file_path: Path to TXT file
            
        Returns:
            Extracted text
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except Exception as e:
            raise Exception(f"Error reading TXT: {str(e)}")
    
    @staticmethod
    def extract_from_image(file_path: str) -> str:
        """
        Extract text from image using OCR
        
        Args:
            file_path: Path to image file
            
        Returns:
            Extracted text
        """
        try:
            image = Image.open(file_path)
            text = pytesseract.image_to_string(image)
            return text
        except Exception as e:
            raise Exception(f"Error extracting from image: {str(e)}")
    
    def extract_text(self, file_path: str, file_type: str) -> str:
        """
        Extract text based on file type
        
        Args:
            file_path: Path to file
            file_type: File extension (pdf, docx, txt, jpg, png, etc.)
            
        Returns:
            Extracted text
        """
        file_type = file_type.lower()
        
        print(f"[ExtractorService] Extracting text from {file_type} file: {file_path}")
        
        if file_type == 'pdf':
            text = self.extract_from_pdf(file_path)
        elif file_type in ['docx', 'doc']:
            text = self.extract_from_docx(file_path)
        elif file_type == 'txt':
            text = self.extract_from_txt(file_path)
        elif file_type in ['jpg', 'jpeg', 'png', 'gif']:
            text = self.extract_from_image(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")
        
        print(f"[ExtractorService] Extracted {len(text)} characters")
        return text
