import { useState, useEffect } from 'react';
import {
  DesignStyle,
  ColorTheme,
  FunctionalityOption,
  BackgroundOption,
  ComponentOption,
  AnimationOption,
} from '../types';
import {
  getCompatibleThemes,
  getCompatibleAnimations,
  getCompatibleBackgrounds,
  getAdvancedComponents,
  getBasicComponents,
} from '../utils/compatibilityMappings';

export interface Suggestion {
  title: string;
  items: any[];
  reason: string;
  confidence: number;
  category: 'layout' | 'design' | 'color' | 'component' | 'animation' | 'background';
}

export interface UseSmartSuggestionsOptions {
  currentStep: string;
  selections: {
    selectedDesignStyle?: DesignStyle | null;
    selectedColorTheme?: ColorTheme | null;
    selectedFunctionality?: FunctionalityOption[];
  };
  enabled?: boolean;
}

/**
 * Hook for generating context-aware suggestions based on current wizard step and selections
 * 
 * @param options - Configuration object containing current step, selections, and enabled flag
 * @returns Array of suggestions with confidence scores and reasoning
 * 
 * @example
 * ```tsx
 * const suggestions = useSmartSuggestions({
 *   currentStep: 'color-theme',
 *   selections: { selectedDesignStyle },
 *   enabled: true
 * });
 * ```
 */
export const useSmartSuggestions = (
  options: UseSmartSuggestionsOptions
): Suggestion[] => {
  const { currentStep, selections, enabled = true } = options;
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [debouncedSelections, setDebouncedSelections] = useState(selections);

  // Debounce selections to prevent excessive recalculations
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSelections(selections);
    }, 300);

    return () => clearTimeout(timer);
  }, [selections]);

  useEffect(() => {
    if (!enabled) {
      setSuggestions([]);
      return;
    }

    const newSuggestions: Suggestion[] = [];

    // Color theme suggestions based on design style
    if (currentStep === 'color-theme' && debouncedSelections.selectedDesignStyle) {
      const compatibleThemes = getCompatibleThemes(debouncedSelections.selectedDesignStyle);
      if (compatibleThemes.length > 0) {
        newSuggestions.push({
          title: `Recommended for ${debouncedSelections.selectedDesignStyle.title}`,
          items: compatibleThemes,
          reason: 'These color themes complement your design style',
          confidence: 0.8,
          category: 'color',
        });
      }
    }

    // Component suggestions based on functionality
    if (currentStep === 'components' && debouncedSelections.selectedFunctionality) {
      const tier = debouncedSelections.selectedFunctionality.find(f => f.tier);
      if (tier?.tier === 'advanced' || tier?.tier === 'enterprise') {
        const advancedComponents = getAdvancedComponents();
        if (advancedComponents.length > 0) {
          newSuggestions.push({
            title: 'Recommended for Advanced Features',
            items: advancedComponents,
            reason: 'These components support your advanced functionality needs',
            confidence: 0.75,
            category: 'component',
          });
        }
      } else if (tier?.tier === 'basic' || tier?.tier === 'standard') {
        const basicComponents = getBasicComponents();
        if (basicComponents.length > 0) {
          newSuggestions.push({
            title: 'Recommended for Basic Features',
            items: basicComponents,
            reason: 'These components are perfect for standard functionality',
            confidence: 0.7,
            category: 'component',
          });
        }
      }
    }

    // Animation suggestions based on design style
    if (currentStep === 'animations' && debouncedSelections.selectedDesignStyle) {
      const compatibleAnimations = getCompatibleAnimations(debouncedSelections.selectedDesignStyle);
      if (compatibleAnimations.length > 0) {
        newSuggestions.push({
          title: `Animations for ${debouncedSelections.selectedDesignStyle.title}`,
          items: compatibleAnimations,
          reason: 'These animations match your design aesthetic',
          confidence: 0.7,
          category: 'animation',
        });
      }
    }

    // Background suggestions based on color theme
    if (currentStep === 'background' && debouncedSelections.selectedColorTheme) {
      const compatibleBackgrounds = getCompatibleBackgrounds(debouncedSelections.selectedColorTheme);
      if (compatibleBackgrounds.length > 0) {
        newSuggestions.push({
          title: `Backgrounds for ${debouncedSelections.selectedColorTheme.title}`,
          items: compatibleBackgrounds,
          reason: 'These backgrounds work well with your color scheme',
          confidence: 0.85,
          category: 'background',
        });
      }
    }

    setSuggestions(newSuggestions);
  }, [currentStep, debouncedSelections, enabled]);

  return suggestions;
};
