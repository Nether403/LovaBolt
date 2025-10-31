import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ReactBitsComponent } from '../../types';
import { Button } from '../ui/button';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface ReactBitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: ReactBitsComponent | null;
}

/**
 * ReactBitsModal displays detailed information about a react-bits component.
 * Implements focus trap for accessibility and keyboard navigation.
 * Memoized to prevent unnecessary re-renders when parent components update.
 *
 * @param isOpen - Whether the modal is visible
 * @param onClose - Callback when the modal is closed
 * @param option - The react-bits component data to display
 */
const ReactBitsModalComponent: React.FC<ReactBitsModalProps> = ({ isOpen, onClose, option }) => {
  const [copied, setCopied] = useState(false);

  // Use focus trap hook for accessibility
  const { containerRef } = useFocusTrap({
    enabled: isOpen,
    onEscape: onClose,
  });

  const handleCopy = () => {
    if (option) {
      navigator.clipboard.writeText(option.cliCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen || !option) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl p-4 sm:p-6 animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden max-h-[85vh] sm:max-h-[80vh] overflow-y-auto transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10 pointer-events-none" />

          <div className="relative p-6 sm:p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white">
                {option.title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded p-1 ml-4"
                aria-label={`Close ${option.title} details modal. Press Escape to close.`}
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Description */}
            <p id="modal-description" className="text-gray-300 mb-6">
              {option.description}
            </p>

            {/* Dependencies */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-2" id="modal-dependencies">
                Dependencies
              </h4>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-labelledby="modal-dependencies"
              >
                {option.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="px-3 py-1 bg-gray-700/50 rounded text-gray-300 transition-all duration-200 hover:bg-gray-700/70 hover:text-white"
                    role="listitem"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>

            {/* CLI Command */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-2" id="modal-cli-command">
                Installation Command
              </h4>
              <div className="relative">
                <code
                  className="block p-4 pr-20 bg-gray-900/50 rounded text-teal-400 text-sm overflow-x-auto break-all border border-gray-700/50"
                  aria-labelledby="modal-cli-command"
                >
                  {option.cliCommand}
                </code>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 px-3 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105"
                  aria-label={
                    copied
                      ? 'Installation command copied to clipboard'
                      : 'Copy installation command to clipboard'
                  }
                  aria-live="polite"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Code Snippet */}
            {option.codeSnippet && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-2" id="modal-usage">
                  Basic Usage
                </h4>
                <pre
                  className="p-4 bg-gray-900/50 rounded text-gray-300 text-sm overflow-x-auto border border-gray-700/50"
                  aria-labelledby="modal-usage"
                >
                  {option.codeSnippet}
                </pre>
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end">
              <Button
                onClick={onClose}
                className="bg-teal-600 hover:bg-teal-700 text-white focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 hover:scale-105"
                aria-label="Close modal and return to component selection"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ReactBitsModal = React.memo(ReactBitsModalComponent);

// Display name for debugging
ReactBitsModal.displayName = 'ReactBitsModal';

export default ReactBitsModal;
