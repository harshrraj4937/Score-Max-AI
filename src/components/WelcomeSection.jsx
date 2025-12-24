import React from 'react';
import { Sparkles } from 'lucide-react';

const WelcomeSection = () => {
  return (
    <div className="text-center mb-16 space-y-6">
      {/* Animated greeting badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
        <Sparkles size={16} className="text-blue-400 animate-pulse" />
        <span className="text-sm font-medium text-dark-textSecondary">
          Welcome back! Ready to ace your exams?
        </span>
      </div>

      {/* Main heading */}
      <h2 className="text-5xl md:text-6xl font-bold text-dark-text leading-tight">
        Your AI-Powered
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
          Exam Preparation
        </span>
        <br />
        Platform
      </h2>

      {/* Subheading */}
      <p className="text-xl text-dark-textSecondary max-w-2xl mx-auto leading-relaxed">
        Choose your path to success. Select an exam, explore resources, or chat with our AI assistant to get instant help.
      </p>

      {/* Stats or features */}
      <div className="flex items-center justify-center space-x-8 pt-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">50+</p>
          <p className="text-sm text-dark-textSecondary">Exams Covered</p>
        </div>
        <div className="w-px h-12 bg-dark-border"></div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-400">10K+</p>
          <p className="text-sm text-dark-textSecondary">Study Resources</p>
        </div>
        <div className="w-px h-12 bg-dark-border"></div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">24/7</p>
          <p className="text-sm text-dark-textSecondary">AI Support</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

