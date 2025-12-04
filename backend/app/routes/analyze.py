"""
API routes for analysis endpoints
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from app.services.analyzer_service import AnalyzerService
from app.models import AnalysisRequest, AnalysisResult, FileUploadResponse
from app.utils.file_handler import FileHandler
import uuid
from pathlib import Path

router = APIRouter(prefix="/api", tags=["analysis"])
analyzer_service = AnalyzerService()
file_handler = FileHandler()


@router.post("/analyze/text", response_model=AnalysisResult)
async def analyze_text(request: AnalysisRequest):
    """
    Analyze text content for misinformation
    
    Args:
        request: AnalysisRequest with content
        
    Returns:
        AnalysisResult with analysis
    """
    try:
        result = analyzer_service.analyze_text(request.content)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze/upload", response_model=FileUploadResponse)
async def upload_and_analyze(file: UploadFile = File(...)):
    """
    Upload a file and analyze it
    
    Args:
        file: Uploaded file
        
    Returns:
        FileUploadResponse with upload details and analysis preview
    """
    try:
        # Validate file
        if not file_handler.is_allowed_file(file.filename):
            raise HTTPException(status_code=400, detail="File type not allowed")
        
        # Save file
        file_id = str(uuid.uuid4())
        file_path = file_handler.save_file(file, file_id)
        
        # Get file extension
        file_ext = Path(file.filename).suffix.lower()[1:]
        
        # Extract preview
        if file_ext in ['jpg', 'jpeg', 'png', 'gif']:
            preview = f"Image: {file.filename}"
        else:
            from app.services.extractor_service import ExtractorService
            extractor = ExtractorService()
            full_text = extractor.extract_text(file_path, file_ext)
            preview = full_text[:200]
        
        return FileUploadResponse(
            status="success",
            file_id=file_id,
            file_name=file.filename,
            content_preview=preview
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/analyze/{file_id}", response_model=AnalysisResult)
async def get_analysis(file_id: str):
    """
    Get analysis results for uploaded file
    
    Args:
        file_id: ID of the file to analyze
        
    Returns:
        AnalysisResult
    """
    try:
        file_path = file_handler.get_file_path(file_id)
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="File not found")
        
        # Determine file type
        file_ext = file_path.suffix.lower()[1:]
        
        # Analyze
        result = analyzer_service.analyze_file(str(file_path), file_ext)
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
