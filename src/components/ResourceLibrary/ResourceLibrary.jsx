import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import SearchBar from './SearchBar';
import FilterTabs from './FilterTabs';
import ResourceGrid from './ResourceGrid';
import { resources, filters } from './resourceData';

const ResourceLibrary = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          <h2 className="text-3xl font-bold text-dark-text">Resource Library</h2>
          <p className="text-dark-textSecondary">Access study materials, videos, and practice tests</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <FilterTabs 
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      {/* Resources Grid */}
      <ResourceGrid resources={filteredResources} />
    </div>
  );
};

export default ResourceLibrary;

