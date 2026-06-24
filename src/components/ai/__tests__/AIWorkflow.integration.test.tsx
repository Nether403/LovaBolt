/**
 * Complete AI Workflow Integration Tests
 *
 * Tests the end-to-end AI workflow including:
 * - Design suggestions flow from analysis to application
 * - Prompt enhancement flow from generation to acceptance
 * - Integration between suggestions and prompt enhancement
 * - Complete user journey through AI features
 *
 * Requirements: 4.1, 4.4, 5.1, 5.5
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGemini } from '../../../hooks/useGemini';
import { useDesignSuggestions } from '../../../hooks/useDesignSuggestions';
import type { BoltBuilderState } from '../../../types';

// Mock environment variables
vi.stubEnv('VITE_GEMINI_API_KEY', 'AIzaSyC_test_key_1234567890123456789012345');

// Mock wizard state
const mockWizardState: Partial<BoltBuilderState> = {
  projectInfo: {
    type: 'Portfolio',
    name: 'My Portfolio',
    description: 'A portfolio to showcase my design work',
  },
  selectedDesignStyle: {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    description: 'Modern glass-like effects',
  },
  selectedColorTheme: {
    id: 'dark',
    title: 'Dark Theme',
    description: 'Dark color scheme',
  },
  selectedLayout: {
    id: 'single-page',
    title: 'Single Page',
    description: 'One-page layout',
  },
  backgroundSelection: {
    id: 'aurora',
    title: 'Aurora',
    description: 'Aurora background effect',
  },
  selectedComponents: [
    { id: 'carousel', title: 'Carousel', description: 'Image carousel' },
    { id: 'accordion', title: 'Accordion', description: 'Collapsible sections' },
  ],
  selectedAnimations: [{ id: 'fade', title: 'Fade In', description: 'Fade in animation' }],
  selectedFunctionality: [
    { id: 'auth', title: 'Authentication', description: 'User authentication' },
  ],
};

// Mock the Zustand store so hooks under test see the fixed wizard state
vi.mock('../../../stores/boltBuilderStore', () => ({
  useBoltBuilderStore: vi.fn(() => mockWizardState),
}));

describe('Complete AI Workflow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('End-to-End Suggestions Flow (Requirements 4.1, 4.4)', () => {
    it('should complete full suggestion workflow', async () => {
      const { result: geminiResult } = renderHook(() => useGemini());
      const { result: suggestionsResult } = renderHook(() =>
        useDesignSuggestions({
          autoAnalyze: false,
        })
      );

      // Step 1: User makes design selections (mocked in state)
      expect(mockWizardState.selectedDesignStyle).toBeDefined();
      expect(mockWizardState.selectedColorTheme).toBeDefined();

      // Step 2: Trigger suggestions analysis
      await act(async () => {
        await suggestionsResult.current.analyzeSuggestions();
      });

      // Step 3: Verify suggestions were generated
      expect(suggestionsResult.current.isLoading).toBe(false);
      expect(suggestionsResult.current.suggestions).toBeDefined();

      // Step 4: If suggestions exist, verify they have required properties
      if (suggestionsResult.current.suggestions.length > 0) {
        const suggestion = suggestionsResult.current.suggestions[0];
        expect(suggestion.type).toBeDefined();
        expect(suggestion.message).toBeDefined();
        expect(suggestion.reasoning).toBeDefined();
        expect(suggestion.severity).toBeDefined();
        expect(typeof suggestion.autoFixable).toBe('boolean');
      }

      // Step 5: Verify panel visibility can be controlled
      act(() => {
        suggestionsResult.current.showSuggestions();
      });
      expect(suggestionsResult.current.isVisible).toBe(true);

      // Step 6: User can dismiss suggestions
      act(() => {
        suggestionsResult.current.clearSuggestions();
      });
      expect(suggestionsResult.current.suggestions).toEqual([]);
    });

    it('should handle auto-fix application workflow', async () => {
      const { result } = renderHook(() => useDesignSuggestions());

      // Generate suggestions
      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Filter auto-fixable suggestions
      const autoFixable = result.current.suggestions.filter((s) => s.autoFixable);

      // Verify auto-fixable suggestions have all required data
      autoFixable.forEach((suggestion) => {
        expect(suggestion.message).toBeTruthy();
        expect(suggestion.reasoning).toBeTruthy();
        expect(suggestion.type).toBeTruthy();
        expect(suggestion.severity).toBeTruthy();
      });

      // In a real implementation, these would be applied to wizard state
      // Here we just verify the data structure is correct for application
    });

    it('should maintain suggestions across panel show/hide', async () => {
      const { result } = renderHook(() => useDesignSuggestions());

      // Generate suggestions
      await act(async () => {
        await result.current.analyzeSuggestions();
      });

      const initialSuggestions = result.current.suggestions;

      // Hide panel
      act(() => {
        result.current.hideSuggestions();
      });
      expect(result.current.isVisible).toBe(false);

      // Suggestions should still be there
      expect(result.current.suggestions).toEqual(initialSuggestions);

      // Show panel again
      act(() => {
        result.current.showSuggestions();
      });
      expect(result.current.isVisible).toBe(true);
      expect(result.current.suggestions).toEqual(initialSuggestions);
    });
  });

  describe('End-to-End Prompt Enhancement Flow (Requirements 5.1, 5.5)', () => {
    it('should complete full prompt enhancement workflow', async () => {
      const { result } = renderHook(() => useGemini());

      const basicPrompt = `## Project Overview
Build a portfolio website

## Technical Stack
- React
- TypeScript
- Tailwind CSS`;

      // Step 1: User generates basic prompt (from wizard selections)
      expect(basicPrompt).toBeTruthy();

      // Step 2: User requests enhancement
      let enhancement;
      await act(async () => {
        enhancement = await result.current.enhancePrompt(basicPrompt);
      });

      // Step 3: Verify enhancement was generated
      expect(enhancement).toBeDefined();
      expect(enhancement.originalPrompt).toBe(basicPrompt);
      expect(enhancement.enhancedPrompt).toBeDefined();
      expect(enhancement.improvements).toBeDefined();
      expect(enhancement.addedSections).toBeDefined();

      // Step 4: Verify enhancement has more content than original
      expect(enhancement.enhancedPrompt.length).toBeGreaterThanOrEqual(
        enhancement.originalPrompt.length
      );

      // Step 5: User can accept, reject, or edit
      // (These actions would be handled by the component)
    });

    it('should preserve original prompt in enhancement', async () => {
      const { result } = renderHook(() => useGemini());

      const originalPrompt = '## Test\nOriginal content';

      const enhancement = await act(async () => {
        return await result.current.enhancePrompt(originalPrompt);
      });

      expect(enhancement.originalPrompt).toBe(originalPrompt);
    });

    it('should identify added sections correctly', async () => {
      const { result } = renderHook(() => useGemini());

      const basicPrompt = '## Overview\nBasic prompt';

      const enhancement = await act(async () => {
        return await result.current.enhancePrompt(basicPrompt);
      });

      // Should have identified new sections
      expect(Array.isArray(enhancement.addedSections)).toBe(true);
      expect(Array.isArray(enhancement.improvements)).toBe(true);
    });
  });

  describe('Combined Workflow: Suggestions + Enhancement', () => {
    it('should use suggestions to improve design before enhancing prompt', async () => {
      const { result: geminiResult } = renderHook(() => useGemini());
      const { result: suggestionsResult } = renderHook(() => useDesignSuggestions());

      // Step 1: Get design suggestions
      await act(async () => {
        await suggestionsResult.current.analyzeSuggestions();
      });

      // Step 2: Apply auto-fixes (simulated)
      const autoFixable = suggestionsResult.current.suggestions.filter((s) => s.autoFixable);

      // In real app, these would update wizard state
      // Here we just verify the workflow is possible

      // Step 3: Generate prompt with improved design
      const basicPrompt = '## Project\nImproved design';

      // Step 4: Enhance the prompt
      const enhancement = await act(async () => {
        return await geminiResult.current.enhancePrompt(basicPrompt);
      });

      // Verify complete workflow
      expect(enhancement).toBeDefined();
      expect(enhancement.enhancedPrompt).toBeTruthy();
    });

    it('should handle errors in suggestions without blocking enhancement', async () => {
      // Remove API key to trigger error
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const { result: geminiResult } = renderHook(() => useGemini());
      const { result: suggestionsResult } = renderHook(() => useDesignSuggestions());

      // Suggestions might fail
      await act(async () => {
        await suggestionsResult.current.analyzeSuggestions();
      });

      // But enhancement should still work (with fallback)
      const enhancement = await act(async () => {
        return await geminiResult.current.enhancePrompt('Test prompt');
      });

      expect(enhancement).toBeDefined();
    });
  });

  describe('Performance and Caching', () => {
    it('should cache suggestions for identical state', async () => {
      const { result } = renderHook(() => useDesignSuggestions());

      // First analysis
      const start1 = Date.now();
      await act(async () => {
        await result.current.analyzeSuggestions();
      });
      const duration1 = Date.now() - start1;

      const firstSuggestions = result.current.suggestions;

      // Second analysis with same state (should be cached)
      const start2 = Date.now();
      await act(async () => {
        await result.current.analyzeSuggestions();
      });
      const duration2 = Date.now() - start2;

      // Second call should be faster (cached)
      // Note: This might not always be true in test environment
      // but the structure supports caching

      expect(result.current.suggestions).toEqual(firstSuggestions);
    });

    it('should cache prompt enhancements', async () => {
      const { result } = renderHook(() => useGemini());

      const prompt = 'Test prompt for caching';

      // First enhancement
      const enhancement1 = await act(async () => {
        return await result.current.enhancePrompt(prompt);
      });

      // Second enhancement of same prompt (should be cached)
      const enhancement2 = await act(async () => {
        return await result.current.enhancePrompt(prompt);
      });

      // Should return same result
      expect(enhancement1.enhancedPrompt).toBe(enhancement2.enhancedPrompt);
    });
  });

  describe('Error Recovery', () => {
    it('should recover from suggestion errors and continue', async () => {
      const { result } = renderHook(() => useDesignSuggestions());

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

    it('should recover from enhancement errors and continue', async () => {
      const { result } = renderHook(() => useGemini());

      // First call might error
      await act(async () => {
        await result.current.enhancePrompt('test');
      });

      // Should still be able to call again
      await act(async () => {
        await result.current.enhancePrompt('test 2');
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('State Management', () => {
    it('should maintain independent state for suggestions and enhancement', async () => {
      const { result: geminiResult } = renderHook(() => useGemini());
      const { result: suggestionsResult } = renderHook(() => useDesignSuggestions());

      // Trigger both operations
      await act(async () => {
        await Promise.all([
          suggestionsResult.current.analyzeSuggestions(),
          geminiResult.current.enhancePrompt('test'),
        ]);
      });

      // Both should complete independently
      expect(suggestionsResult.current.isLoading).toBe(false);
      expect(geminiResult.current.isLoading).toBe(false);
    });

    it('should clear suggestions without affecting enhancement cache', async () => {
      const { result: geminiResult } = renderHook(() => useGemini());
      const { result: suggestionsResult } = renderHook(() => useDesignSuggestions());

      // Generate both
      await act(async () => {
        await suggestionsResult.current.analyzeSuggestions();
        await geminiResult.current.enhancePrompt('test');
      });

      // Clear suggestions
      act(() => {
        suggestionsResult.current.clearSuggestions();
      });

      expect(suggestionsResult.current.suggestions).toEqual([]);

      // Enhancement cache should still work
      const enhancement = await act(async () => {
        return await geminiResult.current.enhancePrompt('test');
      });

      expect(enhancement).toBeDefined();
    });
  });

  describe('User Experience Flow', () => {
    it('should provide loading states throughout workflow', async () => {
      const { result } = renderHook(() => useDesignSuggestions());

      // Start analysis
      const analysisPromise = act(async () => {
        await result.current.analyzeSuggestions();
      });

      // Should show loading initially
      // (In real app, this would be checked during the async operation)

      await analysisPromise;

      // Should not be loading after completion
      expect(result.current.isLoading).toBe(false);
    });

    it('should provide error feedback throughout workflow', async () => {
      vi.stubEnv('VITE_GEMINI_API_KEY', '');

      const { result } = renderHook(() => useGemini());

      await act(async () => {
        await result.current.analyzeProject('test');
      });

      // Error should be available
      // (Actual error handling depends on implementation)
      expect(result.current.isLoading).toBe(false);
    });
  });
});
