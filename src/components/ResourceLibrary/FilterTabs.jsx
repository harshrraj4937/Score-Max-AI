import React from 'react';
import { Filter } from 'lucide-react';

const FilterTabs = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex items-center space-x-2">
      <Filter size={18} className="text-dark-textSecondary" />
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === filter.id
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              : 'bg-dark-card text-dark-textSecondary hover:bg-dark-cardHover border border-dark-border'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;

