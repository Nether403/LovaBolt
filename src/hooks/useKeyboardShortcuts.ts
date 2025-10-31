import { useEffect } from 'react';

/**
 * Keyboard shortcut configuration interface
 */
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
  preventDefault?: boolean;
}

/**
 * Options for the useKeyboardShortcuts hook
 */
export interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  shortcuts: KeyboardShortcut[];
}

/**
 * Hook for managing keyboard shortcuts throughout the application
 *
 * Supports modifier keys (Ctrl/Cmd, Shift, Alt) and provides automatic cleanup.
 * Prevents default browser behavior for registered shortcuts by default.
 *
 * @param options - Configuration object containing shortcuts and enabled state
 * @param options.enabled - Whether shortcuts are active (default: true)
 * @param options.shortcuts - Array of keyboard shortcut configurations
 *
 * @example
 * ```tsx
 * const shortcuts: KeyboardShortcut[] = [
 *   {
 *     key: 'ArrowRight',
 *     ctrlKey: true,
 *     action: () => navigateNext(),
 *     description: 'Next step',
 *   },
 *   {
 *     key: 'Escape',
 *     action: () => closeModal(),
 *     description: 'Close modal',
 *   },
 * ];
 *
 * useKeyboardShortcuts({ shortcuts });
 * ```
 */
export const useKeyboardShortcuts = (options: UseKeyboardShortcutsOptions): void => {
  const { enabled = true, shortcuts } = options;

  useEffect(() => {
    if (!enabled) return;

    /**
     * Handles keyboard events and matches them against registered shortcuts
     *
     * Checks each shortcut's key and modifier requirements against the event.
     * Prevents shortcuts from triggering when user is typing in input fields.
     * Automatically prevents default browser behavior for matched shortcuts.
     */
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      shortcuts.forEach((shortcut) => {
        // Check if all modifier keys match
        // If a modifier is undefined, it matches any state
        // If a modifier is explicitly set (true/false), it must match exactly
        const ctrlMatch =
          shortcut.ctrlKey === undefined || shortcut.ctrlKey === (e.ctrlKey || e.metaKey);
        const metaMatch = shortcut.metaKey === undefined || shortcut.metaKey === e.metaKey;
        const shiftMatch = shortcut.shiftKey === undefined || shortcut.shiftKey === e.shiftKey;
        const altMatch = shortcut.altKey === undefined || shortcut.altKey === e.altKey;
        const keyMatch = e.key === shortcut.key;

        // If all conditions match, execute the action
        if (ctrlMatch && metaMatch && shiftMatch && altMatch && keyMatch) {
          // Prevent default browser behavior unless explicitly disabled
          if (shortcut.preventDefault !== false) {
            e.preventDefault();
          }
          shortcut.action();
        }
      });
    };

    // Register event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup on unmount or when dependencies change
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled, shortcuts]);
};
