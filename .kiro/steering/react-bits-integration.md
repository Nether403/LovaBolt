---
inclusion: always
---

# React-Bits Integration Steering Guide

## Integration Overview

This guide provides specific instructions for implementing the react-bits component library integration into LovaBolt. The integration adds 93 pre-built React components across three categories: backgrounds (31), UI components (37), and animations (25).

## Spec Reference

**Location**: `.kiro/specs/react-bits-integration/`

- **requirements.md**: User stories and acceptance criteria
- **design.md**: Technical architecture and component specifications
- **tasks.md**: Implementation checklist

Always reference these documents when implementing tasks.

## React-Bits Component Structure

### Data Format

Every react-bits component must follow this exact structure:

```typescript
{
  id: string;              // Unique identifier (kebab-case, e.g., 'aurora', 'blob-cursor')
  name: string;            // Component name for imports (PascalCase, e.g., 'Aurora', 'BlobCursor')
  title: string;           // Display title (e.g., 'Aurora Background', 'Blob Cursor')
  description: string;     // User-facing description (1-2 sentences, clear and concise)
  category: 'backgrounds' | 'components' | 'animations';
  dependencies: string[];  // NPM packages (e.g., ['ogl'], ['motion', 'gsap'])
  cliCommand: string;      // Full npx shadcn command with registry URL
  codeSnippet?: string;    // Optional usage example (multiline string)
  hasCustomization?: boolean; // Whether component accepts props
}
```

### CLI Command Format

All CLI commands must follow this exact format:

```typescript
cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ComponentName-TS-TW.json"'
```

**Important**: 
- Always use double quotes around the URL
- Use exact component name from react-bits registry
- Include `-TS-TW` suffix (TypeScript + Tailwind)

## Implementation Guidelines

### Phase 1: Foundation (Tasks 1-3)

**Critical First Steps:**

1. **Type Definitions** (Task 1)
   - Add interfaces to `src/types/index.ts`
   - Ensure proper inheritance (BackgroundOption extends ReactBitsComponent)
   - Export all new types

2. **Data Creation** (Task 1)
   - Create `src/data/reactBitsData.ts`
   - Start with 5-10 components for testing
   - Validate data structure before adding all 93
   - Use this template:

```typescript
export const backgroundOptions: BackgroundOption[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    title: 'Aurora',
    description: 'Flowing aurora gradient background with smooth color transitions.',
    category: 'backgrounds',
    dependencies: ['ogl'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Aurora-TS-TW.json"',
    hasCustomization: false,
  },
  // Add more...
];
```

3. **Reusable Components** (Tasks 2.1-2.2)
   - Build ReactBitsCard first (used by all steps)
   - Build ReactBitsModal second (used by all steps)
   - Test these components in isolation before integrating

### Phase 2: Context Integration (Task 3)

**Context Update Checklist:**

- [ ] Add `selectedBackground` state
- [ ] Add `selectedComponents` state
- [ ] Update `selectedAnimations` type
- [ ] Add setter functions to context interface
- [ ] Update `totalSteps` to 10
- [ ] Update progress calculation
- [ ] Update `saveProject` function
- [ ] Update `loadProject` function
- [ ] Update `clearProject` function
- [ ] Test context in isolation

**Testing Context:**
```typescript
// Verify state updates work
setSelectedBackground(backgroundOptions[0]);
console.log(selectedBackground); // Should show selected background

// Verify array operations work
setSelectedComponents([componentOptions[0], componentOptions[1]]);
console.log(selectedComponents.length); // Should be 2
```

### Phase 3: Step Components (Tasks 4-6)

**Component Implementation Order:**

1. **BackgroundStep** (Task 4) - Simplest (single selection)
2. **ComponentsStep** (Task 5) - More complex (multiple selection)
3. **AnimationsStep** (Task 6) - Update existing component

**Step Component Template:**

```typescript
import React, { useState } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { backgroundOptions } from '../../data/reactBitsData';
import { BackgroundOption } from '../../types';
import { Button } from '../ui/button';
import { ReactBitsCard } from '../cards/ReactBitsCard';
import { ReactBitsModal } from '../modals/ReactBitsModal';

const BackgroundStep: React.FC = () => {
  const { selectedBackground, setSelectedBackground, setCurrentStep } = useBoltBuilder();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    option: BackgroundOption | null;
  }>({
    isOpen: false,
    option: null,
  });

  const handleSelect = (option: BackgroundOption) => {
    setSelectedBackground(option);
  };

  const handleViewDetails = (e: React.MouseEvent, option: BackgroundOption) => {
    e.stopPropagation();
    setModalState({ isOpen: true, option });
  };

  const handleContinue = () => {
    setCurrentStep('components');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Background Effects</h2>
        <p className="text-gray-300">
          Choose a background effect to enhance your project's visual appeal.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backgroundOptions.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedBackground?.id === option.id}
            onSelect={() => handleSelect(option)}
            onViewDetails={(e) => handleViewDetails(e, option)}
          />
        ))}
      </div>

      {/* CLI Command Display */}
      {selectedBackground && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">
            Installation Command
          </h3>
          <code className="text-sm text-teal-400 break-all">
            {selectedBackground.cliCommand}
          </code>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep('visuals')} variant="outline">
          Back to Visuals
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Continue to Components
        </Button>
      </div>

      {/* Modal */}
      <ReactBitsModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, option: null })}
        option={modalState.option}
      />
    </div>
  );
};

export default BackgroundStep;
```

### Phase 4: Navigation (Tasks 7-8)

**Sidebar Update:**

```typescript
const steps = [
  { id: 'project-setup', label: 'Project Setup', number: 1 },
  { id: 'layout', label: 'Layout', number: 2 },
  { id: 'design-style', label: 'Design Style', number: 3 },
  { id: 'color-theme', label: 'Color Theme', number: 4 },
  { id: 'typography', label: 'Typography', number: 5 },
  { id: 'visuals', label: 'Visuals', number: 6 },
  { id: 'background', label: 'Background', number: 7 },      // NEW
  { id: 'components', label: 'Components', number: 8 },      // NEW
  { id: 'functionality', label: 'Functionality', number: 9 }, // UPDATED
  { id: 'animations', label: 'Animations', number: 10 },     // UPDATED
  { id: 'preview', label: 'Preview', number: 11 },           // UPDATED
];
```

**Navigation Flow:**

```
Visuals → Background → Components → Functionality → Animations → Preview
```

Update each step's continue/back buttons to match this flow.

### Phase 5: Prompt Generation (Task 9)

**Prompt Structure:**

The generated prompt must include these new sections:

```markdown
## 7. Background Effect
- **Selected Background:** [title or "None"]
- **Description:** [description]
- **Dependencies:** [dependencies]
- **Installation:** `[cliCommand]`

## 8. UI Components
**Selected Components ([count]):**

### [Component Title]
- **Description:** [description]
- **Dependencies:** [dependencies]
- **Installation:** `[cliCommand]`
- **Usage:**
```tsx
[codeSnippet if available]
```

## 9. UI/UX Animations
**Selected Animations ([count]):**

### [Animation Title]
- **Description:** [description]
- **Dependencies:** [dependencies]
- **Installation:** `[cliCommand]`

## 12. React-Bits Installation

**Step 1: Install Dependencies**
```bash
npm install [unique dependencies list]
```

**Step 2: Install React-Bits Components**
```bash
[all CLI commands]
```
```

**Implementation:**

```typescript
const generatePrompt = (): string => {
  // ... existing sections 1-6

  // Section 7: Background
  const backgroundSection = selectedBackground
    ? `## 7. Background Effect
- **Selected Background:** ${selectedBackground.title}
- **Description:** ${selectedBackground.description}
- **Dependencies:** ${selectedBackground.dependencies.join(', ')}
- **Installation:** \`${selectedBackground.cliCommand}\`
`
    : `## 7. Background Effect
- **Selected Background:** None
`;

  // Section 8: UI Components
  const componentsSection = selectedComponents.length > 0
    ? `## 8. UI Components
**Selected Components (${selectedComponents.length}):**

${selectedComponents.map(comp => `
### ${comp.title}
- **Description:** ${comp.description}
- **Dependencies:** ${comp.dependencies.join(', ')}
- **Installation:** \`${comp.cliCommand}\`
${comp.codeSnippet ? `- **Usage:**
\`\`\`tsx
${comp.codeSnippet}
\`\`\`
` : ''}`).join('\n')}
`
    : `## 8. UI Components
- No additional UI components selected
`;

  // Section 9: Animations
  const animationsSection = selectedAnimations.length > 0
    ? `## 9. UI/UX Animations
**Selected Animations (${selectedAnimations.length}):**

${selectedAnimations.map(anim => `
### ${anim.title}
- **Description:** ${anim.description}
- **Dependencies:** ${anim.dependencies.join(', ')}
- **Installation:** \`${anim.cliCommand}\`
`).join('\n')}
`
    : `## 9. UI/UX Animations
- Standard animations and transitions
`;

  // ... existing sections continue with updated numbering

  // Section 12: Installation
  const allDependencies = [
    ...new Set([
      ...(selectedBackground?.dependencies || []),
      ...selectedComponents.flatMap(c => c.dependencies),
      ...selectedAnimations.flatMap(a => a.dependencies),
    ])
  ];

  const allCliCommands = [
    selectedBackground?.cliCommand,
    ...selectedComponents.map(c => c.cliCommand),
    ...selectedAnimations.map(a => a.cliCommand),
  ].filter(Boolean);

  const installationSection = allCliCommands.length > 0
    ? `## 12. React-Bits Installation

**Step 1: Install Dependencies**
\`\`\`bash
npm install ${allDependencies.join(' ')}
\`\`\`

**Step 2: Install React-Bits Components**
\`\`\`bash
${allCliCommands.join('\n')}
\`\`\`

**Step 3: Import and Use**
Refer to the component-specific usage examples above for implementation details.
`
    : '';

  return `${existingSections}
${backgroundSection}
${componentsSection}
${animationsSection}
${existingSections2}
${installationSection}`.trim();
};
```

## Testing Strategy

### Unit Testing

**Test Context Updates:**
```typescript
describe('BoltBuilderContext', () => {
  it('should update selectedBackground', () => {
    const { result } = renderHook(() => useBoltBuilder());
    act(() => {
      result.current.setSelectedBackground(backgroundOptions[0]);
    });
    expect(result.current.selectedBackground).toEqual(backgroundOptions[0]);
  });

  it('should toggle component selection', () => {
    const { result } = renderHook(() => useBoltBuilder());
    act(() => {
      result.current.setSelectedComponents([componentOptions[0]]);
    });
    expect(result.current.selectedComponents).toHaveLength(1);
  });
});
```

**Test Step Components:**
```typescript
describe('BackgroundStep', () => {
  it('should render all background options', () => {
    render(<BackgroundStep />);
    expect(screen.getAllByRole('button')).toHaveLength(backgroundOptions.length);
  });

  it('should select background on click', () => {
    render(<BackgroundStep />);
    fireEvent.click(screen.getByText('Aurora'));
    expect(screen.getByText(/Installation Command/i)).toBeInTheDocument();
  });
});
```

### E2E Testing with Playwright

**Test Complete Flow:**
```typescript
test('complete react-bits integration flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Navigate to background step
  await page.click('text=Background');
  
  // Select a background
  await page.click('text=Aurora');
  await expect(page.locator('text=Installation Command')).toBeVisible();
  
  // Continue to components
  await page.click('text=Continue to Components');
  
  // Select multiple components
  await page.click('text=Carousel');
  await page.click('text=Accordion');
  await expect(page.locator('text=2 selected')).toBeVisible();
  
  // Continue to preview
  await page.click('text=Continue to Functionality');
  await page.click('text=Continue to Animations');
  await page.click('text=Continue to Preview');
  
  // Verify prompt includes react-bits
  await expect(page.locator('text=React-Bits Installation')).toBeVisible();
});
```

## Common Pitfalls and Solutions

### Pitfall 1: Type Mismatches

**Problem**: AnimationOption[] vs string[]

**Solution**: Update all references to selectedAnimations to use AnimationOption type:
```typescript
// Before
const [selectedAnimations, setSelectedAnimations] = useState<string[]>([]);

// After
const [selectedAnimations, setSelectedAnimations] = useState<AnimationOption[]>([]);
```

### Pitfall 2: Selection State Not Persisting

**Problem**: Selections lost on navigation

**Solution**: Ensure context is properly updated and saved:
```typescript
// Always use functional updates for arrays
setSelectedComponents((prev) => [...prev, newComponent]);

// Verify saveProject includes new state
const projectData = {
  // ... existing
  selectedBackground,
  selectedComponents,
  selectedAnimations,
};
```

### Pitfall 3: Modal Not Closing

**Problem**: Modal stays open after selection

**Solution**: Ensure modal state is properly managed:
```typescript
const handleSelect = (option: BackgroundOption) => {
  setSelectedBackground(option);
  // Don't close modal here - let user close it manually
};

const handleViewDetails = (e: React.MouseEvent, option: BackgroundOption) => {
  e.stopPropagation(); // Prevent card selection
  setModalState({ isOpen: true, option });
};
```

### Pitfall 4: CLI Commands Not Displaying

**Problem**: CLI commands section not showing

**Solution**: Check conditional rendering:
```typescript
{selectedComponents.length > 0 && (
  <div className="glass-card p-6 rounded-xl">
    {/* CLI commands */}
  </div>
)}
```

### Pitfall 5: Navigation Flow Broken

**Problem**: Steps navigate to wrong places

**Solution**: Update all navigation handlers:
```typescript
// VisualsStep
const handleContinue = () => setCurrentStep('background'); // Not 'functionality'

// BackgroundStep
const handleContinue = () => setCurrentStep('components');
const handleBack = () => setCurrentStep('visuals');

// ComponentsStep
const handleContinue = () => setCurrentStep('functionality');
const handleBack = () => setCurrentStep('background');
```

## Performance Optimization

### Memoization Strategy

```typescript
// Memoize card component
export const ReactBitsCard = React.memo<ReactBitsCardProps>(({ ... }) => {
  // implementation
});

// Memoize selection handlers
const handleSelect = React.useCallback((option: BackgroundOption) => {
  setSelectedBackground(option);
}, [setSelectedBackground]);

// Memoize filtered/sorted data
const sortedOptions = React.useMemo(() => {
  return backgroundOptions.sort((a, b) => a.title.localeCompare(b.title));
}, []);
```

### Debouncing LocalStorage

```typescript
React.useEffect(() => {
  const timer = setTimeout(() => {
    saveProject();
  }, 1000); // 1 second debounce

  return () => clearTimeout(timer);
}, [saveProject]);
```

## Accessibility Checklist

- [ ] All cards are keyboard navigable (Tab key)
- [ ] Selection state announced to screen readers
- [ ] Modal closable with Escape key
- [ ] Focus trapped in modal when open
- [ ] Proper ARIA labels on interactive elements
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus indicators visible on all elements

## MCP Server Usage

### Playwright MCP for Testing

```typescript
// Navigate and test
mcp_playwright_navigate({ url: "http://localhost:5173" });
mcp_playwright_click({ selector: "[data-step='background']" });
mcp_playwright_screenshot({ name: "background-step" });
```

### Fetch MCP for Validation

```typescript
// Validate react-bits registry URLs
mcp_fetch_fetch({ 
  url: "https://reactbits.dev/registry/Aurora-TS-TW.json" 
});
```

### Context7 MCP for Documentation

```typescript
// Get React best practices
mcp_context7_get_library_docs({
  context7CompatibleLibraryID: "/facebook/react",
  topic: "hooks"
});
```

## Completion Checklist

Before marking the integration complete, verify:

- [ ] All 93 components added to reactBitsData.ts
- [ ] All three step components working correctly
- [ ] Context properly manages all state
- [ ] Navigation flow works forward and backward
- [ ] Prompt generation includes all sections
- [ ] LocalStorage saves and loads correctly
- [ ] Error boundaries in place
- [ ] Accessibility features implemented
- [ ] Performance optimizations applied
- [ ] Tests passing (unit, integration, E2E)
- [ ] Documentation complete
- [ ] Code reviewed and formatted

## Support Resources

- **React-Bits Documentation**: https://reactbits.dev
- **Shadcn CLI**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **React Documentation**: https://react.dev
