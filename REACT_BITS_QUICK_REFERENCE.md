# React-Bits Quick Reference Guide

Quick reference for developers working with the React-Bits integration.

## 📦 Component Counts

- **Backgrounds**: 31 (single selection)
- **Components**: 37 (multiple selection)
- **Animations**: 25 (multiple selection)
- **Total**: 93 components

## 🗂️ File Locations

| File | Purpose |
|------|---------|
| `src/data/reactBitsData.ts` | All 93 component definitions |
| `src/types/index.ts` | TypeScript interfaces |
| `src/components/cards/ReactBitsCard.tsx` | Reusable card component |
| `src/components/modals/ReactBitsModal.tsx` | Detail modal component |
| `src/components/steps/BackgroundStep.tsx` | Background selection step |
| `src/components/steps/ComponentsStep.tsx` | Component selection step |
| `src/components/steps/AnimationsStep.tsx` | Animation selection step |
| `src/contexts/BoltBuilderContext.tsx` | Global state management |

## 🎯 Context API

### Access State

```typescript
import { useBoltBuilder } from '@/contexts/BoltBuilderContext';

const {
  selectedBackground,      // BackgroundOption | null
  setSelectedBackground,   // (bg: BackgroundOption | null) => void
  selectedComponents,      // ComponentOption[]
  setSelectedComponents,   // Dispatch<SetStateAction<ComponentOption[]>>
  selectedAnimations,      // AnimationOption[]
  setSelectedAnimations,   // Dispatch<SetStateAction<AnimationOption[]>>
} = useBoltBuilder();
```

### Selection Patterns

**Single Selection (Background)**
```typescript
const handleSelect = (option: BackgroundOption) => {
  setSelectedBackground(option);
};
```

**Multiple Selection (Components/Animations)**
```typescript
const handleToggle = (option: ComponentOption) => {
  setSelectedComponents(prev =>
    prev.some(item => item.id === option.id)
      ? prev.filter(item => item.id !== option.id)
      : [...prev, option]
  );
};
```

## 📋 Component Interface

```typescript
interface ReactBitsComponent {
  id: string;                    // 'aurora', 'carousel', 'blob-cursor'
  name: string;                  // 'Aurora', 'Carousel', 'BlobCursor'
  title: string;                 // 'Aurora', 'Carousel', 'Blob Cursor'
  description: string;           // User-facing description
  category: 'backgrounds' | 'components' | 'animations';
  dependencies: string[];        // ['ogl'], ['motion'], ['gsap']
  cliCommand: string;           // 'npx shadcn@latest add "..."'
  codeSnippet?: string;         // Optional usage example
  hasCustomization?: boolean;   // true/false
}
```

## 🎨 Using ReactBitsCard

```typescript
import { ReactBitsCard } from '@/components/cards/ReactBitsCard';

<ReactBitsCard
  option={backgroundOptions[0]}
  isSelected={selectedBackground?.id === backgroundOptions[0].id}
  onSelect={() => setSelectedBackground(backgroundOptions[0])}
  onViewDetails={(e) => {
    e.stopPropagation();
    setModalState({ isOpen: true, option: backgroundOptions[0] });
  }}
/>
```

## 🪟 Using ReactBitsModal

```typescript
import { ReactBitsModal } from '@/components/modals/ReactBitsModal';

const [modalState, setModalState] = useState<{
  isOpen: boolean;
  option: ReactBitsComponent | null;
}>({ isOpen: false, option: null });

<ReactBitsModal
  isOpen={modalState.isOpen}
  onClose={() => setModalState({ isOpen: false, option: null })}
  option={modalState.option}
/>
```

## 📊 Data Access

```typescript
import { 
  backgroundOptions,  // BackgroundOption[] (31 items)
  componentOptions,   // ComponentOption[] (37 items)
  animationOptions    // AnimationOption[] (25 items)
} from '@/data/reactBitsData';

// Use in components
backgroundOptions.map(bg => <Card key={bg.id} {...bg} />)
```

## 🔧 Adding New Components

1. **Add to data file** (`src/data/reactBitsData.ts`):
```typescript
{
  id: 'new-component',
  name: 'NewComponent',
  title: 'New Component',
  description: 'What it does.',
  category: 'components',
  dependencies: ['motion'],
  cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/NewComponent-TS-TW.json"',
  hasCustomization: true,
}
```

2. **Verify in UI**: Component appears automatically in appropriate step

3. **Test**: Selection, modal, CLI command display, prompt generation

## 🎯 CLI Command Format

**Always use this exact format:**
```typescript
'npx shadcn@latest add "https://reactbits.dev/registry/ComponentName-TS-TW.json"'
```

- Double quotes around URL
- Exact component name from registry
- `-TS-TW` suffix (TypeScript + Tailwind)

## 🧪 Testing Checklist

- [ ] Component appears in grid
- [ ] Selection/deselection works
- [ ] Visual indicator shows selected state
- [ ] CLI command displays when selected
- [ ] Modal opens with "View Details"
- [ ] Modal shows all information
- [ ] Copy button works in modal
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes
- [ ] Prompt generation includes component
- [ ] State persists on navigation
- [ ] LocalStorage saves selections

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Component not showing | Check array, category, and file save |
| Selection not working | Verify handler connection and context update |
| CLI command not displaying | Check conditional rendering and state |
| Modal not opening | Verify `e.stopPropagation()` and state management |
| Type errors | Ensure all required fields present |
| Prompt missing react-bits | Check `generatePrompt` function includes sections |

## 📈 Performance Tips

```typescript
// Memoize components
export const ReactBitsCard = React.memo(ReactBitsCardComponent);

// Memoize handlers
const handleSelect = React.useCallback((option: BackgroundOption) => {
  setSelectedBackground(option);
}, [setSelectedBackground]);

// Memoize expensive computations
const sortedOptions = React.useMemo(() => {
  return backgroundOptions.sort((a, b) => a.title.localeCompare(b.title));
}, []);
```

## ♿ Accessibility

```typescript
// Card accessibility
<div
  role="button"
  tabIndex={0}
  aria-label={`${option.title}. ${option.description}. ${isSelected ? 'Selected' : 'Not selected'}`}
  aria-pressed={isSelected}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  }}
>

// Screen reader announcements
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {selectedComponents.length} components selected
</div>
```

## 🔗 Quick Links

- [Full Documentation](REACT_BITS_INTEGRATION.md)
- [Requirements](.kiro/specs/react-bits-integration/requirements.md)
- [Design](.kiro/specs/react-bits-integration/design.md)
- [Tasks](.kiro/specs/react-bits-integration/tasks.md)
- [React-Bits Docs](https://reactbits.dev)

## 💡 Pro Tips

1. **Use TypeScript**: Let the compiler catch errors early
2. **Test Incrementally**: Add one component at a time
3. **Check DevTools**: Use React DevTools to inspect state
4. **Memoize Everything**: Prevent unnecessary re-renders
5. **Follow Patterns**: Use existing step components as templates
6. **Document Changes**: Add JSDoc comments for new code
7. **Test Accessibility**: Use keyboard and screen reader
8. **Verify Prompts**: Always test prompt generation

---

**Last Updated**: 2025-01-30
