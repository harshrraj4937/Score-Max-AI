import React from 'react';
import { Users, Clock, ChevronRight } from 'lucide-react';
import { getDifficultyColor } from './utils';

const ExamCard = ({ exam }) => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-dark-bg hover:bg-dark-cardHover border border-dark-border rounded-lg transition-all cursor-pointer group"
    >
      <div className="flex-1">
        <h4 className="text-lg font-medium text-dark-text group-hover:text-blue-400 transition-colors">
          {exam.name}
        </h4>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span className="flex items-center text-dark-textSecondary">
            <Users size={14} className="mr-1" />
            {exam.students} students
          </span>
          <span className={`flex items-center font-medium ${getDifficultyColor(exam.difficulty)}`}>
            <Clock size={14} className="mr-1" />
            {exam.difficulty}
          </span>
        </div>
      </div>
      
      <ChevronRight size={20} className="text-dark-textSecondary group-hover:text-blue-400 transition-colors" />
    </div>
  );
};

export default ExamCard;

