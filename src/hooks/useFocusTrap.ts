import { useEffect, useRef } from 'react';

export interface UseFocusTrapOptions {
  enabled: boolean;
  onEscape?: () => void;
}

export interface UseFocusTrapReturn {
  containerRef: React.RefObject<HTMLElement>;
}

/**
 * useFocusTrap hook manages focus within a container element (typically a modal).
 * It traps keyboard focus within the container, handles Tab key cycling,
 * and optionally handles Escape key to close.
 *
 * @param options - Configuration options
 * @param options.enabled - Whether the focus trap is active
 * @param options.onEscape - Optional callback when Escape key is pressed
 * @returns Object containing the ref to attach to the container element
 *
 * @example
 * ```tsx
 * const { containerRef } = useFocusTrap({
 *   enabled: isModalOpen,
 *   onEscape: closeModal
 * });
 *
 * return (
 *   <div ref={containerRef as React.RefObject<HTMLDivElement>}>
 *     {/* Modal content *\/}
 *   </div>
 * );
 * ```
 */
export const useFocusTrap = (options: UseFocusTrapOptions): UseFocusTrapReturn => {
  const { enabled, onEscape } = options;
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Store the element that had focus before the trap was enabled
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the first focusable element in the container
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];

    if (firstElement) {
      // Small delay to ensure the element is ready to receive focus
      setTimeout(() => {
        firstElement.focus();
      }, 0);
    }

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      // Handle Tab key for focus cycling
      if (e.key !== 'Tab') return;

      if (!containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If Shift+Tab on first element, focus last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
      // If Tab on last element, focus first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the element that had focus before the trap
      if (previousFocusRef.current && document.body.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }
    };
  }, [enabled, onEscape]);

  return { containerRef };
};

export default useFocusTrap;
