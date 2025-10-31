# AI Intelligence Features - Design Document

## Overview

This design document outlines the technical approach for implementing AI-powered enhancements to LovaBolt that make the wizard smarter and more helpful. These features guide users to better decisions, improve prompt quality, and reduce completion time by 40% while maintaining the core philosophy: "AI should enhance, not replace, the user's creative control."

All AI features are implemented using pure JavaScript/TypeScript without external AI APIs, keeping the bundle size minimal and response times under 200ms.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  LovaBolt AI Intelligence                    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Smart     │  │    Prompt    │  │  Context     │     │
│  │   Defaults   │  │   Analyzer   │  │ Suggestions  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Intelligence Engine                      │  │
│  │  (NLP Parser, Compatibility Checker, Templates)      │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                  │                  │             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Suggestion  │  │  Prompt      │  │ Compatibility│     │
│  │    Panel     │  │  Quality     │  │  Indicator   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Existing Wizard Components                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Layers

1. **Intelligence Engine**: Core AI logic (defaults, analysis, parsing, checking)
2. **UI Components**: Visual representation of AI features
3. **Integration Layer**: Hooks and context for connecting AI to wizard
4. **Data Layer**: Configuration and pattern matching rules

## Components and Interfaces

### 1. Smart Defaults System

**File**: `src/utils/smartDefaults.ts`

**Purpose**: Provide intelligent default selections based on project type

**Interface**:
```typescript
interface SmartDefaults {
  layout?: string;
  designStyle?: string;
  colorTheme?: string;
  functionality?: string[];
  background?: string;
  components?: string[];
  animations?: string[];
}

interface ProjectTypeDefaults {
  [projectType: string]: SmartDefaults;
}

export function getSmartDefaults(
  projectType: string,
  purpose?: string
): SmartDefaults;

export function applySmartDefaults(
  defaults: SmartDefaults,
  context: BoltBuilderContext
): void;
```


**Key Decisions**:
- Store defaults in centralized configuration object
- Support partial defaults (not all fields required)
- Allow purpose to refine defaults further
- Non-intrusive application (user can override)
- Show notification when defaults are applied

**Default Mappings**:
```typescript
const PROJECT_TYPE_DEFAULTS: ProjectTypeDefaults = {
  'Portfolio': {
    layout: 'single-column',
    designStyle: 'minimalist',
    colorTheme: 'monochrome-modern',
    functionality: ['basic-package'],
    background: 'aurora',
    animations: ['fade-in', 'slide-up']
  },
  'E-commerce': {
    layout: 'grid-layout',
    designStyle: 'material-design',
    colorTheme: 'tech-neon',
    functionality: ['advanced-package'],
    components: ['carousel', 'product-card', 'tabs'],
    animations: ['hover-effects', 'loading-states']
  },
  'Dashboard': {
    layout: 'sidebar-layout',
    designStyle: 'modern-clean',
    colorTheme: 'professional-blue',
    functionality: ['advanced-package'],
    components: ['data-table', 'charts', 'cards'],
    animations: ['smooth-transitions']
  },
  // ... more mappings
};
```

### 2. Prompt Analyzer

**File**: `src/utils/promptAnalyzer.ts`

**Purpose**: Analyze generated prompts and suggest improvements

**Interface**:
```typescript
interface PromptSuggestion {
  type: 'warning' | 'tip' | 'recommendation';
  message: string;
  fix?: string;
  autoFixable: boolean;
}

interface PromptAnalysisResult {
  score: number; // 0-100
  suggestions: PromptSuggestion[];
  optimizedPrompt?: string;
}

export function analyzePrompt(
  prompt: string,
  selections: BoltBuilderState
): PromptAnalysisResult;

export function calculateScore(
  suggestions: PromptSuggestion[]
): number;

export function applyAutoFixes(
  prompt: string,
  suggestions: PromptSuggestion[]
): string;
```

**Analysis Rules**:
1. Check for responsive design mention
2. Check for accessibility considerations
3. Validate design style consistency
4. Check component count vs design style
5. Verify technical requirements present
6. Check for missing critical sections

**Scoring Algorithm**:
```typescript
function calculateScore(suggestions: PromptSuggestion[]): number {
  const baseScore = 100;
  const warningPenalty = 10;
  const tipPenalty = 5;
  const recommendationPenalty = 3;
  
  let score = baseScore;
  suggestions.forEach(s => {
    if (s.type === 'warning') score -= warningPenalty;
    if (s.type === 'tip') score -= tipPenalty;
    if (s.type === 'recommendation') score -= recommendationPenalty;
  });
  
  return Math.max(0, Math.min(100, score));
}
```

### 3. Context-Aware Suggestions

**File**: `src/hooks/useSmartSuggestions.ts`

**Purpose**: Provide relevant suggestions based on current selections

**Interface**:
```typescript
interface Suggestion {
  title: string;
  items: any[];
  reason: string;
  confidence: number; // 0-1
}

export function useSmartSuggestions(
  currentStep: string,
  selections: BoltBuilderState
): Suggestion[];
```


**Suggestion Rules**:
```typescript
const SUGGESTION_RULES = {
  'color-theme': {
    condition: (state) => state.designStyle !== null,
    generator: (state) => getCompatibleThemes(state.designStyle),
    reason: 'These color themes complement your design style'
  },
  'components': {
    condition: (state) => state.functionality?.some(f => f.tier === 'advanced'),
    generator: (state) => ['data-table', 'advanced-forms', 'charts'],
    reason: 'These components support your advanced functionality needs'
  },
  'animations': {
    condition: (state) => state.designStyle?.id === 'minimalist',
    generator: (state) => ['fade-in', 'slide-up'],
    reason: 'Subtle animations work best with minimalist designs'
  }
};
```

**Key Decisions**:
- Calculate suggestions on selection change
- Debounce calculation (100ms) for performance
- Show confidence level for each suggestion
- Allow one-click application
- Explain reasoning for transparency

### 4. Natural Language Parser

**File**: `src/utils/nlpParser.ts`

**Purpose**: Parse plain English project descriptions

**Interface**:
```typescript
interface ParsedProject {
  type?: string;
  style?: string;
  colors?: string[];
  features?: string[];
  confidence: number;
}

interface KeywordMapping {
  [category: string]: {
    [value: string]: string[];
  };
}

export function parseProjectDescription(
  description: string
): ParsedProject;

export function detectKeywords(
  text: string,
  keywords: KeywordMapping
): string[];
```

**Keyword Mappings**:
```typescript
const KEYWORD_MAPPINGS: KeywordMapping = {
  projectTypes: {
    'Portfolio': ['portfolio', 'showcase', 'personal site', 'resume'],
    'E-commerce': ['shop', 'store', 'sell', 'products', 'ecommerce', 'cart'],
    'Dashboard': ['dashboard', 'admin', 'analytics', 'metrics', 'data'],
    'Website': ['website', 'landing', 'marketing', 'corporate'],
    'Web App': ['app', 'application', 'platform', 'tool', 'saas'],
    'Mobile App': ['mobile', 'ios', 'android', 'native']
  },
  designStyles: {
    'minimalist': ['minimal', 'clean', 'simple', 'modern', 'sleek'],
    'glassmorphism': ['glass', 'frosted', 'blur', 'translucent'],
    'neumorphism': ['soft', 'subtle', 'shadow', 'neumorphic'],
    'brutalism': ['bold', 'raw', 'brutalist', 'stark'],
    'gradient': ['gradient', 'colorful', 'vibrant', 'dynamic']
  },
  colors: {
    'ocean-breeze': ['blue', 'ocean', 'sea', 'water', 'calm', 'aqua'],
    'sunset-warmth': ['orange', 'warm', 'sunset', 'vibrant', 'red'],
    'forest-green': ['green', 'nature', 'forest', 'eco', 'organic'],
    'monochrome': ['black', 'white', 'gray', 'monochrome', 'neutral']
  }
};
```

**Parsing Algorithm**:
1. Normalize text (lowercase, remove punctuation)
2. Tokenize into words
3. Match tokens against keyword mappings
4. Calculate confidence based on match count
5. Return top matches with confidence scores

### 5. Compatibility Checker

**File**: `src/utils/compatibilityChecker.ts`

**Purpose**: Validate design choices work well together

**Interface**:
```typescript
interface CompatibilityIssue {
  severity: 'high' | 'medium' | 'low';
  message: string;
  affected: string[];
  suggestion: string;
  autoFixable: boolean;
}

interface CompatibilityResult {
  score: number; // 0-100
  issues: CompatibilityIssue[];
  warnings: CompatibilityIssue[];
}

export function checkCompatibility(
  selections: BoltBuilderState
): CompatibilityResult;

export function calculateCompatibilityScore(
  issues: CompatibilityIssue[],
  warnings: CompatibilityIssue[]
): number;
```
