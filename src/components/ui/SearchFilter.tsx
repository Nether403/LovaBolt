import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  tags?: string[];
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  tags = [],
  selectedTags = [],
  onTagToggle,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-0 glass-card rounded-xl" />
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 bg-transparent text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-xl
                     transition-all duration-200"
            aria-label="Search filter"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Tag Chips */}
      {tags.length > 0 && onTagToggle && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${selectedTags.includes(tag)
                  ? 'bg-teal-600 text-white ring-2 ring-teal-400'
                  : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
                }
              `}
              aria-pressed={selectedTags.includes(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
