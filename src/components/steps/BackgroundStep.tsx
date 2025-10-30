import React, { useState } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { backgroundOptions } from '../../data/reactBitsData';
import { BackgroundOption } from '../../types';
import { Button } from '../ui/button';
import { ReactBitsCard } from '../cards/ReactBitsCard';
import { ReactBitsModal } from '../modals/ReactBitsModal';
import ErrorBoundary from '../ErrorBoundary';
import { StepErrorFallback } from '../StepErrorFallback';

const BackgroundStepContent: React.FC = () => {
  const { selectedBackground, setSelectedBackground, setCurrentStep } = useBoltBuilder();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    option: BackgroundOption | null;
  }>({
    isOpen: false,
    option: null,
  });
  const [dataLoadError, setDataLoadError] = useState<boolean>(false);

  // Memoize selection handler to prevent unnecessary re-renders of child components
  const handleSelect = React.useCallback((option: BackgroundOption) => {
    setSelectedBackground(option);
  }, [setSelectedBackground]);

  // Memoize view details handler
  const handleViewDetails = React.useCallback((e: React.MouseEvent, option: BackgroundOption) => {
    e.stopPropagation();
    setModalState({ isOpen: true, option });
  }, []);

  // Memoize modal close handler
  const handleCloseModal = React.useCallback(() => {
    setModalState({ isOpen: false, option: null });
  }, []);

  // Memoize navigation handlers
  const handleContinue = React.useCallback(() => {
    setCurrentStep('components');
  }, [setCurrentStep]);

  const handleBack = React.useCallback(() => {
    setCurrentStep('visuals');
  }, [setCurrentStep]);

  const handleRetry = React.useCallback(() => {
    setDataLoadError(false);
  }, []);

  const handleSkip = React.useCallback(() => {
    setCurrentStep('components');
  }, [setCurrentStep]);

  // Check if data loaded successfully
  React.useEffect(() => {
    try {
      if (!backgroundOptions || backgroundOptions.length === 0) {
        console.error('BackgroundStep: Failed to load background options');
        setDataLoadError(true);
      }
    } catch (error) {
      console.error('BackgroundStep: Error checking data:', error);
      setDataLoadError(true);
    }
  }, []);

  // Show error fallback if data failed to load
  if (dataLoadError) {
    return (
      <StepErrorFallback
        stepName="Background Effects"
        onRetry={handleRetry}
        onSkip={handleSkip}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Screen reader announcement for selection changes */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {selectedBackground 
          ? `${selectedBackground.title} background selected` 
          : 'No background selected'}
      </div>

      {/* Header */}
      <div className="animate-slide-up">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white">Background Effects</h2>
        <p className="text-sm sm:text-base text-gray-300">
          Choose a background effect to enhance your project's visual appeal.
        </p>
      </div>

      {/* Grid of backgrounds */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="group"
        aria-label="Background effects selection"
      >
        {backgroundOptions.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedBackground?.id === option.id}
            onSelect={() => handleSelect(option)}
            onViewDetails={(e) => handleViewDetails(e, option)}
          />
        ))}
      </div>

      {/* Selected CLI Command Display */}
      {selectedBackground && (
        <div className="relative overflow-hidden rounded-xl animate-slide-up">
          <div className="absolute inset-0 glass-card transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
          <div className="relative p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
              Installation Command
            </h3>
            <code className="text-xs sm:text-sm text-teal-400 break-all block">
              {selectedBackground.cliCommand}
            </code>
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
          Back to Visuals
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto transition-all duration-200 hover:scale-105"
        >
          Continue to Components
        </Button>
      </div>

      {/* Modal - wrapped in ErrorBoundary to prevent crashes */}
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
          stepName="Background Effects"
          onSkip={() => (window.location.hash = '#/components')}
        />
      }
    >
      <BackgroundStepContent />
    </ErrorBoundary>
  );
};

export default BackgroundStep;
