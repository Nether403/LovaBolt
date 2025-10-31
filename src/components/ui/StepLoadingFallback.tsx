import React from 'react';

interface StepLoadingFallbackProps {
  stepName?: string;
}

/**
 * StepLoadingFallback displays an animated skeleton loader while wizard steps are being lazy loaded.
 * Uses glassmorphism styling to match the application's design system.
 * 
 * @param stepName - Optional name of the step being loaded for context
 */
export const StepLoadingFallback: React.FC<StepLoadingFallbackProps> = ({ stepName }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative overflow-hidden rounded-xl max-w-md w-full">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-8">
          <div className="animate-pulse space-y-4">
            {/* Title skeleton */}
            <div className="h-8 w-48 bg-teal-500/20 rounded"></div>
            
            {/* Description skeleton */}
            <div className="h-4 w-64 bg-gray-700/50 rounded"></div>
            
            {/* Optional step name */}
            {stepName && (
              <div className="text-sm text-gray-400 mt-2">
                Loading {stepName}...
              </div>
            )}
            
            {/* Additional skeleton lines */}
            <div className="space-y-2 pt-4">
              <div className="h-3 w-full bg-gray-700/30 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-700/30 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-700/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
