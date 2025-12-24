import React from 'react';

const OptionCard = ({ icon: Icon, title, description, onClick, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border-green-500/30',
  };

  const iconColorClasses = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative group cursor-pointer
        bg-gradient-to-br ${colorClasses[color]}
        border ${colorClasses[color].split('border-')[1]}
        rounded-2xl p-8
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl
        backdrop-blur-sm
      `}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`
          p-4 rounded-full bg-dark-card/50
          ${iconColorClasses[color]}
          transition-transform duration-300
          group-hover:scale-110
        `}>
          <Icon size={48} strokeWidth={1.5} />
        </div>
        
        <h3 className="text-2xl font-semibold text-dark-text">
          {title}
        </h3>
        
        <p className="text-dark-textSecondary leading-relaxed max-w-sm">
          {description}
        </p>
        
        <div className="pt-2">
          <span className="inline-flex items-center text-sm font-medium text-dark-text group-hover:gap-2 transition-all">
            Get Started
            <svg 
              className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
        <div className={`absolute top-4 right-4 w-12 h-12 ${iconColorClasses[color]} opacity-50`}>
          <Icon size={48} strokeWidth={0.5} />
        </div>
      </div>
    </div>
  );
};

export default OptionCard;

