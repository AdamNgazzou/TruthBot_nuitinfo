// DOM Elements
const textTab = document.getElementById('text-tab');
const fileTab = document.getElementById('file-tab');
const tabBtns = document.querySelectorAll('.tab-btn');
const textInput = document.getElementById('text-input');
const analyzeTextBtn = document.getElementById('analyze-text-btn');
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const fileInfo = document.getElementById('file-info');
const fileName = document.getElementById('file-name');
const analyzeFileBtn = document.getElementById('analyze-file-btn');
const loading = document.getElementById('loading');
const resultsSection = document.getElementById('results-section');
const newAnalysisBtn = document.getElementById('new-analysis-btn');

let selectedFile = null;

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Hide results when switching tabs
        hideResults();
    });
});

// Text Analysis
analyzeTextBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please enter some text to analyze');
        return;
    }
    
    if (text.length < 10) {
        alert('Please enter at least 10 characters');
        return;
    }
    
    showLoading();
    
    try {
        const result = await api.analyzeText(text);
        displayResults(result);
    } catch (error) {
        alert(`Analysis failed: ${error.message}`);
        hideLoading();
    }
});

// File Upload Handlers
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

uploadZone.addEventListener('click', () => {
    fileInput.click();
});

// Drag and Drop
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelection(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

function handleFileSelection(file) {
    selectedFile = file;
    fileName.textContent = file.name;
    fileInfo.style.display = 'block';
    uploadZone.style.display = 'none';
}

analyzeFileBtn.addEventListener('click', async () => {
    if (!selectedFile) {
        alert('Please select a file first');
        return;
    }
    
    showLoading();
    
    try {
        const result = await api.analyzeFile(selectedFile);
        displayResults(result);
        
        // Reset file selection
        selectedFile = null;
        fileInfo.style.display = 'none';
        uploadZone.style.display = 'block';
        fileInput.value = '';
    } catch (error) {
        alert(`File analysis failed: ${error.message}`);
        hideLoading();
    }
});

// New Analysis
newAnalysisBtn.addEventListener('click', () => {
    hideResults();
    textInput.value = '';
    selectedFile = null;
    fileInfo.style.display = 'none';
    uploadZone.style.display = 'block';
    fileInput.value = '';
});

// UI Helper Functions
function showLoading() {
    loading.style.display = 'block';
    resultsSection.style.display = 'none';
    analyzeTextBtn.disabled = true;
    analyzeFileBtn.disabled = true;
}

function hideLoading() {
    loading.style.display = 'none';
    analyzeTextBtn.disabled = false;
    analyzeFileBtn.disabled = false;
}

function hideResults() {
    resultsSection.style.display = 'none';
}

function displayResults(result) {
    hideLoading();
    
    // Update badge
    const badge = document.getElementById('reliability-badge');
    const badgeText = document.getElementById('badge-text');
    
    badge.className = 'reliability-badge ' + result.label.replace('_', '-');
    badgeText.textContent = formatLabel(result.label);
    
    // Set badge icon
    const badgeIcon = badge.querySelector('.badge-icon');
    badgeIcon.textContent = getLabelIcon(result.label);
    
    // Update confidence
    const confidenceValue = document.getElementById('confidence-value');
    confidenceValue.textContent = Math.round(result.confidence * 100) + '%';
    
    // Update content preview
    const contentPreview = document.getElementById('content-preview');
    contentPreview.textContent = result.content_preview || 'No preview available';
    
    // Update reasons
    const reasonsList = document.getElementById('reasons-list');
    reasonsList.innerHTML = '';
    result.reasons.forEach(reason => {
        const li = document.createElement('li');
        li.textContent = reason;
        reasonsList.appendChild(li);
    });
    
    // Update tips
    const tipsList = document.getElementById('tips-list');
    tipsList.innerHTML = '';
    result.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
    
    // Update analysis details
    if (result.analysis_details) {
        const analysisDetails = document.getElementById('analysis-details');
        analysisDetails.textContent = result.analysis_details;
        document.getElementById('analysis-details-section').style.display = 'block';
    } else {
        document.getElementById('analysis-details-section').style.display = 'none';
    }
    
    // Show results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function formatLabel(label) {
    const labels = {
        'reliable': 'Reliable',
        'doubtful': 'Doubtful',
        'needs_verification': 'Needs Verification',
        'potentially_false': 'Potentially False',
        'unknown': 'Unknown'
    };
    return labels[label] || label;
}

function getLabelIcon(label) {
    const icons = {
        'reliable': '✓',
        'doubtful': '⚠️',
        'needs_verification': '🔍',
        'potentially_false': '❌',
        'unknown': '❓'
    };
    return icons[label] || '❓';
}

// Check API health on load
window.addEventListener('load', async () => {
    try {
        await api.checkHealth();
        console.log('API is healthy');
    } catch (error) {
        console.error('API health check failed:', error);
        alert('Warning: Cannot connect to the analysis server. Please ensure the backend is running.');
    }
});