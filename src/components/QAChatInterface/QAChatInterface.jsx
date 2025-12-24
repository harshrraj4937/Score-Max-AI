import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import ChatMessages from './ChatMessages';
import QuickActions from './QuickActions';
import ChatInput from './ChatInput';
import { initialMessages, quickActions, systemPrompt } from './chatData';
import { sendMessageStream, formatMessagesForMistral } from '../../services/mistralService';

const QAChatInterface = ({ onBack }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        // Format messages for Mistral AI (exclude the initial greeting)
        const conversationHistory = messages
          .filter(msg => msg.id !== 1) // Exclude initial greeting
          .concat([userMessage]);
        
        const formattedMessages = [
          { role: 'system', content: systemPrompt },
          ...formatMessagesForMistral(conversationHistory)
        ];

        let fullResponse = '';

        // Use streaming for real-time response
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
          <h2 className="text-3xl font-bold text-dark-text">Q&A Chat Assistant</h2>
          <p className="text-dark-textSecondary flex items-center">
            <Sparkles size={14} className="mr-1 text-green-400" />
            {isLoading ? 'Thinking...' : 'AI-powered by Mistral AI'}
          </p>
        </div>
      </div>

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

