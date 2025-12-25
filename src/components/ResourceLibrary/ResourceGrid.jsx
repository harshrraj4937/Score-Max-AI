import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceGrid = ({ resources, onResourceClick }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-textSecondary text-lg">No resources found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard 
          key={resource.id} 
          resource={resource} 
          onClick={() => onResourceClick(resource)}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;

