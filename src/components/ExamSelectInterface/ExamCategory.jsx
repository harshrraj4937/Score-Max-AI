import React from 'react';
import { TrendingUp } from 'lucide-react';
import ExamCard from './ExamCard';

const ExamCategory = ({ category }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
      <h3 className="text-xl font-semibold text-dark-text mb-4 flex items-center">
        <TrendingUp size={20} className="mr-2 text-blue-400" />
        {category.category}
      </h3>
      
      <div className="space-y-3">
        {category.exams.map((exam, examIdx) => (
          <ExamCard key={examIdx} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default ExamCategory;

