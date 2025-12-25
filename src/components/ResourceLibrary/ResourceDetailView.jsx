import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  BookOpen, 
  PlayCircle, 
  FileText,
  Share2,
  Bookmark,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { getColorClasses } from './utils';

const ResourceDetailView = ({ resource, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const IconComponent = resource.icon;

  // Sample content structure based on resource type
  const getResourceContent = () => {
    if (resource.type === 'notes') {
      return {
        chapters: [
          { id: 1, title: 'Introduction & Fundamentals', duration: '15 min', completed: true },
          { id: 2, title: 'Core Concepts', duration: '25 min', completed: true },
          { id: 3, title: 'Advanced Topics', duration: '30 min', completed: false },
          { id: 4, title: 'Problem Solving', duration: '40 min', completed: false },
          { id: 5, title: 'Practice Questions', duration: '20 min', completed: false },
        ],
        stats: { total: 5, completed: 2, totalDuration: '130 min' }
      };
    } else if (resource.type === 'videos') {
      return {
        chapters: [
          { id: 1, title: 'Lecture 1: Introduction', duration: '45 min', completed: true },
          { id: 2, title: 'Lecture 2: Basic Principles', duration: '50 min', completed: false },
          { id: 3, title: 'Lecture 3: Applications', duration: '55 min', completed: false },
          { id: 4, title: 'Lecture 4: Advanced Concepts', duration: '60 min', completed: false },
        ],
        stats: { total: 4, completed: 1, totalDuration: '210 min' }
      };
    } else {
      return {
        chapters: [
          { id: 1, title: 'Practice Set 1: Easy', duration: '30 min', completed: true },
          { id: 2, title: 'Practice Set 2: Medium', duration: '45 min', completed: false },
          { id: 3, title: 'Practice Set 3: Hard', duration: '60 min', completed: false },
          { id: 4, title: 'Mock Test 1', duration: '90 min', completed: false },
          { id: 5, title: 'Mock Test 2', duration: '90 min', completed: false },
        ],
        stats: { total: 5, completed: 1, totalDuration: '315 min' }
      };
    }
  };

  const content = getResourceContent();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-dark-card rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-dark-text" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-dark-text">Resource Details</h2>
          <p className="text-dark-textSecondary text-sm">Complete learning material</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Header Card */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-8">
            <div className="flex items-start space-x-6">
              <div className={`p-4 rounded-xl ${getColorClasses(resource.color)}`}>
                <IconComponent size={40} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-bold text-dark-text mb-2">
                      {resource.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-dark-textSecondary">
                      <span className="px-3 py-1 bg-dark-bg rounded-lg font-medium">
                        {resource.subject}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Download size={14} />
                        <span>{resource.downloads} downloads</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        <span className="font-medium">{resource.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-dark-textSecondary leading-relaxed mb-4">
                  {resource.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium">
                    <PlayCircle size={18} />
                    <span>Start Learning</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-dark-bg hover:bg-dark-border text-dark-text rounded-lg transition-colors font-medium">
                    <Download size={18} />
                    <span>Download</span>
                  </button>
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-lg transition-colors ${
                      isBookmarked 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-dark-bg hover:bg-dark-border text-dark-text'
                    }`}
                  >
                    <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-3 bg-dark-bg hover:bg-dark-border text-dark-text rounded-lg transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            <div className="flex border-b border-dark-border">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-400 bg-dark-bg/50'
                      : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-bg/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-dark-text mb-3">About this Resource</h3>
                    <p className="text-dark-textSecondary leading-relaxed">
                      This comprehensive {resource.type === 'notes' ? 'study material' : resource.type === 'videos' ? 'video series' : 'practice test collection'} 
                      {' '}covers all essential topics in {resource.subject.toLowerCase()}. Designed for competitive exam preparation, 
                      it includes detailed explanations, solved examples, and practice questions to help you master the subject.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-dark-text mb-3">What You'll Learn</h3>
                    <ul className="space-y-2">
                      {[
                        'Comprehensive coverage of all important topics',
                        'Step-by-step problem-solving techniques',
                        'Tips and tricks for competitive exams',
                        'Previous year questions and solutions',
                        'Regular practice exercises and assessments'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3 text-dark-textSecondary">
                          <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-dark-text">Course Content</h3>
                    <span className="text-sm text-dark-textSecondary">
                      {content.stats.completed} of {content.stats.total} completed
                    </span>
                  </div>

                  <div className="space-y-2">
                    {content.chapters.map((chapter, index) => (
                      <div 
                        key={chapter.id}
                        className="flex items-center justify-between p-4 bg-dark-bg hover:bg-dark-border rounded-lg transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            chapter.completed 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-dark-border text-dark-textSecondary'
                          }`}>
                            {chapter.completed ? <CheckCircle size={16} /> : index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-dark-text group-hover:text-purple-400 transition-colors">
                              {chapter.title}
                            </h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs text-dark-textSecondary flex items-center">
                                <Clock size={12} className="mr-1" />
                                {chapter.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-dark-textSecondary group-hover:text-purple-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-dark-text">Student Reviews</h3>
                    <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
                      Write Review
                    </button>
                  </div>

                  {[
                    { name: 'Raj Kumar', rating: 5, comment: 'Excellent resource! Very comprehensive and easy to understand.', time: '2 days ago' },
                    { name: 'Priya Singh', rating: 4, comment: 'Good content but could use more practice questions.', time: '5 days ago' },
                    { name: 'Amit Sharma', rating: 5, comment: 'Best study material I have found for this subject.', time: '1 week ago' },
                  ].map((review, index) => (
                    <div key={index} className="p-4 bg-dark-bg rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-medium">
                            {review.name[0]}
                          </div>
                          <div>
                            <h4 className="font-medium text-dark-text">{review.name}</h4>
                            <span className="text-xs text-dark-textSecondary">{review.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-dark-border'} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-dark-textSecondary text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Info */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-dark-text mb-4">Your Progress</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-dark-textSecondary">Completed</span>
                  <span className="text-purple-400 font-medium">
                    {Math.round((content.stats.completed / content.stats.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-dark-bg rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all"
                    style={{ width: `${(content.stats.completed / content.stats.total) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark-border">
                <div className="text-center p-3 bg-dark-bg rounded-lg">
                  <div className="text-2xl font-bold text-dark-text">{content.stats.completed}</div>
                  <div className="text-xs text-dark-textSecondary mt-1">Completed</div>
                </div>
                <div className="text-center p-3 bg-dark-bg rounded-lg">
                  <div className="text-2xl font-bold text-dark-text">{content.stats.total - content.stats.completed}</div>
                  <div className="text-xs text-dark-textSecondary mt-1">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-dark-text mb-4">Resource Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Clock size={18} className="text-blue-400" />
                  </div>
                  <span className="text-dark-textSecondary text-sm">Duration</span>
                </div>
                <span className="font-medium text-dark-text">{content.stats.totalDuration}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Users size={18} className="text-green-400" />
                  </div>
                  <span className="text-dark-textSecondary text-sm">Students</span>
                </div>
                <span className="font-medium text-dark-text">{resource.downloads}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Star size={18} className="text-yellow-400" />
                  </div>
                  <span className="text-dark-textSecondary text-sm">Rating</span>
                </div>
                <span className="font-medium text-dark-text">{resource.rating}/5.0</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <TrendingUp size={18} className="text-purple-400" />
                  </div>
                  <span className="text-dark-textSecondary text-sm">Difficulty</span>
                </div>
                <span className="font-medium text-dark-text">Intermediate</span>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-dark-text mb-4">Related Resources</h3>
            
            <div className="space-y-3">
              {[
                { title: 'Advanced Topics', type: 'Notes' },
                { title: 'Quick Revision', type: 'Video' },
                { title: 'Test Series', type: 'Practice' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="p-3 bg-dark-bg hover:bg-dark-border rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-dark-text group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-xs text-dark-textSecondary">{item.type}</span>
                    </div>
                    <ChevronRight size={16} className="text-dark-textSecondary group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailView;

