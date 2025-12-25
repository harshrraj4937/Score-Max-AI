// RAG Service for PDF-based Q&A
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Upload a PDF file to the backend
 * @param {File} file - PDF file to upload
 * @returns {Promise<Object>} Upload response with resource_id
 */
export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/resources/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to upload PDF');
    }

    return await response.json();
  } catch (error) {
    console.error('PDF Upload Error:', error);
    throw error;
  }
};

/**
 * Chat with PDF using RAG
 * @param {string} question - User's question
 * @param {string} resourceId - ID of uploaded PDF resource
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<Object>} Response with answer and citations
 */
export const chatWithPDF = async (question, resourceId, conversationHistory = []) => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        resource_id: resourceId,
        conversation_history: conversationHistory,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get response');
    }

    return await response.json();
  } catch (error) {
    console.error('Chat Error:', error);
    throw error;
  }
};

/**
 * Chat with PDF using streaming
 * @param {string} question - User's question
 * @param {string} resourceId - ID of uploaded PDF resource
 * @param {Array} conversationHistory - Previous messages
 * @param {Function} onChunk - Callback for each chunk
 * @returns {Promise<string>} Complete response
 */
export const chatWithPDFStream = async (question, resourceId, conversationHistory, onChunk) => {
  try {
    const response = await fetch(`${API_URL}/api/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        resource_id: resourceId,
        conversation_history: conversationHistory,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get streaming response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullResponse += chunk;
      
      if (onChunk) {
        onChunk(chunk, fullResponse);
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Streaming Chat Error:', error);
    throw error;
  }
};

/**
 * Get resource information
 * @param {string} resourceId - ID of the resource
 * @returns {Promise<Object>} Resource metadata
 */
export const getResourceInfo = async (resourceId) => {
  try {
    const response = await fetch(`${API_URL}/api/resources/${resourceId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get resource info');
    }

    return await response.json();
  } catch (error) {
    console.error('Get Resource Info Error:', error);
    throw error;
  }
};

/**
 * Delete a resource
 * @param {string} resourceId - ID of the resource to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteResource = async (resourceId) => {
  try {
    const response = await fetch(`${API_URL}/api/resources/${resourceId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to delete resource');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete Resource Error:', error);
    throw error;
  }
};

export default {
  uploadPDF,
  chatWithPDF,
  chatWithPDFStream,
  getResourceInfo,
  deleteResource,
};

