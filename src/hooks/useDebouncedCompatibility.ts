import { useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { useBoltBuilderStore } from '../stores/boltBuilderStore';
import { CompatibilityResult, safeCheckCompatibility } from '../utils/compatibilityChecker';

/**
 * Hook to check design compatibility with debouncing (200ms)
 * Prevents excessive compatibility checks during rapid selection changes
 *
 * @param delay - Debounce delay in milliseconds (default: 200ms)
 * @returns Debounced compatibility result
 *
 * @example
 * ```tsx
 * const compatibility = useDebouncedCompatibility(200);
 * ```
 */
export const useDebouncedCompatibility = (delay: number = 200): CompatibilityResult => {
  const {
    selectedDesignStyle,
    selectedColorTheme,
    selectedComponents,
    selectedFunctionality,
    backgroundSelection,
    selectedAnimations,
  } = useBoltBuilderStore();

  // Create a stable key for debouncing based on selections
  const selectionsKey = useMemo(() => {
    return JSON.stringify({
      designStyle: selectedDesignStyle?.id,
      colorTheme: selectedColorTheme?.id,
      components: selectedComponents?.map((c) => c.id).join(','),
      functionality: selectedFunctionality?.map((f) => f.id).join(','),
      background: backgroundSelection?.id,
      animations: selectedAnimations?.map((a) => a.id).join(','),
    });
  }, [
    selectedDesignStyle,
    selectedColorTheme,
    selectedComponents,
    selectedFunctionality,
    backgroundSelection,
    selectedAnimations,
  ]);

  // Debounce the selections key
  const debouncedKey = useDebounce(selectionsKey, delay);

  // Memoize compatibility check based on debounced key
  const compatibility = useMemo(() => {
    return safeCheckCompatibility({
      selectedDesignStyle,
      selectedColorTheme,
      selectedComponents,
      selectedFunctionality,
      backgroundSelection,
      selectedAnimations,
    });
  }, [
    debouncedKey,
    selectedDesignStyle,
    selectedColorTheme,
    selectedComponents,
    selectedFunctionality,
    backgroundSelection,
    selectedAnimations,
  ]);

  return compatibility;
};

export default useDebouncedCompatibility;
