import React from 'react';
import { Download, Star } from 'lucide-react';
import { getColorClasses } from './utils';

const ResourceCard = ({ resource }) => {
  const IconComponent = resource.icon;

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/30 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(resource.color)}`}>
          <IconComponent size={24} />
        </div>
        <div className="flex items-center space-x-1 text-yellow-400">
          <Star size={14} fill="currentColor" />
          <span className="text-sm font-medium">{resource.rating}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-dark-text mb-2 group-hover:text-purple-400 transition-colors">
        {resource.title}
      </h3>

      <p className="text-sm text-dark-textSecondary mb-4 line-clamp-2">
        {resource.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-dark-border">
        <span className="text-xs font-medium text-dark-textSecondary px-2 py-1 bg-dark-bg rounded">
          {resource.subject}
        </span>
        <div className="flex items-center space-x-1 text-dark-textSecondary">
          <Download size={14} />
          <span className="text-xs">{resource.downloads}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;

