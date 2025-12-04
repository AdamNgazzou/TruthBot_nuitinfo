"""
Configuration settings for TruthBot
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Gemini API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# File Upload Configuration
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = {'.pdf', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif'}
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')

# API Configuration
API_TITLE = "TruthBot - Misinformation Analyzer"
API_VERSION = "1.0.0"
API_DESCRIPTION = "Analyze documents and images for misinformation using Gemini AI"
