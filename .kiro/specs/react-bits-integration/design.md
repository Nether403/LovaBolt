# Design Document

## Overview

This design document outlines the technical architecture for integrating react-bits components into the LovaBolt wizard application. The integration adds 93 pre-built React components across three categories (backgrounds, components, animations) through two new wizard steps and one enhanced step. The design emphasizes type safety, reusability, performance optimization, and seamless integration with the existing wizard architecture.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     LovaBolt Application                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────────────────────┐    │
│  │   Sidebar    │      │     Step Components          │    │
│  │  Navigation  │◄────►│  - BackgroundStep (NEW)      │    │
│  │              │      │  - ComponentsStep (NEW)      │    │
│  │  Steps 1-11  │      │  - AnimationsStep (ENHANCED) │    │
│  └──────────────┘      │  - Existing Steps            │    │
│                        └──────────────────────────────┘    │
│         │                          │                         │
│         │                          │                         │
│         ▼                          ▼                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         BoltBuilderContext (State Management)        │   │
│  │  - selectedBackground: BackgroundOption | null       │   │
│  │  - selectedComponents: ComponentOption[]            │   │
│  │  - selectedAnimations: AnimationOption[]            │   │
│  │  - generatePrompt(): string                          │   │
│  │  - saveProject() / loadProject()                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React-Bits Data Layer                   │   │
│  │  - backgroundOptions: BackgroundOption[] (31)        │   │
│  │  - componentOptions: ComponentOption[] (37)          │   │
│  │  - animationOptions: AnimationOption[] (25)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Reusable UI Components                     │   │
│  │  - ReactBitsCard (shared card component)            │   │
│  │  - ReactBitsModal (shared modal component)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Interaction → Step Component → Context Update → State Persistence
                                          ↓
                                   Prompt Generation
                                          ↓
                                   Preview Display
```

## Components and Interfaces

### 1. Type Definitions (src/types/index.ts)

#### ReactBitsComponent Interface

```typescript
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
```

#### Specialized Interfaces

```typescript
export interface BackgroundOption extends ReactBitsComponent {
  category: 'backgrounds';
}

export interface ComponentOption extends ReactBitsComponent {
  category: 'components';
}

export interface AnimationOption extends ReactBitsComponent {
  category: 'animations';
}
```

**Design Rationale:**
- Extends base interface for type safety
- Enforces category constraints at compile time
- Allows future category-specific properties

### 2. Data Layer (src/data/reactBitsData.ts)

#### Structure

```typescript
// 31 Background options (single selection)
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
  // ... 30 more backgrounds
];

// 37 Component options (multiple selection)
export const componentOptions: ComponentOption[] = [
  {
    id: 'carousel',
    name: 'Carousel',
    title: 'Carousel',
    description: 'Responsive carousel with touch gestures, looping and smooth transitions.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Carousel-TS-TW.json"',
    hasCustomization: true,
    codeSnippet: `import { Carousel } from '@/components/Carousel'

<Carousel>
  {/* Your slides */}
</Carousel>`,
  },
  // ... 36 more components
];

// 25 Animation options (multiple selection)
export const animationOptions: AnimationOption[] = [
  {
    id: 'blob-cursor',
    name: 'BlobCursor',
    title: 'Blob Cursor',
    description: 'Organic blob cursor that smoothly follows pointer with elastic morphing.',
    category: 'animations',
    dependencies: ['gsap'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BlobCursor-TS-TW.json"',
    hasCustomization: true,
  },
  // ... 24 more animations
];
```

**Design Rationale:**
- Centralized data source for all react-bits components
- Strongly typed for compile-time safety
- Easy to maintain and update
- Can be replaced with API fetch in future

### 3. Context Updates (src/contexts/BoltBuilderContext.tsx)

#### New State Variables

```typescript
const [selectedBackground, setSelectedBackground] = useState<BackgroundOption | null>(null);
const [selectedComponents, setSelectedComponents] = useState<ComponentOption[]>([]);
// Update existing: const [selectedAnimations, setSelectedAnimations] = useState<AnimationOption[]>([]);
```

#### Updated Context Interface

```typescript
interface BoltBuilderContextType {
  // ... existing properties
  
  // React-Bits selections
  selectedBackground: BackgroundOption | null;
  setSelectedBackground: (bg: BackgroundOption | null) => void;
  selectedComponents: ComponentOption[];
  setSelectedComponents: React.Dispatch<React.SetStateAction<ComponentOption[]>>;
  selectedAnimations: AnimationOption[]; // Updated type
  setSelectedAnimations: React.Dispatch<React.SetStateAction<AnimationOption[]>>;
  
  // ... rest of interface
}
```

#### Progress Calculation Update

```typescript
const progress = (() => {
  let completed = 0;
  const totalSteps = 10; // Updated from 8
  
  if (projectInfo.name && projectInfo.description && projectInfo.purpose) completed++;
  if (selectedLayout) completed++;
  if (selectedDesignStyle) completed++;
  if (selectedColorTheme) completed++;
  if (selectedTypography.fontFamily) completed++;
  if (selectedVisuals.length > 0) completed++;
  if (selectedBackground) completed++; // NEW
  if (selectedComponents.length > 0) completed++; // NEW
  if (selectedFunctionality.length > 0) completed++;
  if (selectedAnimations.length > 0) completed++;
  
  return Math.round((completed / totalSteps) * 100);
})();
```

#### Save/Load Updates

```typescript
const saveProject = React.useCallback(() => {
  const projectData = {
    // ... existing fields
    selectedBackground,
    selectedComponents,
    selectedAnimations, // Now AnimationOption[]
    // ... rest of fields
  };
  
  localStorage.setItem('lovabolt-project', JSON.stringify(projectData));
}, [/* dependencies including new state */]);

const loadProject = React.useCallback((projectData: Partial<{
  // ... existing types
  selectedBackground: BackgroundOption;
  selectedComponents: ComponentOption[];
  selectedAnimations: AnimationOption[];
}>) => {
  if (projectData.selectedBackground) setSelectedBackground(projectData.selectedBackground);
  if (projectData.selectedComponents) setSelectedComponents(projectData.selectedComponents);
  if (projectData.selectedAnimations) setSelectedAnimations(projectData.selectedAnimations);
  // ... rest of loads
}, []);
```

### 4. Step Components

#### BackgroundStep Component (src/components/steps/BackgroundStep.tsx)

**Purpose:** Allow users to select one background from 31 options

**Key Features:**
- Single selection (radio-style behavior)
- Grid layout with glassmorphism cards
- Shows CLI command when selected
- Modal for detailed view

**Component Structure:**

```typescript
const BackgroundStep: React.FC = () => {
  const { selectedBackground, setSelectedBackground, setCurrentStep } = useBoltBuilder();
  const [modalState, setModalState] = useState<{ isOpen: boolean; option: BackgroundOption | null }>({
    isOpen: false,
    option: null
  });

  const handleSelect = (option: BackgroundOption) => {
    setSelectedBackground(option);
  };

  const handleContinue = () => {
    setCurrentStep('components');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Background Effects</h2>
        <p className="text-gray-300">Choose a background effect to enhance your project's visual appeal.</p>
      </div>

      {/* Grid of backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backgroundOptions.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedBackground?.id === option.id}
            onSelect={() => handleSelect(option)}
            onViewDetails={(e) => {
              e.stopPropagation();
              setModalState({ isOpen: true, option });
            }}
          />
        ))}
      </div>

      {/* Selected CLI Command Display */}
      {selectedBackground && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">Installation Command</h3>
          <code className="text-sm text-teal-400">{selectedBackground.cliCommand}</code>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep('visuals')} variant="outline">
          Back to Visuals
        </Button>
        <Button onClick={handleContinue} className="bg-teal-600 hover:bg-teal-700">
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
```

#### ComponentsStep Component (src/components/steps/ComponentsStep.tsx)

**Purpose:** Allow users to select multiple components from 37 options

**Key Features:**
- Multiple selection (checkbox-style behavior)
- Shows selected count
- Displays all CLI commands for selected items
- Modal for detailed view

**Component Structure:**

```typescript
const ComponentsStep: React.FC = () => {
  const { selectedComponents, setSelectedComponents, setCurrentStep } = useBoltBuilder();
  const [modalState, setModalState] = useState<{ isOpen: boolean; option: ComponentOption | null }>({
    isOpen: false,
    option: null
  });

  const handleToggle = (option: ComponentOption) => {
    setSelectedComponents((prev) =>
      prev.some((item) => item.id === option.id)
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, option]
    );
  };

  const handleContinue = () => {
    setCurrentStep('functionality');
  };

  return (
    <div className="space-y-8">
      {/* Header with count */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">UI Components</h2>
        <p className="text-gray-300">
          Select components to enhance your interface. {selectedComponents.length} selected.
        </p>
      </div>

      {/* Grid of components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentOptions.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedComponents.some((item) => item.id === option.id)}
            onSelect={() => handleToggle(option)}
            onViewDetails={(e) => {
              e.stopPropagation();
              setModalState({ isOpen: true, option });
            }}
          />
        ))}
      </div>

      {/* Selected CLI Commands Display */}
      {selectedComponents.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Installation Commands</h3>
          <div className="space-y-2">
            {selectedComponents.map((comp) => (
              <code key={comp.id} className="block text-sm text-teal-400">
                {comp.cliCommand}
              </code>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button onClick={() => setCurrentStep('background')} variant="outline">
          Back to Background
        </Button>
        <Button onClick={handleContinue} className="bg-teal-600 hover:bg-teal-700">
          Continue to Functionality
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
```

#### Enhanced AnimationsStep Component (src/components/steps/AnimationsStep.tsx)

**Purpose:** Replace string-based animations with react-bits AnimationOption objects

**Key Changes:**
- Import animationOptions from reactBitsData instead of wizardData
- Update selection logic to work with AnimationOption objects
- Add CLI command display
- Add modal for details

**Updated Structure:**

```typescript
const AnimationsStep: React.FC = () => {
  const { selectedAnimations, setSelectedAnimations, setCurrentStep } = useBoltBuilder();
  const [modalState, setModalState] = useState<{ isOpen: boolean; option: AnimationOption | null }>({
    isOpen: false,
    option: null
  });

  const handleToggle = (option: AnimationOption) => {
    setSelectedAnimations((prev) =>
      prev.some((item) => item.id === option.id)
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, option]
    );
  };

  // ... similar structure to ComponentsStep
};
```

### 5. Reusable UI Components

#### ReactBitsCard Component (src/components/cards/ReactBitsCard.tsx)

**Purpose:** Reusable card component for displaying react-bits options

```typescript
interface ReactBitsCardProps {
  option: ReactBitsComponent;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: (e: React.MouseEvent) => void;
}

export const ReactBitsCard: React.FC<ReactBitsCardProps> = ({
  option,
  isSelected,
  onSelect,
  onViewDetails,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group
        ${isSelected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-6 flex flex-col h-full">
        {/* Header with title and selection indicator */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-white">{option.title}</h4>
          {isSelected && (
            <div className="bg-teal-500/20 p-1 rounded-full">
              <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 flex-grow">{option.description}</p>

        {/* Dependencies badge */}
        {option.dependencies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {option.dependencies.map((dep) => (
              <span key={dep} className="text-xs px-2 py-1 bg-gray-700/50 rounded text-gray-300">
                {dep}
              </span>
            ))}
          </div>
        )}

        {/* View Details button */}
        <button
          onClick={onViewDetails}
          className="inline-flex items-center text-sm text-teal-400 hover:text-teal-300 transition-colors mt-auto"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
```

#### ReactBitsModal Component (src/components/modals/ReactBitsModal.tsx)

**Purpose:** Reusable modal for displaying detailed component information

```typescript
interface ReactBitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: ReactBitsComponent | null;
}

export const ReactBitsModal: React.FC<ReactBitsModalProps> = ({
  isOpen,
  onClose,
  option,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (option) {
      navigator.clipboard.writeText(option.cliCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !option) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="glass-card rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-white">{option.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6">{option.description}</p>

        {/* Dependencies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-2">Dependencies</h4>
          <div className="flex flex-wrap gap-2">
            {option.dependencies.map((dep) => (
              <span key={dep} className="px-3 py-1 bg-gray-700/50 rounded text-gray-300">
                {dep}
              </span>
            ))}
          </div>
        </div>

        {/* CLI Command */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-2">Installation Command</h4>
          <div className="relative">
            <code className="block p-4 bg-gray-900/50 rounded text-teal-400 text-sm overflow-x-auto">
              {option.cliCommand}
            </code>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-3 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white text-sm"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Code Snippet */}
        {option.codeSnippet && (
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Basic Usage</h4>
            <pre className="p-4 bg-gray-900/50 rounded text-gray-300 text-sm overflow-x-auto">
              {option.codeSnippet}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
```

### 6. Prompt Generation Updates

#### Enhanced generatePrompt Function

```typescript
const generatePrompt = (): string => {
  // ... existing validation

  return `Create a ${projectInfo.type.toLowerCase()} with the following specifications:

// ... existing sections 1-6

## 7. Background Effect
${selectedBackground ? `
- **Selected Background:** ${selectedBackground.title}
- **Description:** ${selectedBackground.description}
- **Dependencies:** ${selectedBackground.dependencies.join(', ')}
- **Installation:** \`${selectedBackground.cliCommand}\`
` : '- **Selected Background:** None'}

## 8. UI Components
${selectedComponents.length > 0 ? `
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
` : ''}
`).join('\n')}
` : '- No additional UI components selected'}

## 9. UI/UX Animations
${selectedAnimations.length > 0 ? `
**Selected Animations (${selectedAnimations.length}):**

${selectedAnimations.map(anim => `
### ${anim.title}
- **Description:** ${anim.description}
- **Dependencies:** ${anim.dependencies.join(', ')}
- **Installation:** \`${anim.cliCommand}\`
`).join('\n')}
` : '- Standard animations and transitions'}

// ... existing sections continue with updated numbering

## 12. React-Bits Installation

**Step 1: Install Dependencies**
\`\`\`bash
npm install ${[
  ...new Set([
    ...(selectedBackground?.dependencies || []),
    ...selectedComponents.flatMap(c => c.dependencies),
    ...selectedAnimations.flatMap(a => a.dependencies),
  ])
].join(' ')}
\`\`\`

**Step 2: Install React-Bits Components**
\`\`\`bash
${[
  selectedBackground?.cliCommand,
  ...selectedComponents.map(c => c.cliCommand),
  ...selectedAnimations.map(a => a.cliCommand),
].filter(Boolean).join('\n')}
\`\`\`

**Step 3: Import and Use**
Refer to the component-specific usage examples above for implementation details.

`.trim();
};
```

### 7. Navigation Updates

#### Sidebar Component Updates (src/components/Sidebar.tsx)

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
  { id: 'functionality', label: 'Functionality', number: 9 }, // Updated number
  { id: 'animations', label: 'Animations', number: 10 },     // Updated number
  { id: 'preview', label: 'Preview', number: 11 },           // Updated number
];
```

## Data Models

### React-Bits Component Data Model

```typescript
{
  id: string;              // Unique identifier for selection tracking
  name: string;            // Component name for code imports
  title: string;           // Display name in UI
  description: string;     // User-facing description (1-2 sentences)
  category: string;        // 'backgrounds' | 'components' | 'animations'
  dependencies: string[];  // NPM packages required (e.g., ['motion', 'gsap'])
  cliCommand: string;      // Full npx shadcn command with registry URL
  codeSnippet?: string;    // Optional usage example
  hasCustomization?: boolean; // Whether component accepts props
}
```

### Selection State Model

```typescript
{
  selectedBackground: BackgroundOption | null;  // Single selection
  selectedComponents: ComponentOption[];        // Multiple selection
  selectedAnimations: AnimationOption[];        // Multiple selection
}
```

## Error Handling

### Error Boundary Strategy

1. **Component-Level Error Boundaries**
   - Wrap each new step component with ErrorBoundary
   - Display fallback UI with option to retry or skip step
   - Log errors to console for debugging

2. **Data Loading Errors**
   - Validate react-bits data on import
   - Provide empty array fallback if data fails to load
   - Display user-friendly message in step component

3. **LocalStorage Errors**
   - Wrap saveProject/loadProject in try-catch
   - Clear corrupted data automatically
   - Initialize with default values on load failure

4. **Modal Errors**
   - Prevent modal crashes from affecting parent component
   - Close modal automatically on error
   - Log error details for debugging

### Validation Strategy

1. **Type Validation**
   - Use TypeScript strict mode
   - Validate data structure at runtime for localStorage loads
   - Ensure all required fields are present

2. **User Input Validation**
   - No validation required for selections (all optional)
   - Validate CLI commands match expected format
   - Ensure dependencies array is valid

## Testing Strategy

### Unit Tests

1. **Context Tests**
   - Test state updates for each selection type
   - Test saveProject/loadProject functionality
   - Test progress calculation with new steps

2. **Component Tests**
   - Test card selection/deselection logic
   - Test modal open/close behavior
   - Test CLI command display

3. **Prompt Generation Tests**
   - Test prompt with various selection combinations
   - Test empty state handling
   - Test CLI command formatting

### Integration Tests

1. **Step Navigation**
   - Test forward/backward navigation
   - Test state persistence across navigation
   - Test sidebar step highlighting

2. **Selection Flow**
   - Test single selection (background)
   - Test multiple selection (components, animations)
   - Test selection persistence

### E2E Tests (Using Playwright MCP)

1. **Complete Wizard Flow**
   - Navigate through all steps
   - Make selections in each step
   - Verify prompt generation
   - Test project save/load

2. **Visual Regression**
   - Screenshot each new step
   - Verify glassmorphism styling
   - Test responsive layouts

## Performance Considerations

### Optimization Strategies

1. **Component Memoization**
   - Memoize ReactBitsCard to prevent unnecessary re-renders
   - Use React.memo for modal component
   - Memoize selection handlers

2. **Data Loading**
   - Consider lazy loading react-bits data
   - Implement code splitting for step components
   - Use dynamic imports for large data arrays

3. **Rendering Optimization**
   - Implement virtualization if performance issues arise with 93 components
   - Use CSS containment for card components
   - Optimize glassmorphism effects for performance

4. **State Management**
   - Debounce localStorage saves
   - Batch state updates where possible
   - Use functional updates for array operations

## Accessibility

### WCAG 2.1 AA Compliance

1. **Keyboard Navigation**
   - All cards focusable and selectable via keyboard
   - Modal closable with Escape key
   - Tab order follows visual flow

2. **Screen Reader Support**
   - Proper ARIA labels for selection state
   - Announce selection changes
   - Descriptive button labels

3. **Visual Accessibility**
   - Sufficient color contrast for text
   - Selection indicators visible without color
   - Focus indicators clearly visible

## Security Considerations

1. **XSS Prevention**
   - Sanitize any user-generated content
   - Use React's built-in XSS protection
   - Validate CLI commands before display

2. **LocalStorage Security**
   - Don't store sensitive data
   - Validate data structure on load
   - Handle corrupted data gracefully

## Future Enhancements

1. **Search and Filter**
   - Add search bar for components
   - Category filters
   - Tag-based filtering

2. **Preview System**
   - Live previews of backgrounds
   - Component demos
   - Animation previews

3. **Customization**
   - Allow prop customization for components
   - Color scheme overrides
   - Size/variant selection

4. **Dynamic Data**
   - Fetch react-bits data from API
   - Auto-update component list
   - Version management
