---
inclusion: always
---

# LovaBolt Project Standards

## Project Overview

LovaBolt is a wizard-based web application that guides users through creating project specifications for AI-powered development. The application uses React, TypeScript, and Tailwind CSS with a distinctive glassmorphism design aesthetic.

## Code Style and Conventions

### TypeScript Standards

- **Strict Mode**: Always use TypeScript strict mode
- **Type Safety**: Prefer explicit types over `any`
- **Interfaces over Types**: Use `interface` for object shapes, `type` for unions/intersections
- **Naming Conventions**:
  - Interfaces: PascalCase (e.g., `ProjectInfo`, `ColorTheme`)
  - Components: PascalCase (e.g., `BackgroundStep`, `ReactBitsCard`)
  - Functions: camelCase (e.g., `generatePrompt`, `handleSelect`)
  - Constants: UPPER_SNAKE_CASE for true constants, camelCase for exported data arrays

### React Patterns

- **Functional Components**: Always use functional components with hooks
- **Props Interface**: Define props interface for every component
- **State Management**: Use Context API for global state, local useState for component state
- **Hooks Order**: Follow React hooks rules (useState, useEffect, useContext, custom hooks)
- **Event Handlers**: Prefix with `handle` (e.g., `handleClick`, `handleSubmit`)

### Component Structure

```typescript
// 1. Imports (React, third-party, local)
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';

// 2. Type definitions
interface ComponentProps {
  // props
}

// 3. Component definition
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 4. Hooks
  const { state, setState } = useBoltBuilder();
  const [localState, setLocalState] = useState(initialValue);
  
  // 5. Event handlers
  const handleAction = () => {
    // logic
  };
  
  // 6. Effects
  React.useEffect(() => {
    // effect logic
  }, [dependencies]);
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## Design System

### Glassmorphism Styling

All cards and containers should use the glassmorphism effect:

```tsx
<div className="relative overflow-hidden rounded-xl">
  <div className="absolute inset-0 glass-card" />
  <div className="relative p-6">
    {/* Content */}
  </div>
</div>
```

### Color Palette

- **Primary Accent**: Teal (`teal-500`, `teal-600`, `teal-700`)
- **Text Colors**: 
  - Primary: `text-white`
  - Secondary: `text-gray-300`
  - Tertiary: `text-gray-400`
- **Background**: Dark theme with glassmorphism overlays
- **Selection Indicators**: `ring-2 ring-teal-500`

### Spacing and Layout

- **Grid Layouts**: Responsive grids
  - Mobile: `grid-cols-1`
  - Tablet: `md:grid-cols-2`
  - Desktop: `lg:grid-cols-3` or `lg:grid-cols-4`
- **Gap**: Use `gap-6` for grid spacing
- **Padding**: Use `p-6` for card content, `p-8` for modals
- **Margins**: Use `mb-2`, `mb-4`, `mb-6`, `mb-8` for vertical spacing

### Interactive States

- **Hover**: `hover:scale-[1.02]` for cards
- **Selected**: `ring-2 ring-teal-500 scale-[1.02]`
- **Transitions**: `transition-all duration-300`
- **Buttons**: 
  - Primary: `bg-teal-600 hover:bg-teal-700 text-white`
  - Secondary: `variant="outline"`

## File Organization

```
src/
├── components/
│   ├── steps/           # Wizard step components
│   ├── cards/           # Reusable card components
│   ├── modals/          # Modal components
│   └── ui/              # Base UI components (buttons, inputs)
├── contexts/            # React Context providers
├── data/                # Static data and constants
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## State Management

### Context Pattern

- **BoltBuilderContext**: Global wizard state
- **Provider Wrapping**: Wrap app in provider at root level
- **Custom Hook**: Always provide `useBoltBuilder()` hook for consuming context
- **State Updates**: Use functional updates for arrays and objects

### LocalStorage Persistence

- **Auto-save**: Debounce saves (1 second delay)
- **Load on Mount**: Load saved project on app initialization
- **Error Handling**: Wrap in try-catch, clear corrupted data
- **Key**: Use consistent key (`lovabolt-project`)

## Navigation Flow

### Step Order

1. Project Setup
2. Layout
3. Design Style
4. Color Theme
5. Typography
6. Visuals
7. Background (NEW)
8. Components (NEW)
9. Functionality
10. Animations
11. Preview

### Navigation Rules

- **Forward**: Validate current step before proceeding (optional validation)
- **Backward**: Always allow backward navigation
- **Sidebar**: Highlight current step, show progress
- **URLs**: Update URL to reflect current step

## Error Handling

### Error Boundaries

- Wrap each step component with ErrorBoundary
- Provide fallback UI with retry option
- Log errors to console for debugging

### Try-Catch Blocks

```typescript
try {
  // risky operation
} catch (error) {
  console.error('Operation failed:', error);
  // handle gracefully
}
```

### User Feedback

- Show error messages in UI (not just console)
- Provide actionable recovery options
- Never crash the entire application

## Performance

### Optimization Techniques

- **Memoization**: Use `React.memo` for expensive components
- **Callbacks**: Use `useCallback` for event handlers passed as props
- **Effects**: Minimize dependencies in useEffect
- **Code Splitting**: Use dynamic imports for large components
- **Debouncing**: Debounce expensive operations (search, save)

### Bundle Size

- Keep component files focused and small
- Lazy load step components if needed
- Avoid large dependencies when possible

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus Indicators**: Visible focus states on all focusable elements
- **ARIA Labels**: Use proper ARIA attributes for screen readers
- **Color Contrast**: Ensure sufficient contrast ratios
- **Semantic HTML**: Use proper HTML elements (button, nav, main, etc.)

### Implementation

```tsx
// Good: Proper button with ARIA
<button
  onClick={handleClick}
  aria-label="Select background option"
  className="focus:ring-2 focus:ring-teal-500"
>
  Select
</button>

// Bad: Div as button
<div onClick={handleClick}>Select</div>
```

## Testing

### Testing Strategy

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions and context
- **E2E Tests**: Test complete user flows with Playwright

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Utility tests: `utilityName.test.ts`
- E2E tests: `feature-name.spec.ts`

## Documentation

### Code Comments

- **JSDoc**: Use JSDoc for exported functions and components
- **Inline Comments**: Explain complex logic, not obvious code
- **TODO Comments**: Mark incomplete work with `// TODO: description`

### Component Documentation

```typescript
/**
 * ReactBitsCard displays a react-bits component option with selection state.
 * 
 * @param option - The react-bits component data
 * @param isSelected - Whether the component is currently selected
 * @param onSelect - Callback when the card is clicked
 * @param onViewDetails - Callback when "View Details" is clicked
 */
export const ReactBitsCard: React.FC<ReactBitsCardProps> = ({ ... }) => {
  // implementation
};
```

## Git Workflow

### Commit Messages

- Use conventional commits format
- Examples:
  - `feat: add BackgroundStep component`
  - `fix: resolve selection state bug in ComponentsStep`
  - `refactor: extract ReactBitsCard to reusable component`
  - `docs: update README with new wizard steps`
  - `test: add E2E tests for react-bits integration`

### Branch Naming

- Feature branches: `feature/react-bits-integration`
- Bug fixes: `fix/selection-state-bug`
- Refactoring: `refactor/extract-card-component`

## Dependencies

### Adding New Dependencies

- Evaluate necessity before adding
- Check bundle size impact
- Prefer lightweight alternatives
- Document why dependency is needed

### Current Stack

- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **React Router**: Navigation (if used)

## Prompt Generation

### Format Standards

- Use markdown formatting
- Include clear section headers (##)
- Provide installation commands in bash code blocks
- Include usage examples when relevant
- List dependencies explicitly
- Use bullet points for lists

### Example Structure

```markdown
## Section Name

- **Field**: Value
- **Description**: Detailed description

**Installation:**
\`\`\`bash
npm install package-name
\`\`\`

**Usage:**
\`\`\`tsx
import { Component } from 'package';
<Component />
\`\`\`
```

## Common Patterns

### Selection Logic

**Single Selection (Radio-style):**
```typescript
const handleSelect = (option: OptionType) => {
  setSelected(option);
};
```

**Multiple Selection (Checkbox-style):**
```typescript
const handleToggle = (option: OptionType) => {
  setSelected((prev) =>
    prev.some((item) => item.id === option.id)
      ? prev.filter((item) => item.id !== option.id)
      : [...prev, option]
  );
};
```

### Modal Pattern

```typescript
const [modalState, setModalState] = useState<{
  isOpen: boolean;
  option: OptionType | null;
}>({
  isOpen: false,
  option: null,
});

const openModal = (option: OptionType) => {
  setModalState({ isOpen: true, option });
};

const closeModal = () => {
  setModalState({ isOpen: false, option: null });
};
```

## Build and Development

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### Common Issues

1. **Type Errors**: Ensure all imports have proper types
2. **State Not Updating**: Use functional updates for arrays/objects
3. **Styling Not Applied**: Check Tailwind class names, ensure no typos
4. **Context Undefined**: Ensure component is wrapped in provider
5. **LocalStorage Errors**: Wrap in try-catch, validate data structure

### Debug Tools

- React DevTools for component inspection
- TypeScript compiler for type checking
- Browser DevTools for runtime debugging
- Console logs for state tracking (remove before commit)
