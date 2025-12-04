"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel
from typing import Optional, Dict, Any
from enum import Enum


class ReliabilityLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    UNRELIABLE = "unreliable"


class AnalysisRequest(BaseModel):
    content: str
    file_type: Optional[str] = None
    source_url: Optional[str] = None


class AnalysisResult(BaseModel):
    """Analysis result returned to frontend"""
    content: str
    reliability_level: ReliabilityLevel
    analysis: str
    claims: list[Dict[str, Any]]
    sources: list[str]
    recommendations: list[str]


class FileUploadResponse(BaseModel):
    """Response after file upload"""
    status: str
    file_id: str
    file_name: str
    content_preview: str
