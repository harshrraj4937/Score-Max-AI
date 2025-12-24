import React from 'react';
import MessageBubble from './MessageBubble';

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessages;

