import React from 'react';
import { Bot, User, Loader2 } from 'lucide-react';

const MessageBubble = ({ message }) => {
  return (
    <div
      className={`flex items-start space-x-3 ${
        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          message.type === 'bot'
            ? message.isError 
              ? 'bg-gradient-to-br from-red-500 to-red-600'
              : 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-blue-500 to-purple-600'
        }`}
      >
        {message.type === 'bot' ? (
          message.isLoading ? (
            <Loader2 size={20} className="text-white animate-spin" />
          ) : (
            <Bot size={20} className="text-white" />
          )
        ) : (
          <User size={20} className="text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`flex-1 max-w-3xl ${
          message.type === 'user' ? 'flex justify-end' : ''
        }`}
      >
        <div
          className={`inline-block p-4 rounded-2xl ${
            message.type === 'bot'
              ? message.isError
                ? 'bg-red-500/10 border border-red-500/30'
                : 'bg-dark-bg border border-dark-border'
              : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30'
          }`}
        >
          {message.isLoading && !message.text ? (
            <div className="flex items-center space-x-2 text-dark-textSecondary">
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <p className={`leading-relaxed whitespace-pre-wrap ${
              message.isError ? 'text-red-400' : 'text-dark-text'
            }`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

