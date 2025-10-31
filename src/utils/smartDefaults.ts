/**
 * Smart Defaults System
 * 
 * Provides intelligent default selections based on project type and purpose.
 * Follows the principle: "AI should enhance, not replace, the user's creative control."
 * 
 * Features:
 * - Pre-configured defaults for common project types
 * - Confidence scoring for recommendations
 * - Human-readable reasoning for transparency
 * - Never overrides existing user selections
 * 
 * @module smartDefaults
 */

import { Typography } from '../types';

/**
 * Configuration for smart defaults by project type
 */
export interface SmartDefaultsConfig {
  [projectType: string]: {
    layout?: string;
    designStyle?: string;
    colorTheme?: string;
    typography?: Partial<Typography>;
    functionality?: string[];
    background?: string;
    components?: string[];
    animations?: string[];
  };
}

/**
 * Result of applying smart defaults
 */
export interface SmartDefaultsResult {
  applied: boolean;
  defaults: {
    layout?: string;
    designStyle?: string;
    colorTheme?: string;
    typography?: Partial<Typography>;
    functionality?: string[];
    background?: string;
    components?: string[];
    animations?: string[];
  };
  confidence: number;
  reasoning: string;
}

/**
 * Smart defaults mappings for each project type
 * 
 * These defaults are based on common patterns and best practices:
 * - Portfolio: Clean, minimal design to showcase work
 * - E-commerce: Grid layout with product-focused components
 * - Dashboard: Sidebar layout with data visualization components
 * - Web App: App-style layout with interactive components
 * - Mobile App: Mobile-first with touch-friendly components
 * - Website: Flexible defaults for general websites
 */
export const SMART_DEFAULTS: SmartDefaultsConfig = {
  'Portfolio': {
    layout: 'single-column',
    designStyle: 'minimalist',
    colorTheme: 'monochrome-modern',
    typography: {
      fontFamily: "'Inter', sans-serif",
      headingWeight: 'Semibold',
      bodyWeight: 'Regular',
      textAlignment: 'Left',
      headingSize: 'Large',
      bodySize: 'Medium',
      lineHeight: 'Normal',
    },
    functionality: ['basic-package'],
    background: 'aurora',
    components: ['carousel', 'bento-grid', 'animated-testimonials'],
    animations: ['fade-in', 'slide-in', 'scroll-reveal'],
  },
  'E-commerce': {
    layout: 'grid-layout',
    designStyle: 'material-design',
    colorTheme: 'tech-neon',
    typography: {
      fontFamily: "'Roboto', sans-serif",
      headingWeight: 'Bold',
      bodyWeight: 'Regular',
      textAlignment: 'Left',
      headingSize: 'Large',
      bodySize: 'Medium',
      lineHeight: 'Normal',
    },
    functionality: ['advanced-package'],
    background: 'gradient-mesh',
    components: ['carousel', 'card', 'hover-card', 'animated-modal', 'shimmer-button'],
    animations: ['hover-lift', 'scale-in', 'loading-spinner'],
  },
  'Dashboard': {
    layout: 'sidebar-layout',
    designStyle: 'modern-corporate',
    colorTheme: 'professional-blue',
    typography: {
      fontFamily: "'Inter', sans-serif",
      headingWeight: 'Semibold',
      bodyWeight: 'Regular',
      textAlignment: 'Left',
      headingSize: 'Medium',
      bodySize: 'Medium',
      lineHeight: 'Normal',
    },
    functionality: ['advanced-package'],
    background: 'subtle-grid',
    components: ['sidebar', 'tabs', 'bento-grid', 'timeline', 'animated-list'],
    animations: ['fade-in', 'stagger-children', 'skeleton-loader'],
  },
  'Web App': {
    layout: 'app-layout',
    designStyle: 'glassmorphism',
    colorTheme: 'tech-neon',
    typography: {
      fontFamily: "'Inter', sans-serif",
      headingWeight: 'Semibold',
      bodyWeight: 'Regular',
      textAlignment: 'Left',
      headingSize: 'Medium',
      bodySize: 'Medium',
      lineHeight: 'Normal',
    },
    functionality: ['advanced-package'],
    background: 'animated-gradient',
    components: ['navbar-menu', 'tabs', 'animated-modal', 'animated-tooltip', 'card'],
    animations: ['fade-in', 'slide-in', 'page-transition', 'loading-spinner'],
  },
  'Mobile App': {
    layout: 'mobile-first',
    designStyle: 'minimalist',
    colorTheme: 'vibrant-modern',
    typography: {
      fontFamily: "'Inter', sans-serif",
      headingWeight: 'Semibold',
      bodyWeight: 'Regular',
      textAlignment: 'Left',
      headingSize: 'Medium',
      bodySize: 'Medium',
      lineHeight: 'Relaxed',
    },
    functionality: ['advanced-package'],
    background: 'solid-color',
    components: ['card-stack', 'tabs', 'animated-list', 'shimmer-button'],
    animations: ['slide-in', 'bounce-in', 'swipe-gestures'],
  },
  'Website': {
    layout: 'single-column',
    designStyle: 'modern-corporate',
    colorTheme: 'professional-blue',
    typography: {
      fontFamily: "'Inter', sans-serif",
      headingWeight: 'Semibold',
      bodyWeight: 'Regular',
      textAlignment: 'Left',
      headingSize: 'Large',
      bodySize: 'Medium',
      lineHeight: 'Normal',
    },
    functionality: ['standard-package'],
    background: 'background-gradient',
    components: ['carousel', 'accordion', 'card', 'animated-testimonials'],
    animations: ['fade-in', 'scroll-reveal', 'hover-lift'],
  },
};

/**
 * Gets smart defaults for a given project type and purpose
 * 
 * @param projectType - The type of project (Portfolio, E-commerce, etc.)
 * @param _purpose - The purpose/goal of the project (optional, for future enhancements)
 * @returns SmartDefaultsResult with defaults, confidence score, and reasoning
 * 
 * @example
 * ```tsx
 * const result = getSmartDefaults('Portfolio', 'Showcase my design work');
 * console.log(result.defaults.designStyle); // 'minimalist'
 * console.log(result.confidence); // 0.85
 * console.log(result.reasoning); // 'Based on Portfolio projects...'
 * ```
 */
export const getSmartDefaults = (
  projectType: string,
  _purpose: string = ''
): SmartDefaultsResult => {
  const defaults = SMART_DEFAULTS[projectType];

  if (!defaults) {
    return {
      applied: false,
      defaults: {},
      confidence: 0,
      reasoning: `No smart defaults available for project type: ${projectType}`,
    };
  }

  // Calculate confidence based on how well-defined the project type is
  // Base confidence is 0.85 for known project types
  // Could be enhanced in the future to analyze the purpose string
  const confidence = 0.85;

  // Generate human-readable reasoning
  const reasoning = generateReasoning(projectType, defaults);

  return {
    applied: true,
    defaults,
    confidence,
    reasoning,
  };
};

/**
 * Generates human-readable reasoning for why defaults were selected
 * 
 * @param projectType - The project type
 * @param defaults - The default configuration
 * @returns A clear explanation of the recommendations
 */
const generateReasoning = (
  projectType: string,
  defaults: SmartDefaultsConfig[string]
): string => {
  const parts: string[] = [];

  if (defaults.designStyle) {
    parts.push(`${defaults.designStyle} design`);
  }

  if (defaults.colorTheme) {
    parts.push(`${defaults.colorTheme} colors`);
  }

  if (defaults.layout) {
    parts.push(`${defaults.layout} layout`);
  }

  const styleDescription = parts.join(' with ');

  return `Based on ${projectType} projects, we recommend ${styleDescription}. These selections work well together and are commonly used for this type of project.`;
};

/**
 * Applies smart defaults to current state without overriding existing selections
 * 
 * This function respects user choices - if a field is already set, it won't be changed.
 * Only applies defaults to fields that are null, undefined, or empty.
 * 
 * @param projectType - The type of project
 * @param purpose - The purpose/goal of the project
 * @param currentState - The current wizard state
 * @returns Updated state with defaults applied only to unset fields
 * 
 * @example
 * ```tsx
 * const currentState = {
 *   selectedLayout: null,
 *   selectedDesignStyle: someUserSelection, // Already set by user
 *   selectedColorTheme: null,
 * };
 * 
 * const updated = applySmartDefaults('Portfolio', 'Showcase work', currentState);
 * // updated.selectedLayout will be set to default
 * // updated.selectedDesignStyle will remain unchanged (user's choice)
 * // updated.selectedColorTheme will be set to default
 * ```
 */
export const applySmartDefaults = (
  projectType: string,
  _purpose: string,
  currentState: {
    selectedLayout?: any;
    selectedDesignStyle?: any;
    selectedColorTheme?: any;
    selectedTypography?: Typography;
    selectedFunctionality?: any[];
    selectedBackground?: any;
    selectedComponents?: any[];
    selectedAnimations?: any[];
  }
): {
  layout?: string;
  designStyle?: string;
  colorTheme?: string;
  typography?: Partial<Typography>;
  functionality?: string[];
  background?: string;
  components?: string[];
  animations?: string[];
} => {
  const { defaults } = getSmartDefaults(projectType, _purpose);
  const result: any = {};

  // Only apply defaults for fields that are not already set
  if (!currentState.selectedLayout && defaults.layout) {
    result.layout = defaults.layout;
  }

  if (!currentState.selectedDesignStyle && defaults.designStyle) {
    result.designStyle = defaults.designStyle;
  }

  if (!currentState.selectedColorTheme && defaults.colorTheme) {
    result.colorTheme = defaults.colorTheme;
  }

  if (!currentState.selectedTypography && defaults.typography) {
    result.typography = defaults.typography;
  }

  if (
    (!currentState.selectedFunctionality || currentState.selectedFunctionality.length === 0) &&
    defaults.functionality
  ) {
    result.functionality = defaults.functionality;
  }

  if (!currentState.selectedBackground && defaults.background) {
    result.background = defaults.background;
  }

  if (
    (!currentState.selectedComponents || currentState.selectedComponents.length === 0) &&
    defaults.components
  ) {
    result.components = defaults.components;
  }

  if (
    (!currentState.selectedAnimations || currentState.selectedAnimations.length === 0) &&
    defaults.animations
  ) {
    result.animations = defaults.animations;
  }

  return result;
};
