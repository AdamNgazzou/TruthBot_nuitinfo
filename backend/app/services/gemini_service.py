"""
Gemini AI integration service
Handles communication with Google Gemini API
"""
import google.generativeai as genai
from app.config import GEMINI_API_KEY


class GeminiService:
    """Service for interacting with Gemini API"""
    
    def __init__(self):
        """Initialize Gemini with API key"""
        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
        self.vision_model = genai.GenerativeModel('gemini-pro-vision')
    
    def analyze_text(self, content: str) -> str:
        """
        Analyze text content using Gemini
        
        Args:
            content: Text to analyze
            
        Returns:
            Analysis result from Gemini
        """
        prompt = f"""Analyze the following content for misinformation, bias, and reliability:

{content}

Please provide:
1. Overall reliability assessment (high/medium/low/unreliable)
2. Key claims identified
3. Fact-check results
4. Potential biases or red flags
5. Recommendations for verification

Format the response clearly with sections."""
        
        response = self.model.generate_content(prompt)
        return response.text
    
    def analyze_image(self, image_data) -> str:
        """
        Analyze image using Gemini Vision
        
        Args:
            image_data: Image file or bytes
            
        Returns:
            Analysis result from Gemini
        """
        prompt = """Analyze this image for misinformation, manipulated content, or misleading elements.
        
Please provide:
1. Content description
2. Signs of manipulation or fakery
3. Reliability assessment
4. Recommendations"""
        
        response = self.vision_model.generate_content([prompt, image_data])
        return response.text
