import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ inputValue, setInputValue, onSend, onKeyPress }) => {
  return (
    <div className="border-t border-dark-border p-4">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask me anything about your studies..."
            rows="1"
            className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-green-500 transition-colors resize-none"
            style={{ minHeight: '52px', maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={onSend}
          disabled={!inputValue.trim()}
          className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl transition-all"
        >
          <Send size={20} className="text-white" />
        </button>
      </div>
      <p className="text-xs text-dark-textSecondary mt-2">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
};

export default ChatInput;

