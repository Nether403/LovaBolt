---
inclusion: always
---

# AI Intelligence Features - Implementation Steering Guide

## Overview

This guide provides specific instructions for implementing AI-powered enhancements to LovaBolt. These features add intelligence without bloating the codebase, following the principle: **"AI should enhance, not replace, the user's creative control."**

## Integration with Existing Specs

This steering guide complements the existing spec at `.kiro/specs/ai-intelligence-features/` which contains:
- **requirements.md**: User stories and acceptance criteria (EARS format)
- **design.md**: Technical architecture and component specifications
- **tasks.md**: Implementation checklist with 14 main tasks

## Core Principles

### 1. Non-Intrusive Intelligence
- AI suggestions should never block the user workflow
- All AI features must have graceful fallbacks
- Users always maintain final control over selections
- Suggestions appear in collapsible panels, not modal dialogs

### 2. Performance First
- All AI operations must complete in <200ms
- Use memoization for expensive calculations
- Debounce real-time features (300-500ms)
- Never block the main thread

### 3. Transparency
- Always explain why suggestions are made
- Show confidence scores for AI decisions
- Provide "Why this?" tooltips
- Make AI reasoning visible to users

### 4. Accessibility
- All AI features must be keyboard accessible
- Use aria-live for dynamic updates
- Provide text alternatives for visual indicators
- Ensure WCAG 2.1 AA compliance

## File Structure

### New Files to Create

```
src/
├── utils/
│   ├── smartDefaults.ts          # Smart defaults mappings (~100 lines)
│   ├── promptAnalyzer.ts         # Prompt quality analysis (~200 lines)
│   ├── compatibilityChecker.ts   # Design compatibility validation (~250 lines)
│   ├── nlpParser.ts              # Natural language parsing (~300 lines)
│   └── templateEngine.ts         # Prompt template system (~150 lines)
├── hooks/
│   ├── useSmartSuggestions.ts    # Context-aware suggestions (~150 lines)
│   ├── useCompatibilityCheck.ts  # Real-time compatibility (~100 lines)
│   └── usePromptAnalysis.ts      # Prompt quality analysis (~100 lines)
├── components/
│   └── ai/
│       ├── SmartSuggestionPanel.tsx      # Suggestion display (~150 lines)
│       ├── PromptQualityScore.tsx        # Quality score UI (~100 lines)
│       ├── CompatibilityIndicator.tsx    # Harmony score UI (~80 lines)
│       └── NLPInput.tsx                  # Natural language input (~120 lines)
└── data/
    ├── aiPatterns.ts             # AI learning patterns (~200 lines)
    └── promptTemplates.ts        # Template definitions (~150 lines)
```

**Total New Code**: ~1,800 lines (minimal bloat)

## Implementation Guidelines

### Phase 1: Foundation (Tasks 1-3)

#### Task 1: Smart Defaults System

**Critical Implementation Points**:

1. **Data Structure**:
```typescript
// src/utils/smartDefaults.ts
export const SMART_DEFAULTS: SmartDefaultsConfig = {
  'Portfolio': {
    layout: 'single-column',
    designStyle: 'minimalist',
    colorTheme: 'monochrome-modern',
    functionality: ['basic-package'],
    background: 'aurora',
    animations: ['fade-in', 'slide-up'],
  },
  // ... more project types
};
```

2. **Application Logic**:
- Only apply defaults for fields that are NOT already set
- Use functional updates to avoid race conditions
- Calculate confidence based on keyword matches
- Generate human-readable reasoning

3. **UI Integration**:
- Add "Use Smart Defaults" button to ProjectSetupStep
- Show notification: "We've pre-selected options for a [type] website"
- Make notification dismissible
- Track acceptance rate for analytics

**Testing Checklist**:
- [ ] Defaults applied correctly for all project types
- [ ] Existing selections never overridden
- [ ] Confidence scores calculated accurately
- [ ] UI updates reflect applied defaults
- [ ] Performance <50ms

#### Task 2: Prompt Analyzer System

**Critical Implementation Points**:

1. **Analysis Rules**:
```typescript
// Check for critical requirements
const checks = [
  { pattern: /responsive/i, severity: 'high', message: 'Missing responsive design' },
  { pattern: /accessibility|wcag/i, severity: 'medium', message: 'No accessibility requirements' },
  { pattern: /performance|optimized/i, severity: 'medium', message: 'No performance considerations' },
];
```

2. **Scoring Algorithm**:
- Start at 100 points
- Deduct 15 points for high severity issues
- Deduct 10 points for medium severity issues
- Deduct 5 points for low severity issues
- Add up to 20 points for strengths
- Clamp result to 0-100 range

3. **Auto-Fix Implementation**:
- Only apply fixes that are 100% safe
- Never remove user content
- Add missing sections, don't modify existing ones
- Show diff before applying

**Testing Checklist**:
- [ ] All analysis rules trigger correctly
- [ ] Score calculation matches expected values
- [ ] Auto-fixes don't break prompts
- [ ] UI shows suggestions clearly
- [ ] Performance <100ms

#### Task 3: Context-Aware Suggestions

**Critical Implementation Points**:

1. **Compatibility Mappings**:
```typescript
const STYLE_COLOR_COMPAT = {
  'minimalist': ['monochrome-modern', 'professional-blue'],
  'glassmorphism': ['tech-neon', 'ocean-breeze'],
  'digital-brutalism': ['high-contrast', 'bold-primary'],
};
```

2. **Suggestion Generation**:
- Check current step and selections
- Look up compatible options from mappings
- Calculate confidence based on match quality
- Generate reasoning text
- Limit to top 4-6 suggestions

3. **UI Presentation**:
- Show in collapsible side panel
- Display confidence percentage
- Explain reasoning for each suggestion
- One-click apply buttons
- Subtle badge indicator when collapsed

**Testing Checklist**:
- [ ] Suggestions appear at correct steps
- [ ] Compatibility mappings accurate
- [ ] Confidence scores reasonable
- [ ] Apply buttons work correctly
- [ ] Performance <100ms

### Phase 2: Enhancement (Tasks 4-6)

#### Task 4: Natural Language Parser

**Critical Implementation Points**:

1. **Keyword Mappings**:
```typescript
const KEYWORDS = {
  projectTypes: {
    'Portfolio': ['portfolio', 'showcase', 'personal site'],
    'E-commerce': ['shop', 'store', 'sell', 'products'],
  },
  designStyles: {
    'minimalist': ['minimal', 'clean', 'simple'],
    'glassmorphism': ['glass', 'frosted', 'blur'],
  },
};
```

2. **Detection Algorithm**:
- Convert input to lowercase
- Count keyword matches for each category
- Calculate confidence: matches / total_keywords
- Return top match if confidence >0.5
- Show all matches if confidence <0.5

3. **User Experience**:
- Add textarea to Project Setup step
- Show detected selections with confidence bars
- Allow user to confirm or modify
- "Start with these settings" button
- Clear explanation of what was detected

**Testing Checklist**:
- [ ] Common phrases detected accurately
- [ ] Confidence scores reasonable
- [ ] Multiple interpretations handled
- [ ] User can override detections
- [ ] Performance <200ms

#### Task 5: Design Compatibility Checker

**Critical Implementation Points**:

1. **Validation Rules**:
```typescript
// Example rule
if (style === 'minimalist' && components.length > 7) {
  warnings.push({
    severity: 'medium',
    message: 'Minimalist designs work best with fewer components',
    affected: ['design-style', 'components'],
    suggestion: 'Consider reducing to 5-7 key components',
  });
}
```

2. **Scoring System**:
- Start at 100 points
- Deduct 20 points for high severity issues
- Deduct 15 points for medium severity issues
- Deduct 10 points for low severity issues
- Deduct 10 points for medium warnings
- Deduct 5 points for low warnings

3. **Harmony Levels**:
- 90-100: Excellent (green)
- 75-89: Good (teal)
- 60-74: Fair (yellow)
- 0-59: Poor (red)

**Testing Checklist**:
- [ ] All validation rules trigger correctly
- [ ] Score calculation accurate
- [ ] Auto-fix suggestions work
- [ ] UI shows issues clearly
- [ ] Performance <50ms

#### Task 6: Prompt Template System

**Critical Implementation Points**:

1. **Template Structure**:
```typescript
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  targetTool: 'bolt-new' | 'lovable-dev' | 'claude-artifacts';
  template: string; // With {{variable}} placeholders
  variables: string[];
}
```

2. **Rendering Engine**:
- Replace {{variable}} with actual values
- Handle {{#each array}} loops
- Support nested properties with dot notation
- Preserve formatting and whitespace
- Escape special characters

3. **Tool-Specific Optimizations**:
- **Bolt.new**: Structured sections with clear headers
- **Lovable.dev**: Conversational, natural language
- **Claude Artifacts**: Concise, focused on implementation

**Testing Checklist**:
- [ ] All templates render correctly
- [ ] Variables replaced accurately
- [ ] Loops work for arrays
- [ ] Formatting preserved
- [ ] Performance <50ms

### Phase 3: Polish (Tasks 7-9)

#### Task 7: Performance Optimization

**Memoization Strategy**:
```typescript
// Memoize expensive calculations
const memoizedAnalysis = useMemo(() => 
  analyzePrompt(prompt, selections),
  [prompt, selections]
);

// Debounce real-time features
const debouncedSuggestions = useDebouncedValue(suggestions, 300);
```

**Optimization Checklist**:
- [ ] Memoize all AI calculations
- [ ] Debounce real-time features
- [ ] Use React.memo for AI components
- [ ] Optimize re-renders with useCallback
- [ ] Measure performance improvements

#### Task 8: User Feedback Collection (Optional)

**Feedback Points**:
1. After smart defaults applied: "Was this helpful?"
2. After suggestions applied: "Did this improve your selection?"
3. After prompt generated: "How did it turn out?"

**Implementation**:
- Simple thumbs up/down buttons
- Optional comment field
- Store in LocalStorage
- Track acceptance rates
- Use for algorithm improvements

#### Task 9: Documentation (Optional)

**Documentation Needs**:
1. **AI Algorithms**: Document how each AI feature works
2. **User Guide**: Explain features to end users
3. **Developer Docs**: Implementation details for maintainers
4. **In-App Help**: Tooltips and contextual help

## Common Patterns

### Safe AI Execution

Always wrap AI functions in try-catch:

```typescript
export const safeAnalyzePrompt = (prompt: string, selections: any) => {
  try {
    return analyzePrompt(prompt, selections);
  } catch (error) {
    console.error('Prompt analysis failed:', error);
    return {
      score: 75, // Neutral default
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };
  }
};
```

### Debounced Hooks

Prevent excessive calculations:

```typescript
export const useDebouncedSuggestions = (
  currentStep: string,
  selections: any,
  delay: number = 300
) => {
  const [debounced, setDebounced] = useState(selections);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(selections), delay);
    return () => clearTimeout(timer);
  }, [selections, delay]);

  return useSmartSuggestions({ currentStep, selections: debounced });
};
```

### Memoized Components

Optimize re-renders:

```typescript
export const SmartSuggestionPanel = React.memo<SmartSuggestionPanelProps>(
  ({ suggestions, onApply }) => {
    // Component implementation
  }
);
```

## Integration with BoltBuilderContext

### Context Updates

Add AI state to context:

```typescript
interface BoltBuilderContextType {
  // ... existing state
  
  // AI state
  aiState: {
    smartDefaultsApplied: boolean;
    promptAnalysis: PromptAnalysisResult | null;
    compatibility: CompatibilityResult | null;
    suggestions: Suggestion[];
  };
  
  // AI actions
  applySmartDefaults: (projectType: string) => void;
  analyzeCurrentPrompt: () => void;
  checkCompatibility: () => void;
}
```

### State Updates

Use functional updates for AI state:

```typescript
const applySmartDefaults = useCallback((projectType: string) => {
  const defaults = getSmartDefaults(projectType, projectInfo.purpose);
  
  setProjectInfo(prev => ({ ...prev, ...defaults.projectInfo }));
  setSelectedLayout(defaults.layout);
  setSelectedDesignStyle(defaults.designStyle);
  // ... apply other defaults
  
  setAIState(prev => ({
    ...prev,
    smartDefaultsApplied: true,
  }));
}, [projectInfo.purpose]);
```

## Testing Strategy

### Unit Tests

Test each AI utility function:

```typescript
describe('Smart Defaults', () => {
  it('returns correct defaults for Portfolio', () => {
    const result = getSmartDefaults('Portfolio', 'Showcase work');
    expect(result.defaults.designStyle).toBe('minimalist');
    expect(result.confidence).toBeGreaterThan(0.8);
  });
});
```

### Integration Tests

Test AI features in wizard flow:

```typescript
describe('Smart Defaults Integration', () => {
  it('applies defaults when project type selected', () => {
    render(<WizardWithContext />);
    
    selectProjectType('Portfolio');
    clickButton('Use Smart Defaults');
    
    expect(getSelectedDesignStyle()).toBe('Minimalist');
  });
});
```

### Performance Tests

Ensure AI features are fast:

```typescript
describe('Performance', () => {
  it('analyzes prompt in <100ms', () => {
    const start = performance.now();
    analyzePrompt(longPrompt, complexSelections);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(100);
  });
});
```

## Error Handling

### Graceful Degradation

AI features should never break the wizard:

```typescript
export const AIErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="glass-card p-4 rounded-xl">
          <p className="text-yellow-400 text-sm">
            AI features temporarily unavailable. You can continue using the wizard normally.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};
```

### User-Friendly Messages

Show helpful error messages:

```typescript
if (error) {
  return (
    <div className="glass-card p-4 rounded-xl border border-yellow-500/20">
      <AlertCircle className="w-5 h-5 text-yellow-500 mb-2" />
      <p className="text-sm text-yellow-400">
        Unable to generate suggestions right now. Your selections are still saved.
      </p>
    </div>
  );
}
```

## Accessibility Requirements

### Keyboard Navigation

All AI features must be keyboard accessible:

```typescript
<button
  onClick={handleApply}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleApply();
    }
  }}
  aria-label="Apply smart defaults"
  className="focus:ring-2 focus:ring-teal-500"
>
  Apply Defaults
</button>
```

### Screen Reader Support

Announce AI updates:

```typescript
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {promptAnalysis && (
    <span className="sr-only">
      Prompt quality score: {promptAnalysis.score} out of 100. 
      {promptAnalysis.suggestions.length} suggestions available.
    </span>
  )}
</div>
```

### Visual Indicators

Don't rely on color alone:

```typescript
<div className="flex items-center gap-2">
  <CheckCircle className="w-4 h-4 text-green-500" />
  <span className="text-green-400">Excellent harmony</span>
  <span className="text-sm text-gray-400">(Score: 95)</span>
</div>
```

## Performance Targets

### Response Times

- **Smart Defaults**: <50ms
- **Compatibility Check**: <50ms
- **Prompt Analysis**: <100ms
- **Suggestions Generation**: <100ms
- **NLP Parsing**: <200ms
- **Template Rendering**: <50ms

### Bundle Size

- **Total AI Code**: ~1,800 lines
- **Bundle Impact**: <50KB gzipped
- **No External Dependencies**: Keep bundle lean

### Memory Usage

- Memoize expensive calculations
- Clean up event listeners
- Avoid memory leaks in effects
- Use weak references where appropriate

## Success Metrics

### Quantitative Metrics

Track these metrics to measure success:

1. **Time to Complete Wizard**: Target 40% reduction (10min → 6min)
2. **Prompt Quality Score**: Target 85+ average
3. **Smart Defaults Acceptance**: Target >60%
4. **Suggestion Application Rate**: Target >40%
5. **Completion Rate**: Target 80%+ (up from ~60%)

### Qualitative Metrics

Gather user feedback on:

1. Helpfulness of smart defaults
2. Clarity of suggestions
3. Usefulness of prompt analysis
4. Overall satisfaction with AI features

## Common Pitfalls

### ❌ Don't: Block User Workflow

```typescript
// BAD: Modal that blocks user
<Modal isOpen={analyzing}>
  <Spinner />
  <p>Analyzing your prompt...</p>
</Modal>
```

```typescript
// GOOD: Non-blocking indicator
<div className="flex items-center gap-2 text-sm text-gray-400">
  <Spinner size="sm" />
  <span>Analyzing...</span>
</div>
```

### ❌ Don't: Override User Choices

```typescript
// BAD: Force AI suggestions
useEffect(() => {
  if (suggestions.length > 0) {
    applyAllSuggestions(); // Don't do this!
  }
}, [suggestions]);
```

```typescript
// GOOD: Let user decide
<Button onClick={applyAllSuggestions}>
  Apply All Suggestions
</Button>
```

### ❌ Don't: Hide AI Reasoning

```typescript
// BAD: No explanation
<p>We recommend Minimalist design</p>
```

```typescript
// GOOD: Explain why
<p>We recommend Minimalist design</p>
<p className="text-sm text-gray-400">
  Based on your Portfolio project type and clean aesthetic preferences
</p>
```

## Completion Checklist

Before marking AI features complete:

- [ ] All 6 core features implemented (Tasks 1-6)
- [ ] Performance targets met (<200ms for all operations)
- [ ] Accessibility requirements satisfied (WCAG 2.1 AA)
- [ ] Error handling in place (graceful degradation)
- [ ] Unit tests written and passing (>85% coverage)
- [ ] Integration tests passing
- [ ] Performance tests passing
- [ ] Documentation complete
- [ ] User feedback mechanism in place
- [ ] Analytics tracking implemented
- [ ] Code reviewed and approved
- [ ] No console errors or warnings
- [ ] Bundle size impact acceptable (<50KB)
- [ ] Works without AI features (fallback)
- [ ] Tested on all supported browsers

## Support Resources

- **Spec Location**: `.kiro/specs/ai-intelligence-features/`
- **Requirements**: See `requirements.md` for user stories
- **Design**: See `design.md` for technical architecture
- **Tasks**: See `tasks.md` for implementation checklist
- **Standards**: See `lovabolt-standards.md` for code conventions

## Questions & Clarifications

If you encounter ambiguity during implementation:

1. **Check the spec first**: Requirements and design docs have detailed guidance
2. **Follow the principle**: "AI should enhance, not replace"
3. **Prioritize user control**: When in doubt, let the user decide
4. **Keep it simple**: Avoid over-engineering AI features
5. **Ask for clarification**: Better to ask than implement incorrectly

## Next Steps

1. Review this steering guide thoroughly
2. Read the complete spec in `.kiro/specs/ai-intelligence-features/`
3. Start with Phase 1, Task 1 (Smart Defaults)
4. Test each feature before moving to the next
5. Gather feedback and iterate

Remember: The goal is to make LovaBolt smarter without making it bloated. Every AI feature should add clear value and enhance the user experience.
