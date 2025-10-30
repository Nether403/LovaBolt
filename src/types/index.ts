export interface ProjectInfo {
  name: string;
  description: string;
  type: 'Website' | 'Web App' | 'Mobile App' | 'Dashboard' | 'E-commerce' | 'Portfolio';
  purpose: string;
  targetAudience?: string;
  goals?: string;
}

export interface LayoutOption {
  id: string;
  title: string;
  description: string;
  previewUrl?: string;
  category?: 'column' | 'special';
}

export interface DesignStyle {
  id: string;
  title: string;
  description: string;
  previewUrl?: string;
}

export interface ColorTheme {
  id: string;
  title: string;
  description: string;
  colors: string[];
  distribution: number[];
  isCustom?: boolean;
  darkMode?: 'light' | 'dark' | 'system';
}

export interface Typography {
  fontFamily: string;
  headingWeight: string;
  bodyWeight: string;
  textAlignment: string;
  headingSize: string;
  bodySize: string;
  lineHeight: string;
}

export interface FunctionalityOption {
  id: string;
  title: string;
  description: string;
  category: 'functionality' | 'technical';
  tier?: 'basic' | 'standard' | 'advanced' | 'enterprise';
  features: string[];
}

export interface VisualElement {
  id: string;
  type: string;
  style: string;
}

export type AnimationType = string;

export interface Font {
  id: string;
  name: string;
  family: string;
  style: string;
  weights: string[];
}

// React-Bits Component Interfaces
export interface ReactBitsComponent {
  id: string;                    // Unique identifier (e.g., 'aurora', 'carousel')
  name: string;                  // Component name for imports (e.g., 'Aurora', 'Carousel')
  title: string;                 // Display title (e.g., 'Aurora Background')
  description: string;           // User-facing description
  category: 'animations' | 'components' | 'backgrounds';
  dependencies: string[];        // NPM dependencies (e.g., ['ogl', 'motion'])
  cliCommand: string;           // Full npx shadcn command
  codeSnippet?: string;         // Optional usage example
  hasCustomization?: boolean;   // Whether component accepts props
  previewUrl?: string;          // Optional preview image URL
  tags?: string[];              // For future search/filter functionality
}

export interface BackgroundOption extends ReactBitsComponent {
  category: 'backgrounds';
}

export interface BackgroundSelection {
  type: 'solid' | 'gradient' | 'pattern' | 'react-bits';
  solidColor?: string;
  gradientColors?: string[];
  gradientDirection?: string;
  pattern?: string;
  reactBitsComponent?: BackgroundOption;
}

export interface ComponentOption extends ReactBitsComponent {
  category: 'components';
}

export interface AnimationOption extends ReactBitsComponent {
  category: 'animations';
}