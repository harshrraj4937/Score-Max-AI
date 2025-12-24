import { Mistral } from '@mistralai/mistralai';

// Initialize Mistral client
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

if (!apiKey) {
  console.warn('⚠️ Mistral API key not found. Please add VITE_MISTRAL_API_KEY to your .env file');
}

const client = new Mistral({ apiKey });

/**
 * Send a message to Mistral AI and get a response
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} - The AI response text
 */
export const sendMessage = async (messages, options = {}) => {
  try {
    if (!apiKey || apiKey === 'your_mistral_api_key_here') {
      throw new Error('Please configure your Mistral API key in the .env file');
    }

    const response = await client.chat.complete({
      model: options.model || 'mistral-large-latest',
      messages: messages,
      temperature: options.temperature || 0.7,
      maxTokens: options.maxTokens || 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Mistral AI Error:', error);
    
    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your Mistral API key in the .env file');
    }
    
    throw new Error('Failed to get AI response. Please try again.');
  }
};

/**
 * Send a message to Mistral AI with streaming response
 * @param {Array} messages - Array of message objects with role and content
 * @param {Function} onChunk - Callback function for each chunk of the response
 * @param {Object} options - Additional options for the API call
 */
export const sendMessageStream = async (messages, onChunk, options = {}) => {
  try {
    if (!apiKey || apiKey === 'your_mistral_api_key_here') {
      throw new Error('Please configure your Mistral API key in the .env file');
    }

    const stream = await client.chat.stream({
      model: options.model || 'mistral-large-latest',
      messages: messages,
      temperature: options.temperature || 0.7,
      maxTokens: options.maxTokens || 1000,
    });

    let fullResponse = '';
    
    for await (const chunk of stream) {
      const content = chunk.data.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        onChunk(content, fullResponse);
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Mistral AI Streaming Error:', error);
    
    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your Mistral API key in the .env file');
    }
    
    throw new Error('Failed to get AI response. Please try again.');
  }
};

/**
 * Format conversation history for Mistral AI
 * @param {Array} messages - Array of message objects from the chat
 * @returns {Array} - Formatted messages for Mistral API
 */
export const formatMessagesForMistral = (messages) => {
  return messages.map(msg => ({
    role: msg.type === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));
};

/**
 * Get available Mistral models
 */
export const MISTRAL_MODELS = {
  LARGE: 'mistral-large-latest',
  MEDIUM: 'mistral-medium-latest',
  SMALL: 'mistral-small-latest',
  TINY: 'mistral-tiny',
};

export default {
  sendMessage,
  sendMessageStream,
  formatMessagesForMistral,
  MISTRAL_MODELS,
};

