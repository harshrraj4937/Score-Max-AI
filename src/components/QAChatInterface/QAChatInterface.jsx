import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ChatMessages from './ChatMessages';
import QuickActions from './QuickActions';
import ChatInput from './ChatInput';
import { initialMessages, quickActions } from './chatData';

const QAChatInterface = ({ onBack }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputValue,
        timestamp: new Date().toISOString(),
      };
      
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: "I understand your question. This is a demo interface, so I'm showing you a placeholder response. In the full version, I'll provide detailed explanations and help with your studies!",
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
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
            AI-powered instant help
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-dark-card border border-dark-border rounded-xl flex flex-col overflow-hidden">
        {/* Messages Area */}
        <ChatMessages messages={messages} />

        {/* Quick Actions (shown when no messages from user) */}
        {messages.length === 1 && (
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
        />
      </div>
    </div>
  );
};

export default QAChatInterface;

