import React from 'react';
import { Bot, User, Loader2, BookOpen } from 'lucide-react';

const MessageBubble = ({ message }) => {
  // Function to render text with citations highlighted
  const renderTextWithCitations = (text) => {
    if (!text) return null;
    
    // Match [Page X] patterns in the text
    const pagePattern = /\[Page \d+\]/g;
    const parts = text.split(pagePattern);
    const matches = text.match(pagePattern) || [];
    
    if (matches.length === 0) {
      return text;
    }
    
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {matches[index] && (
              <span className="inline-flex items-center mx-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                <BookOpen size={10} className="mr-1" />
                {matches[index].replace('[', '').replace(']', '')}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

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
              {renderTextWithCitations(message.text)}
            </p>
          )}
          
          {/* Show citations if available */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-dark-border">
              <p className="text-xs text-dark-textSecondary mb-2">Sources:</p>
              <div className="space-y-2">
                {message.citations.slice(0, 3).map((citation, index) => (
                  <div 
                    key={index}
                    className="text-xs p-2 bg-dark-card rounded border border-dark-border"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <BookOpen size={12} className="text-green-400" />
                      <span className="text-green-400 font-medium">Page {citation.page}</span>
                    </div>
                    <p className="text-dark-textSecondary line-clamp-2">{citation.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

