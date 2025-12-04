/**
 * API communication module
 */

const API_BASE_URL = 'http://localhost:8000/api';

class APIClient {
    /**
     * Analyze text content
     */
    static async analyzeText(content) {
        try {
            const response = await fetch(`${API_BASE_URL}/analyze/text`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content,
                    file_type: 'text'
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Text analysis error:', error);
            throw error;
        }
    }

    /**
     * Upload file for analysis
     */
    static async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE_URL}/analyze/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('File upload error:', error);
            throw error;
        }
    }

    /**
     * Get analysis results for uploaded file
     */
    static async getAnalysis(fileId) {
        try {
            const response = await fetch(`${API_BASE_URL}/analyze/${fileId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Analysis error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Analysis retrieval error:', error);
            throw error;
        }
    }

    /**
     * Health check
     */
    static async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            return response.ok;
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    }
}
