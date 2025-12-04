# TruthBot - AI-Powered Misinformation Detection

An intelligent system that analyzes text and files to detect potential misinformation using Google's Gemini AI.

## 🌟 Features

- **Text Analysis**: Analyze tweets, articles, and any text content
- **Multi-Format Support**: Process PDF, DOCX, TXT, and image files
- **Image Analysis**: Detect manipulated images and misleading visual content
- **Smart Extraction**: Automatic text extraction from documents and images (OCR)
- **AI-Powered**: Uses Google Gemini for advanced content analysis
- **User-Friendly**: Modern, responsive web interface
- **Real-Time Results**: Fast analysis with detailed explanations

## 🏗️ Architecture

```
TruthBot
├── Backend (FastAPI)
│   ├── File Processing
│   ├── Text Extraction
│   ├── Gemini Integration
│   └── REST API
└── Frontend (HTML/CSS/JS)
    ├── Drag & Drop Upload
    ├── Text Input
    └── Results Display
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Google Gemini API Key
- Tesseract OCR (for image text extraction)

### Backend Setup

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

5. **Install Tesseract OCR:**
- **Ubuntu/Debian:** `sudo apt-get install tesseract-ocr`
- **macOS:** `brew install tesseract`
- **Windows:** Download from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)

6. **Run the server:**
```bash
python -m app.main
```

Server runs at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend:**
```bash
cd frontend
```

2. **Open with a local server:**

Option 1 - Python:
```bash
python -m http.server 3000
```

Option 2 - Node.js:
```bash
npx serve -p 3000
```

Option 3 - VS Code Live Server extension

3. **Access the app:**
Open `http://localhost:3000` in your browser

## 📖 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### API Endpoints

#### Analyze Text
```bash
POST /api/analyze/text
Content-Type: application/json

{
  "text": "Your text content here..."
}
```

#### Analyze File
```bash
POST /api/analyze/file
Content-Type: multipart/form-data

file: [your file]
```

#### Health Check
```bash
GET /api/health
```

## 🎯 Usage

### Text Analysis
1. Click "Text Analysis" tab
2. Paste your content
3. Click "Analyze Text"
4. View detailed results

### File Analysis
1. Click "File Upload" tab
2. Drag & drop or browse for file
3. Click "Analyze File"
4. View comprehensive analysis

## 📊 Analysis Output

```json
{
  "label": "reliable|doubtful|needs_verification|potentially_false|unknown",
  "confidence": 0.85,
  "reasons": [
    "Emotionally charged language detected",
    "No verifiable sources cited"
  ],
  "tips": [
    "Cross-check with reputable news sources",
    "Look for original source documentation"
  ],
  "content_preview": "First 200 characters...",
  "analysis_details": "Detailed AI analysis..."
}
```

## 🔧 Configuration

Edit `backend/app/config.py` or `.env` for:
- Maximum file size
- Allowed file extensions
- CORS origins
- Upload directory

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Gemini AI**: Google's advanced language model
- **PyPDF2**: PDF text extraction
- **python-docx**: DOCX processing
- **Pillow + Tesseract**: Image OCR
- **Pydantic**: Data validation

### Frontend
- **HTML5/CSS3**: Modern web standards
- **Vanilla JavaScript**: No framework dependencies
- **Responsive Design**: Works on all devices

## 📁 Project Structure

```
truthbot/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── config.py            # Settings
│   │   ├── models.py            # Data models
│   │   ├── services/
│   │   │   ├── gemini_service.py
│   │   │   ├── extractor_service.py
│   │   │   └── analyzer_service.py
│   │   ├── routes/
│   │   │   └── analyze.py
│   │   └── utils/
│   │       └── file_handler.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       └── api.js
└── README.md
```

## 🔒 Security Considerations

- File size limits enforced (10MB default)
- File type validation
- Automatic cleanup of uploaded files
- CORS configuration for production
- No permanent storage of user data

## 🎨 Customization

### Adding New File Types

1. Update `ALLOWED_EXTENSIONS` in `config.py`
2. Add extraction logic in `extractor_service.py`
3. Update `get_file_type()` in `file_handler.py`

### Styling

Modify `frontend/css/style.css` to customize:
- Color scheme (CSS variables)
- Layout and spacing
- Animations and transitions

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed
- Check that all dependencies are installed
- Verify `.env` file has valid Gemini API key

### File analysis fails
- Ensure Tesseract OCR is installed
- Check file permissions in uploads directory
- Verify file size is under limit

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check CORS settings in `config.py`
- Update API_BASE_URL in `frontend/js/api.js` if needed

## 📝 License

This project was created for Nuit de l'Info 2024 - AI4GOOD Challenge

## 🤝 Contributing

Contributions welcome! Please feel free to submit issues and pull requests.

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for Nuit de l'Info 2024** 