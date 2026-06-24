/**
 * useDesignSuggestions Hook
 *
 * Manages design suggestions state and triggers analysis after selections
 * Provides a unified interface for showing/hiding suggestions across wizard steps
 */

import { useState, useCallback, useEffect } from 'react';
import { useSuggestImprovements } from './ai/useAiMutations';
import { useBoltBuilderStore } from '../stores/boltBuilderStore';
import type { DesignSuggestion } from '../types/gemini';

export interface UseDesignSuggestionsOptions {
  /**
   * Whether to automatically trigger analysis when state changes
   */
  autoAnalyze?: boolean;

  /**
   * Minimum number of selections required before triggering analysis
   */
  minSelections?: number;

  /**
   * Debounce delay in milliseconds before triggering analysis
   */
  debounceMs?: number;
}

export interface UseDesignSuggestionsResult {
  /**
   * Current suggestions from AI
   */
  suggestions: DesignSuggestion[];

  /**
   * Whether suggestions are currently loading
   */
  isLoading: boolean;

  /**
   * Error that occurred during analysis
   */
  error: Error | null;

  /**
   * Whether suggestions panel is visible
   */
  isVisible: boolean;

  /**
   * Manually trigger suggestions analysis
   */
  analyzeSuggestions: () => Promise<void>;

  /**
   * Show the suggestions panel
   */
  showSuggestions: () => void;

  /**
   * Hide the suggestions panel
   */
  hideSuggestions: () => void;

  /**
   * Toggle suggestions panel visibility
   */
  toggleSuggestions: () => void;

  /**
   * Clear current suggestions
   */
  clearSuggestions: () => void;
}

/**
 * Hook for managing design suggestions across wizard steps
 * Automatically triggers analysis when selections change (if enabled)
 *
 * @param options - Configuration options
 * @returns Hook interface with suggestions state and methods
 */
export function useDesignSuggestions(
  options: UseDesignSuggestionsOptions = {}
): UseDesignSuggestionsResult {
  const { autoAnalyze = true, minSelections = 2, debounceMs = 1000 } = options;

  const { suggestImprovements, isSuggesting, suggestionError } = useSuggestImprovements();

  // Get wizard state
  const state = useBoltBuilderStore();

  // Local state
  const [suggestions, setSuggestions] = useState<DesignSuggestion[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  /**
   * Count the number of selections made
   */
  const countSelections = useCallback(() => {
    let count = 0;

    if (state.selectedDesignStyle) count++;
    if (state.selectedColorTheme) count++;
    if (state.selectedLayout) count++;
    if (state.backgroundSelection) count++;
    if (state.selectedComponents.length > 0) count++;
    if (state.selectedAnimations.length > 0) count++;
    if (state.selectedFunctionality.length > 0) count++;

    return count;
  }, [
    state.selectedDesignStyle,
    state.selectedColorTheme,
    state.selectedLayout,
    state.backgroundSelection,
    state.selectedComponents,
    state.selectedAnimations,
    state.selectedFunctionality,
  ]);

  /**
   * Manually trigger suggestions analysis
   */
  const analyzeSuggestions = useCallback(async () => {
    try {
      console.log('[useDesignSuggestions] Analyzing design selections...');

      // Check if we have enough selections
      const selectionCount = countSelections();
      if (selectionCount < minSelections) {
        console.log(
          `[useDesignSuggestions] Not enough selections (${selectionCount}/${minSelections})`
        );
        setSuggestions([]);
        return;
      }

      // Call AI to get suggestions
      const result = await suggestImprovements(state);

      console.log(`[useDesignSuggestions] Received ${result.length} suggestions`);
      setSuggestions(result);

      // Show suggestions if we got any
      if (result.length > 0) {
        setIsVisible(true);
      }
    } catch (err) {
      console.error('[useDesignSuggestions] Failed to analyze suggestions:', err);
      // Error is already handled by useGemini hook
    }
  }, [state, suggestImprovements, countSelections, minSelections]);

  /**
   * Auto-analyze when selections change (with debounce)
   */
  useEffect(() => {
    if (!autoAnalyze) {
      return;
    }

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      const selectionCount = countSelections();

      // Only analyze if we have enough selections
      if (selectionCount >= minSelections) {
        console.log('[useDesignSuggestions] Auto-analyzing after selection change');
        analyzeSuggestions();
      }
    }, debounceMs);

    setDebounceTimer(timer);

    // Cleanup
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    autoAnalyze,
    debounceMs,
    minSelections,
    countSelections,
    // Dependencies that trigger re-analysis
    state.selectedDesignStyle,
    state.selectedColorTheme,
    state.selectedLayout,
    state.backgroundSelection,
    state.selectedComponents,
    state.selectedAnimations,
    state.selectedFunctionality,
  ]);

  /**
   * Show suggestions panel
   */
  const showSuggestions = useCallback(() => {
    setIsVisible(true);
  }, []);

  /**
   * Hide suggestions panel
   */
  const hideSuggestions = useCallback(() => {
    setIsVisible(false);
  }, []);

  /**
   * Toggle suggestions panel visibility
   */
  const toggleSuggestions = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  /**
   * Clear current suggestions
   */
  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setIsVisible(false);
  }, []);

  return {
    suggestions,
    isLoading: isSuggesting,
    error: suggestionError,
    isVisible,
    analyzeSuggestions,
    showSuggestions,
    hideSuggestions,
    toggleSuggestions,
    clearSuggestions,
  };
}
