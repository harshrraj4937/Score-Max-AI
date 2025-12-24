import React from 'react';

const QuickActions = ({ quickActions, onQuickAction }) => {
  return (
    <div className="px-6 pb-4">
      <p className="text-sm text-dark-textSecondary mb-3">Quick actions:</p>
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action, idx) => {
          const IconComponent = action.icon;
          return (
            <button
              key={idx}
              onClick={() => onQuickAction(action.prompt)}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-bg hover:bg-dark-cardHover border border-dark-border rounded-lg transition-colors text-sm text-dark-text"
            >
              <IconComponent size={16} className="text-green-400" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

