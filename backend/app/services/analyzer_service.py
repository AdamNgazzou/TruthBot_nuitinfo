"""
Main analysis orchestrator service
Coordinates the analysis pipeline
"""
from app.services.gemini_service import GeminiService
from app.services.extractor_service import ExtractorService
from app.models import AnalysisResult, ReliabilityLevel
import json
from typing import Dict, Any


class AnalyzerService:
    """Main service that orchestrates the analysis pipeline"""
    
    def __init__(self):
        """Initialize services"""
        self.gemini_service = GeminiService()
        self.extractor_service = ExtractorService()
    
    def analyze_file(self, file_path: str, file_type: str) -> AnalysisResult:
        """
        Analyze a file through the complete pipeline
        
        Args:
            file_path: Path to the file
            file_type: File extension
            
        Returns:
            AnalysisResult with findings
        """
        # Step 1: Extract content
        content = self.extractor_service.extract_text(file_path, file_type)
        
        # Step 2: Analyze with Gemini
        analysis = self.gemini_service.analyze_text(content)
        
        # Step 3: Parse results
        result = self._parse_analysis(content, analysis)
        
        return result
    
    def analyze_image(self, file_path: str) -> AnalysisResult:
        """
        Analyze an image through Gemini Vision
        
        Args:
            file_path: Path to image file
            
        Returns:
            AnalysisResult with findings
        """
        # Open image
        with open(file_path, 'rb') as f:
            image_data = f.read()
        
        # Analyze with Gemini Vision
        analysis = self.gemini_service.analyze_image(image_data)
        
        # Parse results
        result = self._parse_analysis("Image content", analysis)
        
        return result
    
    def analyze_text(self, content: str) -> AnalysisResult:
        """
        Analyze raw text content
        
        Args:
            content: Text to analyze
            
        Returns:
            AnalysisResult with findings
        """
        # Analyze with Gemini
        analysis = self.gemini_service.analyze_text(content)
        
        # Parse results
        result = self._parse_analysis(content, analysis)
        
        return result
    
    def _parse_analysis(self, content: str, analysis: str) -> AnalysisResult:
        """
        Parse Gemini analysis into structured format
        
        Args:
            content: Original content
            analysis: Gemini analysis text
            
        Returns:
            Structured AnalysisResult
        """
        # Default values
        reliability = ReliabilityLevel.MEDIUM
        claims = []
        sources = []
        recommendations = []
        
        # Parse reliability from analysis
        analysis_lower = analysis.lower()
        if "unreliable" in analysis_lower:
            reliability = ReliabilityLevel.UNRELIABLE
        elif "high" in analysis_lower and "reliability" in analysis_lower:
            reliability = ReliabilityLevel.HIGH
        elif "low" in analysis_lower and "reliability" in analysis_lower:
            reliability = ReliabilityLevel.LOW
        else:
            reliability = ReliabilityLevel.MEDIUM
        
        # Extract recommendations if available
        if "recommendation" in analysis_lower:
            lines = analysis.split('\n')
            for i, line in enumerate(lines):
                if "recommendation" in line.lower():
                    recommendations = [l.strip() for l in lines[i+1:i+4] if l.strip()]
                    break
        
        return AnalysisResult(
            content=content[:500],  # Preview first 500 chars
            reliability_level=reliability,
            analysis=analysis,
            claims=claims,
            sources=sources,
            recommendations=recommendations
        )
