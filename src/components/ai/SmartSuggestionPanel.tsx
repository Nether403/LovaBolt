/**
 * SmartSuggestionPanel Component
 * 
 * Displays AI-powered suggestions based on user selections in a collapsible panel.
 * Shows confidence scores, reasoning, and allows one-click application of suggestions.
 * 
 * @module SmartSuggestionPanel
 */

import React, { useState } from 'react';
import { Sparkles, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react';
import { Suggestion } from '../../hooks/useSmartSuggestions';

export interface SmartSuggestionPanelProps {
  suggestions: Suggestion[];
  onApplySuggestion: (suggestion: Suggestion, item: any) => void;
  onDismiss?: () => void;
  className?: string;
}

/**
 * SmartSuggestionPanel displays context-aware suggestions with confidence scores
 * 
 * Features:
 * - Collapsible panel to save screen space
 * - Confidence percentage for each suggestion
 * - Clear reasoning for why suggestions are made
 * - One-click apply buttons for individual items
 * - Visual feedback on hover
 * - Badge showing number of suggestions
 * 
 * @param suggestions - Array of suggestions to display
 * @param onApplySuggestion - Callback when user applies a suggestion
 * @param onDismiss - Optional callback when panel is dismissed
 * @param className - Optional additional CSS classes
 * 
 * @example
 * ```tsx
 * <SmartSuggestionPanel
 *   suggestions={suggestions}
 *   onApplySuggestion={(suggestion, item) => {
 *     setSelectedColorTheme(item);
 *   }}
 * />
 * ```
 */
export const SmartSuggestionPanel: React.FC<SmartSuggestionPanelProps> = ({
  suggestions,
  onApplySuggestion,
  onDismiss,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [appliedItems, setAppliedItems] = useState<Set<string>>(new Set());

  if (suggestions.length === 0) return null;

  const handleApply = (suggestion: Suggestion, item: any) => {
    onApplySuggestion(suggestion, item);
    setAppliedItems(prev => new Set(prev).add(item.id));
    
    // Remove from applied after 2 seconds to allow re-application
    setTimeout(() => {
      setAppliedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-500" />
            <h3 className="text-lg font-semibold text-white">
              AI Suggestions
            </h3>
            <span className="px-2 py-0.5 text-xs font-medium bg-teal-500/20 text-teal-400 rounded-full">
              {suggestions.length}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse suggestions' : 'Expand suggestions'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Suggestions List */}
        {isExpanded && (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="border-l-2 border-teal-500 pl-4">
                {/* Suggestion Header */}
                <div className="mb-2">
                  <h4 className="font-medium text-white mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-gray-400">{suggestion.reason}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      Confidence: {Math.round(suggestion.confidence * 100)}%
                    </span>
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full transition-all"
                        style={{ width: `${suggestion.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Suggestion Items Grid */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {suggestion.items.slice(0, 6).map((item, itemIndex) => {
                    const isApplied = appliedItems.has(item.id);
                    
                    return (
                      <button
                        key={itemIndex}
                        onClick={() => handleApply(suggestion, item)}
                        disabled={isApplied}
                        className={`
                          text-left p-3 rounded-lg transition-all
                          ${isApplied
                            ? 'bg-teal-500/20 border border-teal-500/50'
                            : 'bg-gray-800/50 hover:bg-gray-700/50 border border-transparent'
                          }
                          disabled:cursor-not-allowed
                          focus:outline-none focus:ring-2 focus:ring-teal-500
                        `}
                        aria-label={`Apply ${item.title}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm text-white font-medium flex-1">
                            {item.title}
                          </span>
                          {isApplied && (
                            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Show more indicator */}
                {suggestion.items.length > 6 && (
                  <p className="text-xs text-gray-500 mt-2">
                    +{suggestion.items.length - 6} more options available
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Collapsed State Info */}
        {!isExpanded && (
          <p className="text-sm text-gray-400">
            {suggestions.length} suggestion{suggestions.length > 1 ? 's' : ''} available
          </p>
        )}
      </div>
    </div>
  );
};
