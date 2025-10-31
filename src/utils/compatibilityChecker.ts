import {
  DesignStyle,
  ColorTheme,
  ComponentOption,
  FunctionalityOption,
  BackgroundOption,
  AnimationOption,
} from '../types';

/**
 * Represents a compatibility issue or warning
 */
export interface CompatibilityIssue {
  severity: 'low' | 'medium' | 'high';
  message: string;
  affected: string[];
  suggestion: string;
  autoFixable: boolean;
}

/**
 * Result of compatibility check
 */
export interface CompatibilityResult {
  score: number; // 0-100
  issues: CompatibilityIssue[];
  warnings: CompatibilityIssue[];
  harmony: 'excellent' | 'good' | 'fair' | 'poor';
}

/**
 * Selections to check for compatibility
 */
export interface SelectionsToCheck {
  selectedDesignStyle?: DesignStyle | null;
  selectedColorTheme?: ColorTheme | null;
  selectedComponents?: ComponentOption[];
  selectedFunctionality?: FunctionalityOption[];
  selectedBackground?: BackgroundOption | null;
  selectedAnimations?: AnimationOption[];
}

/**
 * Main compatibility checking function
 * Validates design choices work well together
 */
export const checkCompatibility = (selections: SelectionsToCheck): CompatibilityResult => {
  const issues: CompatibilityIssue[] = [];
  const warnings: CompatibilityIssue[] = [];

  // Check design style + color theme compatibility
  if (selections.selectedDesignStyle && selections.selectedColorTheme) {
    const styleColorCompat = checkStyleColorCompatibility(
      selections.selectedDesignStyle,
      selections.selectedColorTheme
    );
    if (styleColorCompat) {
      warnings.push(styleColorCompat);
    }
  }

  // Check component count vs design style
  if (selections.selectedDesignStyle && selections.selectedComponents) {
    const componentCountCompat = checkComponentCount(
      selections.selectedDesignStyle,
      selections.selectedComponents
    );
    if (componentCountCompat) {
      warnings.push(componentCountCompat);
    }
  }

  // Check functionality vs components
  if (selections.selectedFunctionality && selections.selectedComponents) {
    const funcCompat = checkFunctionalityComponents(
      selections.selectedFunctionality,
      selections.selectedComponents
    );
    if (funcCompat) {
      issues.push(funcCompat);
    }
  }

  // Check background vs color theme
  if (selections.selectedBackground && selections.selectedColorTheme) {
    const bgColorCompat = checkBackgroundColorCompatibility(
      selections.selectedBackground,
      selections.selectedColorTheme
    );
    if (bgColorCompat) {
      warnings.push(bgColorCompat);
    }
  }

  // Check animation count
  if (selections.selectedAnimations && selections.selectedAnimations.length > 5) {
    warnings.push({
      severity: 'low',
      message: 'Many animations selected may impact performance',
      affected: ['animations'],
      suggestion: 'Consider limiting to 3-5 key animations for better performance',
      autoFixable: false,
    });
  }

  // Calculate compatibility score
  const score = calculateCompatibilityScore(issues, warnings);
  const harmony = getHarmonyLevel(score);

  return {
    score,
    issues,
    warnings,
    harmony,
  };
};

/**
 * Calculate overall compatibility score
 */
export const calculateCompatibilityScore = (
  issues: CompatibilityIssue[],
  warnings: CompatibilityIssue[]
): number => {
  let score = 100;

  // Deduct points for issues
  issues.forEach((issue) => {
    if (issue.severity === 'high') score -= 20;
    else if (issue.severity === 'medium') score -= 15;
    else score -= 10;
  });

  // Deduct points for warnings
  warnings.forEach((warning) => {
    if (warning.severity === 'medium') score -= 10;
    else score -= 5;
  });

  return Math.max(0, score);
};

/**
 * Get harmony level based on score
 */
export const getHarmonyLevel = (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'fair';
  return 'poor';
};

/**
 * Check compatibility between design style and color theme
 */
const checkStyleColorCompatibility = (
  style: DesignStyle,
  theme: ColorTheme
): CompatibilityIssue | null => {
  // Minimalist designs work best with 2-3 colors
  if (style.id === 'minimalist' && theme.colors.length > 3) {
    return {
      severity: 'medium',
      message: 'Minimalist designs typically use 2-3 colors for maximum impact',
      affected: ['design-style', 'color-theme'],
      suggestion: 'Consider a simpler color palette like Monochrome Modern or Professional Blue',
      autoFixable: true,
    };
  }

  // Brutalist designs need high contrast
  if (
    style.id === 'digital-brutalism' &&
    !theme.id.includes('contrast') &&
    !theme.id.includes('bold')
  ) {
    return {
      severity: 'low',
      message: 'Brutalist designs benefit from high contrast colors',
      affected: ['design-style', 'color-theme'],
      suggestion: 'Consider using a high-contrast or bold color theme for stronger visual impact',
      autoFixable: false,
    };
  }

  // Glassmorphism works best with vibrant or gradient themes
  if (style.id === 'glassmorphism' && theme.id.includes('monochrome')) {
    return {
      severity: 'low',
      message: 'Glassmorphism effects are more visible with colorful backgrounds',
      affected: ['design-style', 'color-theme'],
      suggestion: 'Consider a more vibrant color theme like Tech Neon or Ocean Breeze',
      autoFixable: false,
    };
  }

  return null;
};

/**
 * Check if component count matches design style
 */
const checkComponentCount = (
  style: DesignStyle,
  components: ComponentOption[]
): CompatibilityIssue | null => {
  if (style.id === 'minimalist' && components.length > 7) {
    return {
      severity: 'medium',
      message: 'Minimalist designs work best with fewer components',
      affected: ['design-style', 'components'],
      suggestion: 'Consider reducing to 5-7 key components to maintain clean aesthetic',
      autoFixable: false,
    };
  }

  if (style.id === 'digital-brutalism' && components.length < 3) {
    return {
      severity: 'low',
      message: 'Brutalist designs benefit from bold, prominent components',
      affected: ['design-style', 'components'],
      suggestion: 'Add more visual components for stronger impact',
      autoFixable: false,
    };
  }

  return null;
};

/**
 * Check if functionality requirements match selected components
 */
const checkFunctionalityComponents = (
  functionality: FunctionalityOption[],
  components: ComponentOption[]
): CompatibilityIssue | null => {
  // Check for authentication functionality
  const hasAuth = functionality.some((f) =>
    f.features?.some(
      (feature) =>
        feature.toLowerCase().includes('authentication') ||
        feature.toLowerCase().includes('login') ||
        feature.toLowerCase().includes('user management')
    )
  );

  const hasAuthComponents = components.some(
    (c) =>
      c.id.includes('login') ||
      c.id.includes('auth') ||
      c.id.includes('sign-in') ||
      c.title.toLowerCase().includes('login') ||
      c.title.toLowerCase().includes('auth')
  );

  if (hasAuth && !hasAuthComponents) {
    return {
      severity: 'high',
      message: 'Authentication functionality selected but no login components',
      affected: ['functionality', 'components'],
      suggestion: 'Add login form, authentication modal, or sign-in components',
      autoFixable: true,
    };
  }

  // Check for e-commerce functionality
  const hasEcommerce = functionality.some((f) =>
    f.features?.some(
      (feature) =>
        feature.toLowerCase().includes('shopping') ||
        feature.toLowerCase().includes('cart') ||
        feature.toLowerCase().includes('checkout') ||
        feature.toLowerCase().includes('payment')
    )
  );

  const hasEcommerceComponents = components.some(
    (c) =>
      c.id.includes('cart') ||
      c.id.includes('product') ||
      c.id.includes('checkout') ||
      c.title.toLowerCase().includes('cart') ||
      c.title.toLowerCase().includes('product')
  );

  if (hasEcommerce && !hasEcommerceComponents) {
    return {
      severity: 'high',
      message: 'E-commerce functionality selected but no shopping components',
      affected: ['functionality', 'components'],
      suggestion: 'Add shopping cart, product card, or checkout components',
      autoFixable: true,
    };
  }

  return null;
};

/**
 * Check compatibility between background and color theme
 */
const checkBackgroundColorCompatibility = (
  background: BackgroundOption,
  theme: ColorTheme
): CompatibilityIssue | null => {
  // Check if neon/vibrant backgrounds clash with monochrome themes
  if (
    (background.id.includes('neon') || background.id.includes('vibrant')) &&
    theme.id.includes('monochrome')
  ) {
    return {
      severity: 'medium',
      message: 'Vibrant backgrounds may clash with monochrome color themes',
      affected: ['background', 'color-theme'],
      suggestion: 'Consider a gradient or subtle background, or switch to a more colorful theme',
      autoFixable: false,
    };
  }

  // Check if subtle backgrounds work with bold themes
  if (
    (background.id.includes('subtle') || background.id.includes('minimal')) &&
    (theme.id.includes('neon') || theme.id.includes('vibrant'))
  ) {
    return {
      severity: 'low',
      message: 'Subtle backgrounds may not showcase vibrant color themes effectively',
      affected: ['background', 'color-theme'],
      suggestion: 'Consider a more dynamic background to complement your bold colors',
      autoFixable: false,
    };
  }

  return null;
};

/**
 * Safe wrapper for compatibility checking with error handling
 */
export const safeCheckCompatibility = (selections: SelectionsToCheck): CompatibilityResult => {
  try {
    return checkCompatibility(selections);
  } catch (error) {
    console.error('Compatibility check failed:', error);
    // Return default "good" result on error
    return {
      score: 80,
      issues: [],
      warnings: [],
      harmony: 'good',
    };
  }
};
