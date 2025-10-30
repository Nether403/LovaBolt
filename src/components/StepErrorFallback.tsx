import React from 'react';
import { Button } from './ui/button';

interface StepErrorFallbackProps {
  stepName: string;
  onRetry?: () => void;
  onSkip?: () => void;
}

export const StepErrorFallback: React.FC<StepErrorFallbackProps> = ({
  stepName,
  onRetry,
  onSkip,
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 glass-card" />
          <div className="relative p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-12 h-12 text-yellow-400 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Unable to Load {stepName}
            </h2>

            <p className="text-gray-300 mb-6">
              We encountered an error loading this step. You can try again or skip to the next step.
            </p>

            <div className="flex gap-4 justify-center">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Try Again
                </Button>
              )}
              {onSkip && (
                <Button onClick={onSkip} variant="outline">
                  Skip This Step
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
