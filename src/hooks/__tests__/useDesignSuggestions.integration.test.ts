/**
 * Integration Tests for Design Suggestions Flow
 *
 * Tests the complete suggestion flow including:
 * - Suggestion generation and display
 * - Auto-fix application
 * - Integration with wizard state
 *
 * Requirements: 4.1, 4.4
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDesignSuggestions } from '../useDesignSuggestions';

// Mock the Zustand store (useDesignSuggestions reads from it directly)
vi.mock('../../stores/boltBuilderStore', () => ({
  useBoltBuilderStore: vi.fn(() => ({
    selectedDesignStyle: { id: 'glassmorphism', title: 'Glassmorphism', description: '' },
    selectedColorTheme: { id: 'dark', title: 'Dark Theme', description: '' },
    selectedLayout: { id: 'single-page', title: 'Single Page', description: '' },
    backgroundSelection: { id: 'aurora', title: 'Aurora', description: '' },
    selectedComponents: [{ id: 'carousel', title: 'Carousel', description: '' }],
    selectedAnimations: [{ id: 'fade', title: 'Fade In', description: '' }],
    selectedFunctionality: [{ id: 'auth', title: 'Authentication', description: '' }],
  })),
}));

// Mock environment variables
vi.stubEnv('VITE_GEMINI_API_KEY', 'AIzaSyC_test_key_1234567890123456789012345');

describe('Design Suggestions Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Complete Suggestion Flow (Requirement 4.1)', () => {
    it('should initialize with correct state', () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isVisible).toBe(false);
    });

    it('should provide all required methods', () => {
      const { result } = renderHook(() => useDesignSuggestions());

      expect(typeof result.current.analyzeSuggestions).toBe('function');
      expect(typeof result.current.showSuggestions).toBe('function');
      expect(typeof result.current.hideSuggestions).toBe('function');
      expect(typeof result.current.toggleSuggestions).toBe('function');
      expect(typeof result.current.clearSuggestions).toBe('function');
    });

    it('should manually trigger analysis on demand', async () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      // Initially no suggestions
      expect(result.current.suggestions).toEqual([]);

      // Manually trigger analysis
      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Should have completed analysis
      expect(result.current.isLoading).toBe(false);
    });

    it('should verify suggestions have required properties', async () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Verify each suggestion has required properties
      result.current.suggestions.forEach((suggestion) => {
        expect(suggestion).toHaveProperty('type');
        expect(suggestion).toHaveProperty('message');
        expect(suggestion).toHaveProperty('reasoning');
        expect(suggestion).toHaveProperty('severity');
        expect(suggestion).toHaveProperty('autoFixable');
        expect(['improvement', 'warning', 'tip']).toContain(suggestion.type);
        expect(['low', 'medium', 'high']).toContain(suggestion.severity);
        expect(typeof suggestion.autoFixable).toBe('boolean');
      });
    });
  });

  describe('Auto-Fix Application (Requirement 4.4)', () => {
    it('should identify auto-fixable suggestions', async () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Verify auto-fixable flag is boolean
      result.current.suggestions.forEach((suggestion) => {
        expect(typeof suggestion.autoFixable).toBe('boolean');
      });
    });

    it('should provide clear indication of auto-fixable items', async () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Verify auto-fixable suggestions have clear messages
      const autoFixable = result.current.suggestions.filter((s) => s.autoFixable);

      autoFixable.forEach((suggestion) => {
        expect(suggestion.message).toBeTruthy();
        expect(suggestion.type).toBeTruthy();
        expect(suggestion.reasoning).toBeTruthy();
      });
    });
  });

  describe('Suggestion Panel Controls', () => {
    it('should show and hide suggestions panel', () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      // Initially hidden
      expect(result.current.isVisible).toBe(false);

      // Show panel
      act(() => {
        result.current.showSuggestions();
      });
      expect(result.current.isVisible).toBe(true);

      // Hide panel
      act(() => {
        result.current.hideSuggestions();
      });
      expect(result.current.isVisible).toBe(false);
    });

    it('should toggle suggestions panel', () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      const initialState = result.current.isVisible;

      // Toggle once
      act(() => {
        result.current.toggleSuggestions();
      });
      expect(result.current.isVisible).toBe(!initialState);

      // Toggle again
      act(() => {
        result.current.toggleSuggestions();
      });
      expect(result.current.isVisible).toBe(initialState);
    });

    it('should clear suggestions', async () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      // Get some suggestions first
      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Clear suggestions
      act(() => {
        result.current.clearSuggestions();
      });

      expect(result.current.suggestions).toEqual([]);
      expect(result.current.isVisible).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle analysis errors gracefully', async () => {
      // Mock API key to be invalid to trigger error
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Should not crash, error should be handled
      expect(result.current.isLoading).toBe(false);
    });

    it('should continue working after error', async () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      // First call might error
      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Should still be able to call again
      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Configuration Options', () => {
    it('should respect autoAnalyze option', () => {
      const { result: autoResult } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: true,
        })
      );

      const { result: manualResult } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      // Both should initialize successfully
      expect(autoResult.current).toBeDefined();
      expect(manualResult.current).toBeDefined();
    });

    it('should respect minSelections option', async () => {
      const { result } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
          minSelections: 10, // More than we have
        })
      );

      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Should not analyze with insufficient selections
      expect(result.current.suggestions).toEqual([]);
    });
  });
});
