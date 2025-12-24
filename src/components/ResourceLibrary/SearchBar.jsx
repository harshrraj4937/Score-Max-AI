import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-textSecondary" size={20} />
      <input
        type="text"
        placeholder="Search resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-dark-card border border-dark-border rounded-xl text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-purple-500 transition-colors"
      />
    </div>
  );
};

export default SearchBar;

