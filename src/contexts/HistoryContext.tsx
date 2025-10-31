import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Represents the state at a point in time for undo/redo functionality
 *
 * Uses a three-part structure to track history:
 * - past: Array of previous states (for undo)
 * - present: Current active state
 * - future: Array of future states (for redo, cleared on new actions)
 *
 * @template T - The type of state being tracked
 */
export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

/**
 * Context interface for history management (undo/redo)
 *
 * Provides a complete undo/redo system with:
 * - state: Current state value
 * - canUndo: Boolean indicating if undo is available
 * - canRedo: Boolean indicating if redo is available
 * - undo: Function to restore previous state
 * - redo: Function to restore next state
 * - pushState: Function to add new state to history
 * - clearHistory: Function to reset all history
 *
 * @template T - The type of state being managed
 */
export interface HistoryContextType<T> {
  state: T;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  pushState: (state: T) => void;
  clearHistory: () => void;
}

/**
 * Custom hook for managing undo/redo history
 *
 * Implements a complete undo/redo system with automatic state tracking and memory management.
 * Uses a three-part history structure (past, present, future) to enable bidirectional navigation.
 *
 * @template T - The type of state being tracked
 * @param initialState - The initial state value to start with
 * @param maxHistorySize - Maximum number of history entries to keep (default: 50)
 *                         Prevents memory issues with long-running sessions
 *
 * @returns Object containing:
 *   - state: Current state value
 *   - canUndo: Boolean indicating if undo is available (past.length > 0)
 *   - canRedo: Boolean indicating if redo is available (future.length > 0)
 *   - undo: Function to restore previous state
 *   - redo: Function to restore next state
 *   - pushState: Function to add new state to history
 *   - clearHistory: Function to reset all history to initial state
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { state, canUndo, canRedo, undo, redo, pushState } = useHistory({
 *   selectedBackground: null,
 *   selectedComponents: [],
 * });
 *
 * // Update state
 * pushState({ selectedBackground: newBackground, selectedComponents: [] });
 *
 * // Undo/redo
 * if (canUndo) undo();
 * if (canRedo) redo();
 * ```
 *
 * @remarks
 * - Automatically prevents duplicate states (compares via JSON.stringify)
 * - Clears future history when new state is pushed (standard undo/redo behavior)
 * - Limits history size to prevent memory issues
 * - Debounce state updates in your component to avoid excessive history entries
 */
export const useHistory = <T,>(initialState: T, maxHistorySize: number = 50) => {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  /**
   * Pushes a new state to history
   *
   * Adds the current state to the past array and sets the new state as present.
   * Clears the future array (standard undo/redo behavior - new actions invalidate redo).
   * Automatically prevents duplicate states by comparing JSON representations.
   * Enforces maximum history size by removing oldest entries when limit is reached.
   *
   * @param newState - The new state to add to history
   */
  const pushState = useCallback(
    (newState: T) => {
      setHistory((prev) => {
        // Don't push if state hasn't changed
        if (JSON.stringify(prev.present) === JSON.stringify(newState)) {
          return prev;
        }

        const newPast = [...prev.past, prev.present];

        // Limit history size to prevent memory issues
        if (newPast.length > maxHistorySize) {
          newPast.shift();
        }

        return {
          past: newPast,
          present: newState,
          future: [], // Clear future on new action
        };
      });
    },
    [maxHistorySize]
  );

  /**
   * Undoes the last action
   *
   * Moves the current state to the future array and restores the most recent
   * state from the past array. Does nothing if no past states exist.
   *
   * @remarks
   * After undo, the state can be restored using redo() until a new action is performed.
   */
  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;

      const previous = prev.past[prev.past.length - 1];
      if (!previous) return prev; // Type guard

      const newPast = prev.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  /**
   * Redoes the last undone action
   *
   * Moves the current state to the past array and restores the next state
   * from the future array. Does nothing if no future states exist.
   *
   * @remarks
   * Redo is only available after undo() has been called. Any new action
   * (via pushState) will clear the future array and disable redo.
   */
  const redo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;

      const next = prev.future[0];
      if (!next) return prev; // Type guard

      const newFuture = prev.future.slice(1);

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  /**
   * Clears all history and resets to initial state
   *
   * Removes all past and future states, setting the present state back to
   * the initial state provided when the hook was created.
   *
   * @remarks
   * This action cannot be undone. All history will be permanently lost.
   */
  const clearHistory = useCallback(() => {
    setHistory({
      past: [],
      present: initialState,
      future: [],
    });
  }, [initialState]);

  return {
    state: history.present,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo,
    redo,
    pushState,
    clearHistory,
  };
};

// Create a context for history (optional, for global history management)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HistoryContext = createContext<HistoryContextType<any> | undefined>(undefined);

/**
 * Provider component for history context
 *
 * Wraps your application or component tree to provide global history management.
 * Use this when you need to share undo/redo state across multiple components.
 *
 * @template T - The type of state being managed
 * @param children - React children to wrap with the provider
 * @param initialState - Initial state value for the history
 *
 * @example
 * ```tsx
 * <HistoryProvider initialState={{ count: 0 }}>
 *   <App />
 * </HistoryProvider>
 * ```
 *
 * @remarks
 * For most use cases, using the useHistory hook directly is simpler and more flexible.
 * Only use this provider if you need to share history state across distant components.
 */
export const HistoryProvider = <T,>({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: T;
}) => {
  const history = useHistory(initialState);

  return <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>;
};

/**
 * Hook to access history context
 *
 * Provides access to the global history state when using HistoryProvider.
 * Must be used within a HistoryProvider component or it will throw an error.
 *
 * @template T - The type of state being managed
 * @returns The history context value with all history management functions
 *
 * @throws Error if used outside of a HistoryProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, undo, redo, canUndo, canRedo } = useHistoryContext();
 *
 *   return (
 *     <div>
 *       <button onClick={undo} disabled={!canUndo}>Undo</button>
 *       <button onClick={redo} disabled={!canRedo}>Redo</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useHistoryContext = <T,>(): HistoryContextType<T> => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }
  return context;
};
