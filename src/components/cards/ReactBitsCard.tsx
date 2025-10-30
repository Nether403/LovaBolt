import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ReactBitsComponent } from '../../types';
import { BackgroundPreview } from './BackgroundPreview';
import { VideoPreview } from './VideoPreview';

interface ReactBitsCardProps {
  option: ReactBitsComponent;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: (e: React.MouseEvent) => void;
  showPreview?: boolean;
}

/**
 * ReactBitsCard displays a react-bits component option with selection state.
 * Memoized to prevent unnecessary re-renders when parent components update.
 * 
 * @param option - The react-bits component data
 * @param isSelected - Whether the component is currently selected
 * @param onSelect - Callback when the card is clicked
 * @param onViewDetails - Callback when "View Details" is clicked
 */
const ReactBitsCardComponent: React.FC<ReactBitsCardProps> = ({
  option,
  isSelected,
  onSelect,
  onViewDetails,
  showPreview = false,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 ease-out cursor-pointer group
        ${isSelected 
          ? 'ring-2 ring-teal-500 scale-[1.02] shadow-lg shadow-teal-500/20' 
          : 'hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20'
        }
        focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900
      `}
      role="button"
      tabIndex={0}
      aria-label={`${option.title}. ${option.description}. ${isSelected ? 'Currently selected' : 'Not selected'}. Press Enter or Space to ${isSelected ? 'deselect' : 'select'}.`}
      aria-pressed={isSelected}
      aria-describedby={`${option.id}-deps`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="absolute inset-0 glass-card transition-all duration-300" />
      {/* Gradient overlay for selected state */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none transition-opacity duration-300" />
      )}
      <div className="relative p-6 flex flex-col h-full min-h-[200px]">
        {/* Preview based on category */}
        {showPreview && (
          <div className="mb-4 -mx-6 -mt-6">
            {option.category === 'backgrounds' ? (
              <BackgroundPreview option={option} />
            ) : (
              <VideoPreview option={option} />
            )}
          </div>
        )}
        {/* Header with title and selection indicator */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-white transition-colors duration-200 group-hover:text-teal-400" id={`${option.id}-title`}>
            {option.title}
          </h4>
          {isSelected && (
            <div 
              className="bg-teal-500/20 p-1 rounded-full animate-fade-in" 
              role="img"
              aria-label="Selected indicator"
            >
              <svg 
                className="w-5 h-5 text-teal-500 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 flex-grow" id={`${option.id}-desc`}>
          {option.description}
        </p>

        {/* Dependencies badge */}
        {option.dependencies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" id={`${option.id}-deps`}>
            <span className="sr-only">Dependencies:</span>
            {option.dependencies.map((dep) => (
              <span 
                key={dep} 
                className="text-xs px-2 py-1 bg-gray-700/50 rounded text-gray-300 transition-all duration-200 hover:bg-gray-700/70 hover:text-white"
                role="status"
              >
                {dep}
              </span>
            ))}
          </div>
        )}

        {/* View Details button */}
        <button
          onClick={onViewDetails}
          className="inline-flex items-center text-sm text-teal-400 hover:text-teal-300 transition-all duration-200 mt-auto focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1 -mx-2 group/button"
          aria-label={`View detailed information for ${option.title}`}
          tabIndex={0}
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/button:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ReactBitsCard = React.memo(ReactBitsCardComponent);

// Display name for debugging
ReactBitsCard.displayName = 'ReactBitsCard';

export default ReactBitsCard;
