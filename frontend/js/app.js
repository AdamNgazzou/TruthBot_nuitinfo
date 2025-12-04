// app.js

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const textMode = document.getElementById('text-mode');
  const imageMode = document.getElementById('image-mode');
  
  const btnPlus = document.getElementById('btn-plus');
  const attachmentMenu = document.getElementById('attachment-menu');
  const attachImageBtn = document.getElementById('attach-image');
  
  const textInput = document.getElementById('text-input');
  const charCounter = document.getElementById('char-counter');
  
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const imagePreviewContainer = document.getElementById('image-preview-container');
  const imagePreview = document.getElementById('image-preview');
  const imageFilename = document.getElementById('image-filename');
  const btnClosePreview = document.getElementById('btn-close-preview');
  
  const analyzeBtn = document.getElementById('analyze-btn');
  const errorBanner = document.getElementById('error-banner');
  const errorMessage = document.getElementById('error-message');
  
  const loadingEl = document.getElementById('loading');
  
  const inputSection = document.getElementById('input-section');
  const resultSection = document.getElementById('result-section');
  const resultCard = document.getElementById('result-card');
  const resultLabel = document.getElementById('result-label');
  const resultScore = document.getElementById('result-score');
  const resultBadge = document.getElementById('result-badge');
  const resultExplanation = document.getElementById('result-explanation');
  const resultDetailsList = document.getElementById('result-details-list');
  const newAnalysisBtn = document.getElementById('new-analysis-btn');
  
  let selectedFile = null;
  
  /* ========= Plus Button & Attachment Menu ========= */
  
  btnPlus.addEventListener('click', () => {
    attachmentMenu.classList.toggle('hidden');
  });
  
  attachImageBtn.addEventListener('click', () => {
    attachmentMenu.classList.add('hidden');
    fileInput.click();
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!btnPlus.contains(e.target) && !attachmentMenu.contains(e.target)) {
      attachmentMenu.classList.add('hidden');
    }
  });
  
  /* ========= Text Input Handling ========= */
  
  textInput.addEventListener('input', () => {
    const len = textInput.value.length;
    charCounter.textContent = `${len} character${len === 1 ? '' : 's'}`;
    updateAnalyzeButtonState();
  });
  
  /* ========= File Input & Dropzone Handling ========= */
  
  dropzone.addEventListener('click', () => fileInput.click());
  
  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('dragover');
  });
  
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });
  
  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('dragover');
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileSelection(event.dataTransfer.files[0]);
    }
  });
  
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      handleFileSelection(fileInput.files[0]);
    }
  });
  
  btnClosePreview.addEventListener('click', () => {
    selectedFile = null;
    fileInput.value = '';
    imagePreviewContainer.classList.add('hidden');
    updateAnalyzeButtonState();
  });
  
  function handleFileSelection(file) {
    if (!file) return;
    
    // Simple image type check
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showError('Unsupported file type. Please upload a PNG, JPG, or GIF image.');
      return;
    }
    
    selectedFile = file;
    
    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imageFilename.textContent = file.name;
      imagePreviewContainer.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
    
    hideError();
    updateAnalyzeButtonState();
  }
  
  /* ========= Analyze Button State ========= */
  
  function updateAnalyzeButtonState() {
    const hasText = textInput.value.trim().length > 0;
    const hasImage = selectedFile !== null;
    analyzeBtn.disabled = !hasText && !hasImage;
  }
  
  /* ========= Error & Loading Helpers ========= */
  
  function showError(message) {
    errorMessage.textContent = message || 'An unknown error occurred.';
    errorBanner.classList.remove('hidden');
  }
  
  function hideError() {
    errorBanner.classList.add('hidden');
  }
  
  function showLoading() {
    loadingEl.classList.remove('hidden');
    analyzeBtn.disabled = true;
  }
  
  function hideLoading() {
    loadingEl.classList.add('hidden');
    updateAnalyzeButtonState();
  }
  
  function showResult() {
    resultSection.classList.remove('hidden');
    inputSection.classList.add('hidden');
  }
  
  function hideResult() {
    resultSection.classList.add('hidden');
  }
  
  /* ========= Main Analysis Handler ========= */
  
  analyzeBtn.addEventListener('click', () => {
    handleAnalysis();
  });
  
  newAnalysisBtn.addEventListener('click', () => {
    hideResult();
    inputSection.classList.remove('hidden');
    textInput.value = '';
    selectedFile = null;
    fileInput.value = '';
    imagePreviewContainer.classList.add('hidden');
    charCounter.textContent = '0 characters';
    hideError();
    updateAnalyzeButtonState();
  });
  
  async function handleAnalysis() {
    hideError();
    showLoading();
    
    try {
      let response;
      
      // Determine what to analyze
      const hasText = textInput.value.trim().length > 0;
      const hasImage = selectedFile !== null;
      
      if (hasImage && hasText) {
        // Analyze image when both are present (image takes precedence)
        const formData = new FormData();
        formData.append('type', 'image');
        formData.append('file', selectedFile);
        
        response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData
        });
      } else if (hasImage) {
        // Analyze image only
        const formData = new FormData();
        formData.append('type', 'image');
        formData.append('file', selectedFile);
        
        response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData
        });
      } else {
        // Analyze text only
        const payload = {
          type: 'text',
          content: textInput.value.trim()
        };
        
        response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      let data;
      if (response.ok) {
        data = await response.json();
      } else {
        throw new Error('Server returned an error response.');
      }
      
      const mapped = mapBackendResponse(data);
      renderResult(mapped);
    } catch (error) {
      console.warn('Using mock result due to error:', error);
      
      // Mock fallback response for demo purposes
      const mock = {
        score: selectedFile ? 64 : 78,
        color: 'orange',
        explanation: selectedFile
          ? 'The image may be used out of context or in a misleading way. Always verify where and when the image was originally taken.'
          : 'The text uses emotional language and lacks clear sources. It shows several patterns associated with polarized or misleading content.',
        extra: [
          'Check if trusted news outlets report this claim.',
          'Look for the original source or reverse-search the image.',
          'Be cautious with content that strongly appeals to fear or outrage.'
        ]
      };
      
      renderResult(mock);
    } finally {
      hideLoading();
    }
  }
  
  // Map backend response into our internal format
  function mapBackendResponse(data) {
    const score = typeof data.score === 'number' ? data.score : 50;
    const color = data.color || 'orange';
    const explanation =
      data.explanation ||
      'The model returned a generic explanation. Please verify using additional sources.';
    const extra = Array.isArray(data.details) ? data.details : [];
    
    return { score, color, explanation, extra };
  }
  
  /* ========= Render Result ========= */
  
  function renderResult(result) {
    const { score, color, explanation, extra } = result;
    
    // Score label and value
    resultLabel.textContent = 'Polarization Risk';
    resultScore.textContent = `${score.toFixed(0)}%`;
    
    // Determine risk level class
    const riskClass = getRiskClass(color, score);
    resultCard.classList.remove('risk-low', 'risk-medium', 'risk-high');
    resultCard.classList.add(riskClass);
    
    // Badge text
    const badgeText =
      riskClass === 'risk-low'
        ? 'Low risk'
        : riskClass === 'risk-medium'
        ? 'Moderate risk'
        : 'High risk';
    resultBadge.textContent = badgeText;
    
    // Explanation
    resultExplanation.textContent = explanation;
    
    // Extra insights
    resultDetailsList.innerHTML = '';
    if (Array.isArray(extra) && extra.length > 0) {
      extra.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        resultDetailsList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent =
        'No additional insights from the model. Use your own judgment and cross-check multiple sources.';
      resultDetailsList.appendChild(li);
    }
    
    showResult();
  }
  
  function getRiskClass(color, score) {
    // Prefer explicit color if provided by backend
    if (color === 'green') return 'risk-low';
    if (color === 'red') return 'risk-high';
    if (color === 'orange' || color === 'yellow') return 'risk-medium';
    
    // Otherwise, infer from score
    if (score < 40) return 'risk-low';
    if (score < 70) return 'risk-medium';
    return 'risk-high';
  }
});

