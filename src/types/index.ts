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