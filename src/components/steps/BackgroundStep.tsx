import React, { useState, useMemo } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { backgroundOptions as reactBitsBackgrounds } from '../../data/react-bits';
import { backgroundPatterns } from '../../data/wizardData';
import { BackgroundOption, BackgroundSelection } from '../../types';
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

// Extract unique tags from backgrounds
const BACKGROUND_TAGS = Array.from(
  new Set(reactBitsBackgrounds.flatMap((bg) => bg.tags || []))
).sort();

const BackgroundStepContent: React.FC = () => {
  const { backgroundSelection, setBackgroundSelection, setCurrentStep, selectedColorTheme } = useBoltBuilder();
  const [backgroundType, setBackgroundType] = useState<
    'solid' | 'gradient' | 'pattern' | 'react-bits'
  >(backgroundSelection?.type || 'solid');
  const [solidColor, setSolidColor] = useState(backgroundSelection?.solidColor || '#1F2937');
  const [gradientColors, setGradientColors] = useState(
    backgroundSelection?.gradientColors || ['#3B82F6', '#8B5CF6']
  );
  const [gradientDirection, setGradientDirection] = useState(
    backgroundSelection?.gradientDirection || 'to right'
  );
  const [selectedPattern, setSelectedPattern] = useState(backgroundSelection?.pattern || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    option: BackgroundOption | null;
  }>({
    isOpen: false,
    option: null,
  });

  // Get AI suggestions
  const suggestions = useSmartSuggestions({
    currentStep: 'background',
    selections: { selectedColorTheme },
    enabled: true,
  });

  // Use search filter hook
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    filteredItems: filteredBackgrounds,
    resultCount,
  } = useSearchFilter<BackgroundOption>(
    reactBitsBackgrounds,
    ['title', 'description', 'id'],
    (item) => item.tags || []
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBackgrounds.length / ITEMS_PER_PAGE);
  const paginatedBackgrounds = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBackgrounds.slice(startIndex, endIndex);
  }, [currentPage, filteredBackgrounds]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags]);

  const handleTypeChange = (type: 'solid' | 'gradient' | 'pattern' | 'react-bits') => {
    setBackgroundType(type);
    setCurrentPage(1); // Reset to first page when changing type
    updateBackgroundSelection(type);
  };

  const updateBackgroundSelection = (type?: 'solid' | 'gradient' | 'pattern' | 'react-bits') => {
    const currentType = type || backgroundType;
    const selection: BackgroundSelection = {
      type: currentType,
      ...(currentType === 'solid' && { solidColor }),
      ...(currentType === 'gradient' && { gradientColors, gradientDirection }),
      ...(currentType === 'pattern' && { pattern: selectedPattern }),
    };
    setBackgroundSelection(selection);
  };

  const handleSolidColorChange = (color: string) => {
    setSolidColor(color);
    setBackgroundSelection({
      type: 'solid',
      solidColor: color,
    });
  };

  const handleGradientColorChange = (index: number, color: string) => {
    const newColors = [...gradientColors];
    newColors[index] = color;
    setGradientColors(newColors);
    setBackgroundSelection({
      type: 'gradient',
      gradientColors: newColors,
      gradientDirection,
    });
  };

  const handleGradientDirectionChange = (direction: string) => {
    setGradientDirection(direction);
    setBackgroundSelection({
      type: 'gradient',
      gradientColors,
      gradientDirection: direction,
    });
  };

  const handlePatternSelect = (patternId: string) => {
    setSelectedPattern(patternId);
    setBackgroundSelection({
      type: 'pattern',
      pattern: patternId,
    });
  };

  const handleReactBitsSelect = (option: BackgroundOption) => {
    setBackgroundSelection({
      type: 'react-bits',
      reactBitsComponent: option,
    });
  };

  const handleViewDetails = (e: React.MouseEvent, option: BackgroundOption) => {
    e.stopPropagation();
    setModalState({ isOpen: true, option });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, option: null });
  };

  const handleContinue = () => {
    setCurrentStep('components');
  };

  const handleBack = () => {
    setCurrentStep('visuals');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white">Background</h2>
        <p className="text-sm sm:text-base text-gray-300">
          Choose a background style for your project.
        </p>
      </div>

      {/* Background Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleTypeChange('solid')}
          className={`
            relative overflow-hidden rounded-xl p-4 transition-all duration-300
            ${backgroundType === 'solid' ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
          `}
        >
          <div className="absolute inset-0 glass-card" />
          <div className="relative text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900" />
            <p className="text-white font-medium text-sm">Solid Color</p>
          </div>
        </button>

        <button
          onClick={() => handleTypeChange('gradient')}
          className={`
            relative overflow-hidden rounded-xl p-4 transition-all duration-300
            ${backgroundType === 'gradient' ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
          `}
        >
          <div className="absolute inset-0 glass-card" />
          <div className="relative text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <p className="text-white font-medium text-sm">Gradient</p>
          </div>
        </button>

        <button
          onClick={() => handleTypeChange('pattern')}
          className={`
            relative overflow-hidden rounded-xl p-4 transition-all duration-300
            ${backgroundType === 'pattern' ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
          `}
        >
          <div className="absolute inset-0 glass-card" />
          <div className="relative text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gray-800 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,.05)_10px,rgba(255,255,255,.05)_20px)]" />
            <p className="text-white font-medium text-sm">Pattern</p>
          </div>
        </button>

        <button
          onClick={() => handleTypeChange('react-bits')}
          className={`
            relative overflow-hidden rounded-xl p-4 transition-all duration-300
            ${backgroundType === 'react-bits' ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
          `}
        >
          <div className="absolute inset-0 glass-card" />
          <div className="relative text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <p className="text-white font-medium text-sm">React-Bits</p>
          </div>
        </button>
      </div>

      {/* Solid Color Options */}
      {backgroundType === 'solid' && (
        <div className="relative overflow-hidden rounded-xl animate-slide-up">
          <div className="absolute inset-0 glass-card" />
          <div className="relative p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Solid Color</h3>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={solidColor}
                onChange={(e) => handleSolidColorChange(e.target.value)}
                className="w-20 h-20 rounded-lg cursor-pointer border-2 border-white/20"
              />
              <div>
                <p className="text-white font-medium">{solidColor}</p>
                <p className="text-gray-400 text-sm">Click to change color</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gradient Options */}
      {backgroundType === 'gradient' && (
        <div className="relative overflow-hidden rounded-xl animate-slide-up">
          <div className="absolute inset-0 glass-card" />
          <div className="relative p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Gradient Colors</h3>

            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Color 1</label>
                <input
                  type="color"
                  value={gradientColors[0]}
                  onChange={(e) => handleGradientColorChange(0, e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-white/20"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Color 2</label>
                <input
                  type="color"
                  value={gradientColors[1]}
                  onChange={(e) => handleGradientColorChange(1, e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-white/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Direction</label>
              <select
                value={gradientDirection}
                onChange={(e) => handleGradientDirectionChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border-white/20 text-white border
                         focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                         transition-all duration-200
                         [&>option]:bg-gray-800 [&>option]:text-white"
              >
                <option value="to right">Left to Right</option>
                <option value="to left">Right to Left</option>
                <option value="to bottom">Top to Bottom</option>
                <option value="to top">Bottom to Top</option>
                <option value="to bottom right">Diagonal ↘</option>
                <option value="to bottom left">Diagonal ↙</option>
                <option value="to top right">Diagonal ↗</option>
                <option value="to top left">Diagonal ↖</option>
              </select>
            </div>

            <div
              className="w-full h-32 rounded-lg"
              style={{
                background: `linear-gradient(${gradientDirection}, ${gradientColors[0]}, ${gradientColors[1]})`,
              }}
            />
          </div>
        </div>
      )}

      {/* Pattern Options */}
      {backgroundType === 'pattern' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
          {backgroundPatterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => handlePatternSelect(pattern.id)}
              className={`
                relative overflow-hidden rounded-xl p-6 transition-all duration-300
                ${selectedPattern === pattern.id ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
              `}
            >
              <div className="absolute inset-0 glass-card" />
              <div className="relative">
                <div
                  className="w-full h-24 rounded-lg mb-3 bg-gray-800"
                  style={{
                    backgroundImage:
                      pattern.id === 'geometric'
                        ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
                        : pattern.id === 'organic'
                          ? 'radial-gradient(circle at 20% 50%, rgba(255,255,255,.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,.05) 0%, transparent 50%)'
                          : pattern.id === 'abstract'
                            ? 'linear-gradient(45deg, rgba(255,255,255,.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.05) 75%), linear-gradient(-45deg, rgba(255,255,255,.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,.05) 75%)'
                            : 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,.03) 20px, rgba(255,255,255,.03) 40px)',
                    backgroundSize: pattern.id === 'abstract' ? '20px 20px' : 'auto',
                  }}
                />
                <h4 className="text-white font-medium text-sm mb-1">{pattern.title}</h4>
                <p className="text-gray-400 text-xs">{pattern.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* React-Bits Options */}
      {backgroundType === 'react-bits' && (
        <div className="space-y-6 animate-slide-up">
          {/* Search Filter */}
          <SearchFilter
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search backgrounds (e.g., aurora, gooey, particles...)"
            tags={BACKGROUND_TAGS}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            resultCount={resultCount}
          />

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <SmartSuggestionPanel
              suggestions={suggestions}
              onApplySuggestion={(suggestion, item) => {
                handleReactBitsSelect(item);
              }}
            />
          )}

          {/* Info banner */}
          <div className="relative overflow-hidden rounded-xl">
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

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBackgrounds.map((option) => (
              <ReactBitsCard
                key={option.id}
                option={option}
                isSelected={backgroundSelection?.reactBitsComponent?.id === option.id}
                onSelect={() => handleReactBitsSelect(option)}
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
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
        <Button
          onClick={handleBack}
          variant="outline"
          className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
        >
          Back to Visuals
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto transition-all duration-200 hover:scale-105"
        >
          Continue to Components
        </Button>
      </div>

      {/* Modal */}
      <ErrorBoundary
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="glass-card rounded-xl max-w-md w-full p-6 text-center">
              <p className="text-white mb-4">Unable to display details</p>
              <Button onClick={handleCloseModal} variant="outline">
                Close
              </Button>
            </div>
          </div>
        }
      >
        <ReactBitsModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          option={modalState.option}
        />
      </ErrorBoundary>
    </div>
  );
};

const BackgroundStep: React.FC = () => {
  return (
    <ErrorBoundary
      fallback={
        <StepErrorFallback
          stepName="Background"
          onSkip={() => (window.location.hash = '#/components')}
        />
      }
    >
      <BackgroundStepContent />
    </ErrorBoundary>
  );
};

export default BackgroundStep;
