import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import ChatMessages from './ChatMessages';
import QuickActions from './QuickActions';
import ChatInput from './ChatInput';
import PDFUploadCard from './PDFUploadCard';
import PDFInfoBadge from './PDFInfoBadge';
import { initialMessages, quickActions, systemPrompt } from './chatData';
import { sendMessageStream, formatMessagesForMistral } from '../../services/mistralService';
import { uploadPDF, chatWithPDFStream } from '../../services/ragService';

const QAChatInterface = ({ onBack }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedPDF, setUploadedPDF] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePDFUpload = async (file) => {
    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadPDF(file);
      setUploadedPDF(result);
      
      // Reset messages when new PDF is uploaded
      setMessages([
        {
          id: 1,
          type: 'bot',
          text: `Great! I've processed "${result.filename}" (${result.page_count} pages). You can now ask me questions about it!`,
          timestamp: new Date().toISOString(),
        }
      ]);
    } catch (err) {
      console.error('PDF Upload Error:', err);
      setError(`Failed to upload PDF: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePDF = () => {
    setUploadedPDF(null);
    setMessages(initialMessages);
    setError(null);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        text: inputValue,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);
      setError(null);

      // Create a temporary loading message
      const loadingMessageId = Date.now() + 1;
      const loadingMessage = {
        id: loadingMessageId,
        type: 'bot',
        text: '',
        isLoading: true,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, loadingMessage]);

      try {
        // If PDF is uploaded, use RAG service
        if (uploadedPDF) {
          const conversationHistory = messages
            .filter(msg => msg.id !== 1)
            .map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.text
            }));

          let fullResponse = '';

          await chatWithPDFStream(
            inputValue,
            uploadedPDF.resource_id,
            conversationHistory,
            (chunk, accumulated) => {
              fullResponse = accumulated;
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === loadingMessageId 
                    ? { ...msg, text: accumulated, isLoading: false }
                    : msg
                )
              );
            }
          );
        } else {
          // Use regular Mistral AI chat if no PDF
          const conversationHistory = messages
            .filter(msg => msg.id !== 1)
            .concat([userMessage]);
          
          const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...formatMessagesForMistral(conversationHistory)
          ];

          let fullResponse = '';

          await sendMessageStream(
            formattedMessages,
            (chunk, accumulated) => {
              fullResponse = accumulated;
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === loadingMessageId 
                    ? { ...msg, text: accumulated, isLoading: false }
                    : msg
                )
              );
            }
          );
        }

      } catch (err) {
        console.error('Error sending message:', err);
        setError(err.message);
        
        // Remove loading message and show error
        setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));
        
        const errorMessage = {
          id: Date.now() + 2,
          type: 'bot',
          text: `Sorry, I encountered an error: ${err.message}`,
          isError: true,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuickAction = (prompt) => {
    setInputValue(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-dark-card rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-dark-text" />
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-bold text-dark-text">Q&A Chat Assistant</h2>
            {uploadedPDF && <PDFInfoBadge pdfInfo={uploadedPDF} />}
          </div>
          <p className="text-dark-textSecondary flex items-center mt-1">
            <Sparkles size={14} className="mr-1 text-green-400" />
            {isLoading ? 'Thinking...' : uploadedPDF ? 'Answering from your PDF' : 'AI-powered by Mistral AI'}
          </p>
        </div>
      </div>

      {/* PDF Upload Card */}
      {!uploadedPDF && !isUploading && (
        <PDFUploadCard 
          onUploadComplete={handlePDFUpload}
          onRemove={handleRemovePDF}
          currentPDF={uploadedPDF}
        />
      )}

      {/* Uploading State */}
      {isUploading && (
        <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center space-x-3">
          <Loader2 size={20} className="text-blue-400 animate-spin" />
          <div>
            <p className="text-blue-400 font-medium">Processing PDF...</p>
            <p className="text-blue-300 text-xs">Extracting text and creating embeddings</p>
          </div>
        </div>
      )}

      {/* PDF Info (if uploaded) */}
      {uploadedPDF && !isUploading && (
        <PDFUploadCard 
          onUploadComplete={handlePDFUpload}
          onRemove={handleRemovePDF}
          currentPDF={uploadedPDF}
        />
      )}

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-400 text-sm">{error}</p>
            {error.includes('API key') && (
              <p className="text-red-300 text-xs mt-1">
                Please add your Mistral API key to the .env file. Get one from{' '}
                <a 
                  href="https://console.mistral.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-red-200"
                >
                  console.mistral.ai
                </a>
              </p>
            )}
          </div>
          <button 
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 bg-dark-card border border-dark-border rounded-xl flex flex-col overflow-hidden">
        {/* Messages Area */}
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />

        {/* Quick Actions (shown when no messages from user) */}
        {messages.length === 1 && !isLoading && (
          <QuickActions 
            quickActions={quickActions}
            onQuickAction={handleQuickAction}
          />
        )}

        {/* Input Area */}
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default QAChatInterface;

