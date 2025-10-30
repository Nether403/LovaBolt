# React-Bits Integration Documentation

## Overview

The React-Bits integration adds 93 pre-built, production-ready React components to the LovaBolt wizard, enabling users to select professional UI components, backgrounds, and animations for their projects. This integration enhances the wizard with two new steps (Background and Components) and updates the existing Animations step.

## Table of Contents

- [Architecture](#architecture)
- [Component Categories](#component-categories)
- [New Wizard Steps](#new-wizard-steps)
- [Data Structure](#data-structure)
- [Usage Examples](#usage-examples)
- [Adding New Components](#adding-new-components)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

---

## Architecture

### High-Level Flow

```
User Selection → Context State → Prompt Generation → AI Implementation
```

### Component Hierarchy

```
WizardLayout
├── Sidebar (updated with new steps)
├── MainContent
│   ├── BackgroundStep (NEW)
│   │   ├── ReactBitsCard (31 backgrounds)
│   │   └── ReactBitsModal
│   ├── ComponentsStep (NEW)
│   │   ├── ReactBitsCard (37 components)
│   │   └── ReactBitsModal
│   └── AnimationsStep (UPDATED)
│       ├── ReactBitsCard (25 animations)
│       └── ReactBitsModal
└── PreviewPanel (updated with react-bits sections)
```

### State Management

All react-bits selections are managed in `BoltBuilderContext`:

```typescript
{
  selectedBackground: BackgroundOption | null,      // Single selection
  selectedComponents: ComponentOption[],            // Multiple selection
  selectedAnimations: AnimationOption[]             // Multiple selection
}
```

---

## Component Categories

### 1. Backgrounds (31 components)

Full-page background effects that enhance visual appeal. **Single selection only**.

#### Subcategories:

**Gradient Effects**
- Aurora - Flowing aurora gradient with smooth transitions
- Background Gradient - Animated gradient with color transitions
- Background Gradient Animation - Continuously animated gradient

**Pattern Backgrounds**
- Animated Grid Pattern - Dynamic grid with animated lines
- Dot Pattern - Subtle dot pattern for texture
- Grid Pattern - Clean grid for structured layouts
- Retro Grid - Nostalgic retro-style grid with perspective

**Particle Systems**
- Particles - Floating particles with mouse interaction
- Meteors - Shooting star meteors
- Shooting Stars - Night sky with shooting stars
- Stars Background - Starfield with twinkling stars
- Sparkles - Magical sparkle particles

**Light Effects**
- Spotlight - Dynamic spotlight following cursor
- Background Beams - Animated light beams
- Lamp - Dramatic lamp lighting from above
- Hero Highlight - Hero section with animated highlight

**3D Effects**
- Globe - 3D rotating globe with connections
- Boxes - Animated 3D boxes creating depth
- Background Boxes - Grid of animated boxes

**Animated Effects**
- Ripple - Animated ripple from center
- Vortex - Swirling vortex with particles
- Wavy Background - Flowing wave patterns
- Moving Border - Animated border with gradient
- Tracing Beam - Vertical beam tracing scroll
- Lens - Magnifying lens effect on hover

**Special Effects**
- Floating Navbar - Floating nav with blur
- Canvas Reveal - Canvas-based reveal animation
- Macbook Scroll - MacBook mockup with scroll reveal
- Container Scroll - Container with parallax scroll

### 2. Components (37 components)

UI components for building feature-rich interfaces. **Multiple selection allowed**.

#### Subcategories:

**Navigation**
- Carousel - Responsive carousel with touch gestures
- Tabs - Tabbed interface with animated indicator
- Sidebar - Collapsible sidebar navigation
- Navbar Menu - Animated navigation with dropdown
- Floating Navbar - Floating navigation bar

**Content Display**
- Card - Versatile card with hover effects
- 3D Card - Card with 3D tilt effect
- Hover Card - Card with advanced hover animations
- Bento Grid - Modern bento-style grid layout
- Timeline - Vertical timeline with animations
- Accordion - Expandable accordion component

**Interactive Elements**
- Shimmer Button - Button with shimmer animation
- Moving Button - Button with moving border
- Hover Border Gradient - Button with gradient border
- Magnetic Button - Button with magnetic attraction
- Animated Tooltip - Tooltip with smooth animations
- Animated Modal - Modal with entrance animations

**Text Effects**
- Typewriter - Typewriter text animation
- Flip Words - Animated word rotation with flip
- Text Generate - Text generation animation
- Animated Testimonials - Testimonial carousel

**Scroll Effects**
- Parallax Scroll - Image gallery with parallax
- Sticky Scroll - Content that sticks during scroll
- Infinite Scroll - Infinite scrolling marquee
- Compare - Before/after image comparison

**Advanced Components**
- Glowing Stars - Card with glowing star decorations
- Evervault Card - Card with encrypted text reveal
- Focus Cards - Cards that expand on focus
- Direction Aware Hover - Direction-aware hover animations
- Animated Pin - Pinterest-style animated pin
- Apple Cards Carousel - Apple-style cards carousel
- Layout Grid - Expandable grid layout
- Expandable Card - Card that expands to full screen
- Card Stack - Stacked cards with swipe
- Animated List - List with staggered animations
- Cover - Full-screen cover with reveal
- Following Pointer - Custom cursor with trail
- Images Slider - Full-screen image slider
- Multi Step Loader - Multi-step loading animation

### 3. Animations (25 components)

Animation and micro-interaction effects. **Multiple selection allowed**.

#### Subcategories:

**Cursor Effects**
- Blob Cursor - Organic blob cursor with elastic morphing
- Following Pointer - Custom cursor that follows pointer

**Entrance Animations**
- Fade In - Smooth fade-in animation
- Slide In - Slide-in from various directions
- Scale In - Scale-in with spring physics
- Rotate In - Rotation entrance animation
- Bounce In - Bouncy entrance animation
- Blur In - Blur-to-focus entrance

**Scroll Animations**
- Scroll Reveal - Reveal elements entering viewport
- Parallax - Parallax scrolling effect
- Text Reveal - Text reveal animation on scroll

**Hover Effects**
- Hover Lift - Lift effect with shadow
- Hover Glow - Glowing effect on hover
- Hover Shine - Shine animation across element
- Magnetic Button - Magnetic attraction to cursor

**Loading States**
- Loading Spinner - Animated loading spinner
- Skeleton Loader - Skeleton loading animation
- Pulse - Pulsing animation effect

**Transitions**
- Page Transition - Smooth page transitions
- Morph - Smooth morphing between states

**Attention Effects**
- Shake - Shake animation for attention
- Wiggle - Wiggle animation effect
- Flip - Card flip animation

**Advanced Effects**
- Stagger Children - Staggered child animations
- Zoom In - Zoom-in on scroll or trigger
- Gradient Text - Animated gradient text

---

## New Wizard Steps

### Step 7: Background Effects

**Purpose**: Allow users to select one background effect from 31 options.

**Location**: `src/components/steps/BackgroundStep.tsx`

**Features**:
- Single selection (radio-style behavior)
- Responsive grid layout (1/2/3 columns)
- CLI command display when selected
- Modal for detailed information
- Keyboard navigation support
- Screen reader announcements

**Navigation**:
- Previous: Visuals Step
- Next: Components Step

**Usage Example**:
```tsx
import BackgroundStep from './components/steps/BackgroundStep';

// Used automatically in wizard flow
// User selects one background, stored in context
```

### Step 8: UI Components

**Purpose**: Allow users to select multiple UI components from 37 options.

**Location**: `src/components/steps/ComponentsStep.tsx`

**Features**:
- Multiple selection (checkbox-style behavior)
- Selection count display
- Responsive grid layout (1/2/3 columns)
- CLI commands list for all selections
- Modal for detailed information
- Keyboard navigation support
- Screen reader announcements

**Navigation**:
- Previous: Background Step
- Next: Functionality Step

**Usage Example**:
```tsx
import ComponentsStep from './components/steps/ComponentsStep';

// Used automatically in wizard flow
// User can select multiple components
```

### Step 10: UI/UX Animations (Updated)

**Purpose**: Allow users to select multiple animations from 25 react-bits options.

**Location**: `src/components/steps/AnimationsStep.tsx`

**Changes from Original**:
- Now uses `AnimationOption` type instead of strings
- Displays react-bits animations instead of generic types
- Shows CLI commands for each selection
- Includes modal for detailed information

**Navigation**:
- Previous: Functionality Step
- Next: Preview Step

---

## Data Structure

### ReactBitsComponent Interface

Base interface for all react-bits components:

```typescript
interface ReactBitsComponent {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Component name for imports (PascalCase)
  title: string;                 // Display title
  description: string;           // User-facing description
  category: 'animations' | 'components' | 'backgrounds';
  dependencies: string[];        // NPM dependencies
  cliCommand: string;           // Full npx shadcn command
  codeSnippet?: string;         // Optional usage example
  hasCustomization?: boolean;   // Whether component accepts props
  previewUrl?: string;          // Optional preview image
  tags?: string[];              // For future search/filter
}
```

### Specialized Interfaces

```typescript
// Single selection
interface BackgroundOption extends ReactBitsComponent {
  category: 'backgrounds';
}

// Multiple selection
interface ComponentOption extends ReactBitsComponent {
  category: 'components';
}

// Multiple selection
interface AnimationOption extends ReactBitsComponent {
  category: 'animations';
}
```

### Data Location

All react-bits data is stored in `src/data/reactBitsData.ts`:

```typescript
export const backgroundOptions: BackgroundOption[] = [ /* 31 items */ ];
export const componentOptions: ComponentOption[] = [ /* 37 items */ ];
export const animationOptions: AnimationOption[] = [ /* 25 items */ ];
```

---

## Usage Examples

### Selecting a Background

```typescript
import { useBoltBuilder } from '@/contexts/BoltBuilderContext';
import { backgroundOptions } from '@/data/reactBitsData';

function MyComponent() {
  const { selectedBackground, setSelectedBackground } = useBoltBuilder();
  
  const handleSelect = (bg: BackgroundOption) => {
    setSelectedBackground(bg);
  };
  
  return (
    <div>
      {backgroundOptions.map(bg => (
        <button
          key={bg.id}
          onClick={() => handleSelect(bg)}
          className={selectedBackground?.id === bg.id ? 'selected' : ''}
        >
          {bg.title}
        </button>
      ))}
    </div>
  );
}
```

### Selecting Multiple Components

```typescript
import { useBoltBuilder } from '@/contexts/BoltBuilderContext';
import { componentOptions } from '@/data/reactBitsData';

function MyComponent() {
  const { selectedComponents, setSelectedComponents } = useBoltBuilder();
  
  const handleToggle = (comp: ComponentOption) => {
    setSelectedComponents(prev =>
      prev.some(item => item.id === comp.id)
        ? prev.filter(item => item.id !== comp.id)
        : [...prev, comp]
    );
  };
  
  return (
    <div>
      <p>{selectedComponents.length} selected</p>
      {componentOptions.map(comp => (
        <button
          key={comp.id}
          onClick={() => handleToggle(comp)}
          className={selectedComponents.some(c => c.id === comp.id) ? 'selected' : ''}
        >
          {comp.title}
        </button>
      ))}
    </div>
  );
}
```

### Accessing Selections in Prompt Generation

```typescript
const { selectedBackground, selectedComponents, selectedAnimations } = useBoltBuilder();

// Background section
if (selectedBackground) {
  prompt += `## Background Effect\n`;
  prompt += `- **Selected**: ${selectedBackground.title}\n`;
  prompt += `- **Description**: ${selectedBackground.description}\n`;
  prompt += `- **Installation**: \`${selectedBackground.cliCommand}\`\n\n`;
}

// Components section
if (selectedComponents.length > 0) {
  prompt += `## UI Components (${selectedComponents.length})\n\n`;
  selectedComponents.forEach(comp => {
    prompt += `### ${comp.title}\n`;
    prompt += `- ${comp.description}\n`;
    prompt += `- **Install**: \`${comp.cliCommand}\`\n\n`;
  });
}
```

---

## Adding New Components

### Step 1: Add Component Data

Add the new component to the appropriate array in `src/data/reactBitsData.ts`:

```typescript
export const componentOptions: ComponentOption[] = [
  // ... existing components
  {
    id: 'new-component',                    // Unique kebab-case ID
    name: 'NewComponent',                   // PascalCase name
    title: 'New Component',                 // Display title
    description: 'Description of what this component does.',
    category: 'components',
    dependencies: ['motion'],               // NPM packages needed
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/NewComponent-TS-TW.json"',
    hasCustomization: true,
    codeSnippet: `import { NewComponent } from '@/components/NewComponent'

<NewComponent>
  {/* Usage example */}
</NewComponent>`,
  },
];
```

### Step 2: Verify Type Safety

TypeScript will automatically validate your new component against the interface. Ensure:
- `id` is unique
- `category` matches the array type
- `cliCommand` follows the correct format
- All required fields are present

### Step 3: Test Integration

1. Start the dev server: `npm run dev`
2. Navigate to the appropriate step
3. Verify the new component appears in the grid
4. Test selection/deselection
5. Check modal displays correctly
6. Verify CLI command is correct
7. Test prompt generation includes the component

### CLI Command Format

All CLI commands must follow this exact format:

```typescript
'npx shadcn@latest add "https://reactbits.dev/registry/ComponentName-TS-TW.json"'
```

**Important**:
- Always use double quotes around the URL
- Use exact component name from react-bits registry
- Include `-TS-TW` suffix (TypeScript + Tailwind)

---

## API Reference

### Context API

#### useBoltBuilder Hook

Access react-bits state and setters:

```typescript
const {
  // Background (single selection)
  selectedBackground,
  setSelectedBackground,
  
  // Components (multiple selection)
  selectedComponents,
  setSelectedComponents,
  
  // Animations (multiple selection)
  selectedAnimations,
  setSelectedAnimations,
  
  // Other wizard state...
} = useBoltBuilder();
```

#### State Types

```typescript
selectedBackground: BackgroundOption | null
selectedComponents: ComponentOption[]
selectedAnimations: AnimationOption[]
```

#### Setter Functions

```typescript
setSelectedBackground: (bg: BackgroundOption | null) => void
setSelectedComponents: React.Dispatch<React.SetStateAction<ComponentOption[]>>
setSelectedAnimations: React.Dispatch<React.SetStateAction<AnimationOption[]>>
```

### Reusable Components

#### ReactBitsCard

Displays a react-bits component option with selection state.

```typescript
interface ReactBitsCardProps {
  option: ReactBitsComponent;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: (e: React.MouseEvent) => void;
}

<ReactBitsCard
  option={backgroundOptions[0]}
  isSelected={selectedBackground?.id === backgroundOptions[0].id}
  onSelect={() => setSelectedBackground(backgroundOptions[0])}
  onViewDetails={(e) => {
    e.stopPropagation();
    openModal(backgroundOptions[0]);
  }}
/>
```

**Features**:
- Glassmorphism styling
- Selection indicator
- Hover effects
- Keyboard navigation
- ARIA labels
- Dependencies badges
- "View Details" button

#### ReactBitsModal

Displays detailed information about a react-bits component.

```typescript
interface ReactBitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: ReactBitsComponent | null;
}

<ReactBitsModal
  isOpen={modalState.isOpen}
  onClose={() => setModalState({ isOpen: false, option: null })}
  option={modalState.option}
/>
```

**Features**:
- Full description
- Dependencies list
- CLI command with copy button
- Optional code snippet
- Keyboard support (Escape to close)
- Focus trap
- ARIA attributes

### Data Exports

```typescript
// From src/data/reactBitsData.ts
export const backgroundOptions: BackgroundOption[];  // 31 items
export const componentOptions: ComponentOption[];    // 37 items
export const animationOptions: AnimationOption[];    // 25 items
```

---

## Troubleshooting

### Common Issues

#### 1. Component Not Appearing in Grid

**Problem**: New component doesn't show up in the step.

**Solution**:
- Verify component is added to correct array (`backgroundOptions`, `componentOptions`, or `animationOptions`)
- Check that `category` field matches the array type
- Ensure file is saved and dev server has reloaded
- Check browser console for TypeScript errors

#### 2. Selection Not Working

**Problem**: Clicking card doesn't select/deselect component.

**Solution**:
- Verify `onSelect` handler is properly connected
- Check that context state is updating (use React DevTools)
- Ensure `isSelected` prop is correctly calculated
- For multiple selection, verify toggle logic uses functional update

#### 3. CLI Command Not Displaying

**Problem**: CLI command section doesn't appear after selection.

**Solution**:
- Check conditional rendering: `{selectedBackground && <div>...</div>}`
- Verify `cliCommand` field is present in component data
- Ensure component is actually selected (check context state)
- Check for CSS display issues

#### 4. Modal Not Opening

**Problem**: "View Details" button doesn't open modal.

**Solution**:
- Verify `e.stopPropagation()` is called in `onViewDetails`
- Check modal state management
- Ensure `ReactBitsModal` component is rendered
- Verify `isOpen` prop is correctly set

#### 5. Type Errors

**Problem**: TypeScript errors when adding new component.

**Solution**:
- Ensure all required fields are present
- Check that `category` matches the interface
- Verify `dependencies` is an array of strings
- Ensure `cliCommand` is a string

#### 6. Prompt Generation Missing React-Bits

**Problem**: Generated prompt doesn't include react-bits selections.

**Solution**:
- Verify `generatePrompt` function includes react-bits sections
- Check that context state has selections
- Ensure prompt generation logic handles empty states
- Test with actual selections made

### Debug Tips

1. **Use React DevTools**: Inspect context state to verify selections
2. **Console Logging**: Add logs to selection handlers
3. **Check Network Tab**: Verify no failed requests
4. **Validate Data**: Ensure all 93 components are in data file
5. **Test Incrementally**: Add one component at a time
6. **Check Dependencies**: Ensure all NPM packages are installed

### Performance Issues

If experiencing slow rendering with 93 components:

1. **Verify Memoization**: Ensure `ReactBitsCard` and `ReactBitsModal` are memoized
2. **Check Re-renders**: Use React DevTools Profiler
3. **Optimize Handlers**: Ensure handlers are memoized with `useCallback`
4. **Consider Virtualization**: For very large lists, implement virtual scrolling

---

## Best Practices

### 1. Data Management

- Keep all react-bits data in `reactBitsData.ts`
- Use consistent naming conventions (kebab-case for IDs, PascalCase for names)
- Include descriptive descriptions (1-2 sentences)
- Always provide CLI commands in correct format
- Add code snippets for complex components

### 2. State Management

- Use functional updates for array operations
- Avoid direct state mutation
- Memoize expensive operations
- Debounce localStorage saves

### 3. Component Design

- Keep components focused and reusable
- Use proper TypeScript types
- Implement error boundaries
- Add accessibility features
- Test keyboard navigation

### 4. User Experience

- Provide clear visual feedback for selections
- Show loading states when appropriate
- Display helpful error messages
- Ensure responsive design works on all devices
- Test with screen readers

### 5. Performance

- Memoize components with `React.memo`
- Use `useCallback` for event handlers
- Implement code splitting if needed
- Optimize images and assets
- Monitor bundle size

---

## Related Documentation

- [Requirements Document](.kiro/specs/react-bits-integration/requirements.md)
- [Design Document](.kiro/specs/react-bits-integration/design.md)
- [Implementation Tasks](.kiro/specs/react-bits-integration/tasks.md)
- [React-Bits Official Docs](https://reactbits.dev)
- [Shadcn CLI Documentation](https://ui.shadcn.com)

---

## Support

For issues or questions:
- Check this documentation first
- Review the design and requirements documents
- Inspect the code with comments
- Test in isolation to identify the problem
- Consult React-Bits documentation for component-specific issues

---

**Last Updated**: 2025-01-30
**Version**: 1.0.0
**Status**: Complete ✅
