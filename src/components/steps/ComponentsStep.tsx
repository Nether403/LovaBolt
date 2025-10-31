import React, { useState, useMemo } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { componentOptions as reactBitsComponents } from '../../data/react-bits';
import { ComponentOption } from '../../types';
import { Button } from '../ui/button';
import { ReactBitsCard } from '../cards/ReactBitsCard';
import { ReactBitsModal } from '../modals/ReactBitsModal';
import { SearchFilter } from '../ui/SearchFilter';
import { useSearchFilter } from '../../hooks/useSearchFilter';
import ErrorBoundary from '../ErrorBoundary';
import { StepErrorFallback } from '../StepErrorFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartSuggestionPanel } from '../ai/SmartSuggestionPanel';
import { useSmartSuggestions } from '../../hooks/useSmartSuggestions';

const ITEMS_PER_PAGE = 6;

// Extract unique tags from components
const COMPONENT_TAGS = Array.from(
  new Set(reactBitsComponents.flatMap((comp) => comp.tags || []))
).sort();

const ComponentsStepContent: React.FC = () => {
  const { selectedComponents, setSelectedComponents, setCurrentStep, selectedFunctionality } = useBoltBuilder();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    option: ComponentOption | null;
  }>({
    isOpen: false,
    option: null,
  });
  const [dataLoadError, setDataLoadError] = useState<boolean>(false);

  // Get AI suggestions
  const suggestions = useSmartSuggestions({
    currentStep: 'components',
    selections: { selectedFunctionality },
    enabled: true,
  });

  // Use search filter hook
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    filteredItems: filteredComponents,
    resultCount,
  } = useSearchFilter<ComponentOption>(
    reactBitsComponents,
    ['title', 'description', 'id'],
    (item) => item.tags || []
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredComponents.length / ITEMS_PER_PAGE);
  const paginatedComponents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredComponents.slice(startIndex, endIndex);
  }, [currentPage, filteredComponents]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags]);

  // Memoize toggle handler to prevent unnecessary re-renders of child components
  const handleToggle = React.useCallback(
    (option: ComponentOption) => {
      setSelectedComponents((prev) =>
        prev.some((item) => item.id === option.id)
          ? prev.filter((item) => item.id !== option.id)
          : [...prev, option]
      );
    },
    [setSelectedComponents]
  );

  // Memoize view details handler
  const handleViewDetails = React.useCallback((e: React.MouseEvent, option: ComponentOption) => {
    e.stopPropagation();
    setModalState({ isOpen: true, option });
  }, []);

  // Memoize navigation handlers
  const handleContinue = React.useCallback(() => {
    setCurrentStep('animations');
  }, [setCurrentStep]);

  const handleBack = React.useCallback(() => {
    setCurrentStep('background');
  }, [setCurrentStep]);

  const handleRetry = React.useCallback(() => {
    setDataLoadError(false);
  }, []);

  const handleSkip = React.useCallback(() => {
    setCurrentStep('animations');
  }, [setCurrentStep]);

  // Check if data loaded successfully
  React.useEffect(() => {
    try {
      if (!reactBitsComponents || reactBitsComponents.length === 0) {
        console.error('ComponentsStep: Failed to load component options');
        setDataLoadError(true);
      }
    } catch (error) {
      console.error('ComponentsStep: Error checking data:', error);
      setDataLoadError(true);
    }
  }, []);

  // Show error fallback if data failed to load
  if (dataLoadError) {
    return <StepErrorFallback stepName="UI Components" onRetry={handleRetry} onSkip={handleSkip} />;
  }

  return (
    <div className="space-y-8">
      {/* Screen reader announcement for selection changes */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {selectedComponents.length === 0
          ? 'No components selected'
          : `${selectedComponents.length} component${selectedComponents.length === 1 ? '' : 's'} selected`}
      </div>

      {/* Header with count */}
      <div className="animate-slide-up">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white">
          UI Components
        </h2>
        <p className="text-sm sm:text-base text-gray-300" aria-live="polite">
          Select components to enhance your interface.{' '}
          <span className="text-teal-400 font-semibold">{selectedComponents.length}</span> selected.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="animate-slide-up">
        <SearchFilter
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search components (e.g., carousel, dock, accordion...)"
          tags={COMPONENT_TAGS}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          resultCount={resultCount}
        />
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="animate-slide-up">
          <SmartSuggestionPanel
            suggestions={suggestions}
            onApplySuggestion={(suggestion, item) => {
              handleToggle(item);
            }}
          />
        </div>
      )}

      {/* Info banner */}
      <div className="relative overflow-hidden rounded-xl animate-slide-up">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-4 flex items-center gap-3">
          <div className="bg-teal-500/20 p-2 rounded-lg">
            <svg
              className="w-5 h-5 text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of components */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="group"
        aria-label="UI components selection. Multiple selection allowed."
      >
        {paginatedComponents.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedComponents.some((item) => item.id === option.id)}
            onSelect={() => handleToggle(option)}
            onViewDetails={(e) => handleViewDetails(e, option)}
            showPreview={true}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-10 h-10 rounded-lg transition-all duration-200
                  ${
                    currentPage === page
                      ? 'bg-teal-600 text-white font-semibold'
                      : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
                  }
                `}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Selected CLI Commands Display */}
      {selectedComponents.length > 0 && (
        <div className="relative overflow-hidden rounded-xl animate-slide-up">
          <div className="absolute inset-0 glass-card transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
          <div className="relative p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              Installation Commands ({selectedComponents.length})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
              {selectedComponents.map((comp) => (
                <code
                  key={comp.id}
                  className="block text-xs sm:text-sm text-teal-400 break-all p-2 bg-gray-900/30 rounded transition-colors duration-200 hover:bg-gray-900/50"
                >
                  {comp.cliCommand}
                </code>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
        <Button
          onClick={handleBack}
          variant="outline"
          className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
        >
          Back to Background
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto transition-all duration-200 hover:scale-105"
        >
          Continue to Animations
        </Button>
      </div>

      {/* Modal - wrapped in ErrorBoundary to prevent crashes */}
      <ErrorBoundary
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="glass-card rounded-xl max-w-md w-full p-6 text-center">
              <p className="text-white mb-4">Unable to display details</p>
              <Button
                onClick={() => setModalState({ isOpen: false, option: null })}
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        }
      >
        <ReactBitsModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, option: null })}
          option={modalState.option}
        />
      </ErrorBoundary>
    </div>
  );
};

const ComponentsStep: React.FC = () => {
  return (
    <ErrorBoundary
      fallback={
        <StepErrorFallback
          stepName="UI Components"
          onSkip={() => (window.location.hash = '#/animations')}
        />
      }
    >
      <ComponentsStepContent />
    </ErrorBoundary>
  );
};

export default ComponentsStep;
