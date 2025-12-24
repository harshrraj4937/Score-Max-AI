import React, { useState } from 'react';
import { BookOpen, Library, MessageCircle } from 'lucide-react';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import OptionCard from './components/OptionCard';
import ExamSelectInterface from './components/ExamSelectInterface';
import ResourceLibrary from './components/ResourceLibrary';
import QAChatInterface from './components/QAChatInterface';

function App() {
  const [activeView, setActiveView] = useState('home'); // 'home', 'exam', 'library', 'chat'

  const options = [
    {
      id: 'exam',
      icon: BookOpen,
      title: 'Exam Select Interface',
      description: 'Browse and select from a wide range of competitive exams. Get personalized study plans and exam-specific resources.',
      color: 'blue',
    },
    {
      id: 'library',
      icon: Library,
      title: 'Resource Library',
      description: 'Access thousands of curated study materials, practice questions, video lectures, and reference materials.',
      color: 'purple',
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'Q&A Chat Interface',
      description: 'Chat with our AI assistant for instant answers, explanations, and personalized study guidance 24/7.',
      color: 'green',
    },
  ];

  const handleOptionClick = (optionId) => {
    setActiveView(optionId);
  };

  const handleBackToHome = () => {
    setActiveView('home');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'exam':
        return <ExamSelectInterface onBack={handleBackToHome} />;
      case 'library':
        return <ResourceLibrary onBack={handleBackToHome} />;
      case 'chat':
        return <QAChatInterface onBack={handleBackToHome} />;
      default:
        return (
          <>
            <WelcomeSection />
            
            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {options.map((option) => (
                <OptionCard
                  key={option.id}
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  color={option.color}
                  onClick={() => handleOptionClick(option.id)}
                />
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-20 text-center">
              <p className="text-dark-textSecondary text-sm">
                Powered by Advanced AI • Personalized Learning • Real-time Support
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 pt-32 pb-20">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;

