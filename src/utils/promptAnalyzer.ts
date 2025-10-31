/**
 * Prompt Analyzer - AI-powered prompt quality analysis
 * 
 * Analyzes generated prompts for completeness, quality, and best practices.
 * Provides suggestions for improvement and can auto-fix common issues.
 */

import type { ProjectInfo, DesignStyle, ColorTheme, ComponentOption, AnimationOption } from '../types';

export interface PromptSuggestion {
  type: 'warning' | 'tip' | 'recommendation';
  message: string;
  fix?: string;
  autoFixable: boolean;
  severity: 'low' | 'medium' | 'high';
}

export interface PromptAnalysisResult {
  score: number; // 0-100
  suggestions: PromptSuggestion[];
  optimizedPrompt?: string;
  strengths: string[];
  weaknesses: string[];
}

export interface PromptAnalysisInput {
  prompt: string;
  projectInfo?: ProjectInfo;
  selectedDesignStyle?: DesignStyle;
  selectedColorTheme?: ColorTheme;
  selectedComponents?: ComponentOption[];
  selectedAnimations?: AnimationOption[];
}

/**
 * Analyzes a prompt for quality and completeness
 * 
 * @param input - The prompt and related selections to analyze
 * @returns Analysis result with score, suggestions, and strengths/weaknesses
 */
export const analyzePrompt = (input: PromptAnalysisInput): PromptAnalysisResult => {
  const { prompt, projectInfo, selectedDesignStyle, selectedComponents } = input;
  const suggestions: PromptSuggestion[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const lowerPrompt = prompt.toLowerCase();

  // Check for responsive design
  if (!lowerPrompt.includes('responsive') && !lowerPrompt.includes('mobile')) {
    suggestions.push({
      type: 'warning',
      message: 'Consider adding responsive design requirements',
      fix: 'Add "Mobile-first responsive design" to technical requirements',
      autoFixable: true,
      severity: 'high',
    });
    weaknesses.push('Missing responsive design specification');
  } else {
    strengths.push('Includes responsive design requirements');
  }

  // Check for accessibility
  if (!lowerPrompt.includes('accessibility') && !lowerPrompt.includes('wcag') && !lowerPrompt.includes('aria')) {
    suggestions.push({
      type: 'recommendation',
      message: 'Accessibility features not specified',
      fix: 'Add WCAG 2.1 AA compliance for better user experience',
      autoFixable: true,
      severity: 'medium',
    });
    weaknesses.push('No accessibility requirements');
  } else {
    strengths.push('Includes accessibility considerations');
  }

  // Check for conflicting styles
  if (selectedDesignStyle?.id === 'minimalist' && (selectedComponents?.length || 0) > 10) {
    suggestions.push({
      type: 'tip',
      message: 'Minimalist designs work best with fewer components',
      fix: 'Consider reducing to 5-7 key components',
      autoFixable: false,
      severity: 'low',
    });
    weaknesses.push('Component count may conflict with minimalist style');
  }

  // Check for performance considerations
  if (!lowerPrompt.includes('performance') && !lowerPrompt.includes('optimized') && !lowerPrompt.includes('fast')) {
    suggestions.push({
      type: 'tip',
      message: 'Consider adding performance requirements',
      fix: 'Add "Optimized loading and smooth interactions" to technical requirements',
      autoFixable: true,
      severity: 'medium',
    });
  } else {
    strengths.push('Includes performance considerations');
  }

  // Check for SEO (for websites)
  if (projectInfo?.type === 'Website' && !lowerPrompt.includes('seo') && !lowerPrompt.includes('search engine')) {
    suggestions.push({
      type: 'recommendation',
      message: 'SEO not mentioned for website project',
      fix: 'Add "SEO: Semantic HTML structure and meta tags"',
      autoFixable: true,
      severity: 'medium',
    });
  } else if (lowerPrompt.includes('seo')) {
    strengths.push('Includes SEO considerations');
  }

  // Check for security (for web apps with auth)
  if (lowerPrompt.includes('authentication') && !lowerPrompt.includes('security') && !lowerPrompt.includes('secure')) {
    suggestions.push({
      type: 'warning',
      message: 'Authentication mentioned but security not addressed',
      fix: 'Add "Security: Secure authentication and data protection"',
      autoFixable: true,
      severity: 'high',
    });
    weaknesses.push('Security considerations missing for authentication');
  } else if (lowerPrompt.includes('security')) {
    strengths.push('Includes security considerations');
  }

  // Check for error handling
  if (!lowerPrompt.includes('error') && !lowerPrompt.includes('validation')) {
    suggestions.push({
      type: 'tip',
      message: 'Error handling and validation not specified',
      fix: 'Add "Error Handling: User-friendly error messages and input validation"',
      autoFixable: true,
      severity: 'low',
    });
  } else {
    strengths.push('Includes error handling');
  }

  // Check for testing
  if (!lowerPrompt.includes('test') && !lowerPrompt.includes('quality')) {
    suggestions.push({
      type: 'tip',
      message: 'Testing strategy not mentioned',
      fix: 'Add "Testing: Unit tests for critical functionality"',
      autoFixable: true,
      severity: 'low',
    });
  } else {
    strengths.push('Includes testing considerations');
  }

  // Calculate score
  const score = calculatePromptScore(strengths, weaknesses, suggestions);

  // Generate optimized prompt if auto-fixes available
  const optimizedPrompt = applyAutoFixes(prompt, suggestions);

  return {
    score,
    suggestions,
    optimizedPrompt: optimizedPrompt !== prompt ? optimizedPrompt : undefined,
    strengths,
    weaknesses,
  };
};

/**
 * Calculates a quality score based on strengths, weaknesses, and suggestions
 * 
 * @param strengths - List of identified strengths
 * @param weaknesses - List of identified weaknesses
 * @param suggestions - List of suggestions for improvement
 * @returns Score from 0-100
 */
export const calculatePromptScore = (
  strengths: string[],
  weaknesses: string[],
  suggestions: PromptSuggestion[]
): number => {
  let score = 100;

  // Deduct points for weaknesses
  score -= weaknesses.length * 5;

  // Deduct points for suggestions by severity
  suggestions.forEach(suggestion => {
    if (suggestion.severity === 'high') score -= 15;
    else if (suggestion.severity === 'medium') score -= 10;
    else score -= 5;
  });

  // Add points for strengths (capped at 20 bonus points)
  score += Math.min(strengths.length * 3, 20);

  // Clamp to 0-100 range
  return Math.max(0, Math.min(100, score));
};

/**
 * Applies auto-fixable improvements to a prompt
 * 
 * @param prompt - The original prompt text
 * @param suggestions - List of suggestions (only auto-fixable ones will be applied)
 * @returns Improved prompt text
 */
export const applyAutoFixes = (
  prompt: string,
  suggestions: PromptSuggestion[]
): string => {
  let optimized = prompt;

  // Find the technical implementation section
  const technicalSectionRegex = /## \d+\. Technical Implementation/i;
  const hasTechnicalSection = technicalSectionRegex.test(optimized);

  // Collect all auto-fixable suggestions
  const autoFixableSuggestions = suggestions.filter(s => s.autoFixable && s.fix);

  if (autoFixableSuggestions.length === 0) {
    return optimized;
  }

  // If there's a technical section, add fixes there
  if (hasTechnicalSection) {
    const fixes = autoFixableSuggestions.map(s => `- **${s.fix?.split(':')[0]}:** ${s.fix?.split(':')[1]?.trim() || s.fix}`);
    
    optimized = optimized.replace(
      technicalSectionRegex,
      (match) => `${match}\n${fixes.join('\n')}`
    );
  } else {
    // Add a new technical requirements section at the end
    const fixes = autoFixableSuggestions.map(s => `- **${s.fix?.split(':')[0]}:** ${s.fix?.split(':')[1]?.trim() || s.fix}`);
    
    optimized += `\n\n## Technical Requirements\n${fixes.join('\n')}`;
  }

  return optimized;
};

/**
 * Safe wrapper for analyzePrompt that handles errors gracefully
 * 
 * @param input - The prompt and related selections to analyze
 * @returns Analysis result or default neutral result on error
 */
export const safeAnalyzePrompt = (input: PromptAnalysisInput): PromptAnalysisResult => {
  try {
    return analyzePrompt(input);
  } catch (error) {
    console.error('Prompt analysis failed:', error);
    return {
      score: 75, // Neutral default score
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };
  }
};
