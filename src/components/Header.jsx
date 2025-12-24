import React from 'react';
import { GraduationCap, Settings, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <GraduationCap size={28} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-text">AI Exam Prep</h1>
              <p className="text-xs text-dark-textSecondary">By Harshraj Sadwelkar</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-dark-card rounded-lg transition-colors">
              <Settings size={20} className="text-dark-textSecondary hover:text-dark-text transition-colors" />
            </button>
            <button className="p-2 hover:bg-dark-card rounded-lg transition-colors">
              <User size={20} className="text-dark-textSecondary hover:text-dark-text transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

