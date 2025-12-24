import React from 'react';
import { Bot, User } from 'lucide-react';

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
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-blue-500 to-purple-600'
        }`}
      >
        {message.type === 'bot' ? (
          <Bot size={20} className="text-white" />
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
              ? 'bg-dark-bg border border-dark-border'
              : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30'
          }`}
        >
          <p className="text-dark-text leading-relaxed">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

