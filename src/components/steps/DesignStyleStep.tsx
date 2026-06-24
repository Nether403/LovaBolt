import React from 'react';
import { useBoltBuilderStore } from '../../stores/boltBuilderStore';
import { designStyles } from '../../data/wizardData';
import { Button } from '../ui/button';
import DesignStyleCard from '../cards/DesignStyleCard';
import { DesignSuggestions } from '../ai/DesignSuggestions';
import { useDesignSuggestions } from '../../hooks/useDesignSuggestions';
import type { DesignSuggestion } from '../../types/gemini';
import { AIErrorFeedback } from '../ai/AIErrorFeedback';

const DesignStyleStep: React.FC = () => {
  const { selectedDesignStyle, setSelectedDesignStyle, setCurrentStep } = useBoltBuilderStore();

  // Design suggestions integration
  const {
    suggestions,
    isLoading: suggestionsLoading,
    error: suggestionsError,
    isVisible: suggestionsVisible,
    showSuggestions,
    hideSuggestions,
    analyzeSuggestions,
  } = useDesignSuggestions({
    autoAnalyze: true,
    minSelections: 2,
    debounceMs: 1000,
  });

  const handleStyleSelect = (styleId: string) => {
    const style = designStyles.find((s) => s.id === styleId);
    setSelectedDesignStyle(style || null);
  };

  const handleContinue = () => {
    if (selectedDesignStyle) {
      setCurrentStep('color-theme');
    }
  };

  // Handle applying auto-fixable suggestions
  const handleApplyFixes = (fixableSuggestions: DesignSuggestion[]) => {
    console.log('[DesignStyleStep] Applying fixes:', fixableSuggestions);
    // TODO: Implement auto-fix logic based on suggestion types
    // This would involve updating wizard state based on suggestions
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Choose Your Design Style</h2>
        <p className="text-gray-300">
          Select a design aesthetic that matches your vision and brand personality.
        </p>
      </div>

      {/* Design Styles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designStyles.map((style) => (
          <DesignStyleCard
            key={style.id}
            style={style}
            selected={selectedDesignStyle?.id === style.id}
            onClick={() => handleStyleSelect(style.id)}
          />
        ))}
      </div>

      {/* AI Error Feedback */}
      {suggestionsError && (
        <AIErrorFeedback
          error={suggestionsError}
          onRetry={analyzeSuggestions}
          isRetrying={suggestionsLoading}
        />
      )}

      {/* AI Design Suggestions */}
      {suggestionsVisible &&
        (suggestions.length > 0 || suggestionsLoading) &&
        !suggestionsError && (
          <DesignSuggestions
            suggestions={suggestions}
            isLoading={suggestionsLoading}
            onApplyFixes={handleApplyFixes}
            onDismiss={hideSuggestions}
          />
        )}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep('layout')} variant="outline">
          Back to Layout
        </Button>

        <div className="flex gap-2">
          {suggestions.length > 0 && !suggestionsVisible && (
            <Button
              onClick={showSuggestions}
              variant="outline"
              className="border-teal-500/30 hover:bg-teal-500/10 text-teal-300"
            >
              View {suggestions.length} Suggestion{suggestions.length !== 1 ? 's' : ''}
            </Button>
          )}

          <Button
            onClick={handleContinue}
            disabled={!selectedDesignStyle}
            className={selectedDesignStyle ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
          >
            Continue to Color Theme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignStyleStep;
