import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import SearchBar from './SearchBar';
import ExamCategory from './ExamCategory';
import { examCategories } from './examData';

const ExamSelectInterface = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = examCategories.map(category => ({
    ...category,
    exams: category.exams.filter(exam =>
      exam.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.exams.length > 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-dark-card rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-dark-text" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-dark-text">Select Your Exam</h2>
          <p className="text-dark-textSecondary">Choose from popular competitive exams</p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Exam Categories */}
      <div className="space-y-8">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, idx) => (
            <ExamCategory key={idx} category={category} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-textSecondary text-lg">No exams found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSelectInterface;

