"""
File handling utilities
"""
import os
from pathlib import Path
from fastapi import UploadFile
from app.config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS, MAX_FILE_SIZE
import logging

logger = logging.getLogger(__name__)


class FileHandler:
    """Handles file operations"""
    
    def __init__(self):
        """Initialize file handler"""
        # Create upload folder if it doesn't exist
        Path(UPLOAD_FOLDER).mkdir(parents=True, exist_ok=True)
        logger.info(f"Upload folder: {UPLOAD_FOLDER}")
    
    def is_allowed_file(self, filename: str) -> bool:
        """
        Check if file type is allowed
        
        Args:
            filename: Name of the file
            
        Returns:
            True if allowed, False otherwise
        """
        ext = Path(filename).suffix.lower()
        allowed = ext in ALLOWED_EXTENSIONS
        logger.info(f"File {filename} - extension: {ext} - allowed: {allowed}")
        return allowed
    
    def save_file(self, file: UploadFile, file_id: str) -> str:
        """
        Save uploaded file to disk
        
        Args:
            file: UploadFile object
            file_id: Unique file identifier
            
        Returns:
            Path to saved file
        """
        ext = Path(file.filename).suffix.lower()
        file_path = Path(UPLOAD_FOLDER) / f"{file_id}{ext}"
        
        logger.info(f"Saving file to: {file_path}")
        
        # Read and save file
        with open(file_path, 'wb') as f:
            contents = file.file.read()
            logger.info(f"Read {len(contents)} bytes from uploaded file")
            if len(contents) > MAX_FILE_SIZE:
                raise Exception("File size exceeds maximum allowed")
            f.write(contents)
        
        logger.info(f"File saved successfully: {file_path}")
        return str(file_path)
    
    def get_file_path(self, file_id: str) -> Path:
        """
        Get path to file by ID
        
        Args:
            file_id: File identifier
            
        Returns:
            Path object
        """
        # Search for file with this ID
        for file_path in Path(UPLOAD_FOLDER).glob(f"{file_id}.*"):
            return file_path
        raise FileNotFoundError(f"File {file_id} not found")
    
    def delete_file(self, file_id: str) -> bool:
        """
        Delete file by ID
        
        Args:
            file_id: File identifier
            
        Returns:
            True if deleted, False otherwise
        """
        try:
            file_path = self.get_file_path(file_id)
            file_path.unlink()
            return True
        except FileNotFoundError:
            return False
