# Visual Guide: Background Preview Feature

## Before vs After

### BEFORE (No Previews)
```
┌─────────────────────────────┐
│ Aurora Background           │
│                             │
│ Flowing aurora gradient     │
│ background with smooth      │
│ color transitions.          │
│                             │
│ [ogl]                       │
│                             │
│ View Details →              │
└─────────────────────────────┘
```

### AFTER (With Live Previews)
```
┌─────────────────────────────┐
│ ╔═══════════════════════╗   │
│ ║ [LIVE ANIMATED        ║   │
│ ║  AURORA PREVIEW]      ║   │
│ ║  160px height         ║   │
│ ╚═══════════════════════╝   │
├─────────────────────────────┤
│ Aurora Background           │
│                             │
│ Flowing aurora gradient     │
│ background with smooth      │
│ color transitions.          │
│                             │
│ [ogl]                       │
│                             │
│ View Details →              │
└─────────────────────────────┘
```

## Page Layout

### Info Banner
```
┌────────────────────────────────────────────────────┐
│ ℹ️  Live animated previews • 31 backgrounds       │
│    available • Page 2 of 6                        │
└────────────────────────────────────────────────────┘
```

### Grid Layout (3 columns on desktop)
```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Aurora  │  │  Silk   │  │ Squares │
│ [LIVE]  │  │ [LIVE]  │  │ [LIVE]  │
└─────────┘  └─────────┘  └─────────┘

┌─────────┐  ┌─────────┐  ┌─────────┐
│Hyperspd │  │Iridescn │  │GridMotn │
│ [LIVE]  │  │ [LIVE]  │  │ [LIVE]  │
└─────────┘  └─────────┘  └─────────┘
```

### Pagination Controls
```
┌──────────────────────────────────────────┐
│  [◄ Previous]  [1] [2] [3] [4] [5] [6]  │
│                     ↑                     │
│                  Current                  │
│                                [Next ►]   │
└──────────────────────────────────────────┘
```

## Interaction States

### Card States

#### Default (Not Selected)
```
┌─────────────────────────────┐
│ [Preview Animation]         │
│ Background Name             │
│ Description...              │
│ [deps]                      │
│ View Details →              │
└─────────────────────────────┘
```

#### Hover
```
┌─────────────────────────────┐ ← Scales to 102%
│ [Preview Animation]         │ ← Brighter
│ Background Name             │ ← Text turns teal
│ Description...              │
│ [deps]                      │
│ View Details →              │
└─────────────────────────────┘
```

#### Selected
```
╔═════════════════════════════╗ ← Teal ring
║ [Preview Animation]         ║
║ Background Name          ✓  ║ ← Checkmark
║ Description...              ║
║ [deps]                      ║
║ View Details →              ║
╚═════════════════════════════╝
```

## Loading States

### Preview Loading
```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │  Loading preview...     │ │ ← Pulsing
│ │                         │ │
│ └─────────────────────────┘ │
│ Background Name             │
└─────────────────────────────┘
```

### Preview Not Visible (Below Fold)
```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │      Preview            │ │ ← Placeholder
│ │                         │ │
│ └─────────────────────────┘ │
│ Background Name             │
└─────────────────────────────┘
```

## Responsive Behavior

### Desktop (lg: 3 columns)
```
[Card] [Card] [Card]
[Card] [Card] [Card]
```

### Tablet (md: 2 columns)
```
[Card] [Card]
[Card] [Card]
[Card] [Card]
```

### Mobile (1 column)
```
[Card]
[Card]
[Card]
[Card]
[Card]
[Card]
```

## Performance Visualization

### Intersection Observer in Action

```
┌─────────────────────────────────┐
│ Viewport                        │
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ ✓   │ │ ✓   │ │ ✓   │ ← Rendering
│ └─────┘ └─────┘ └─────┘        │
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ ✓   │ │ ✓   │ │ ✓   │ ← Rendering
│ └─────┘ └─────┘ └─────┘        │
├─────────────────────────────────┤ ← Fold
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ ✗   │ │ ✗   │ │ ✗   │ ← Not rendering
│ └─────┘ └─────┘ └─────┘        │
└─────────────────────────────────┘
```

## Animation Examples

### Aurora Preview
```
╔═══════════════════════════╗
║ ░░▒▒▓▓██████▓▓▒▒░░        ║
║   ░░▒▒▓▓████▓▓▒▒░░        ║ ← Flowing
║     ░░▒▒▓▓▓▓▒▒░░          ║    gradient
║       ░░▒▒▒▒░░            ║    animation
╚═══════════════════════════╝
```

### Silk Preview
```
╔═══════════════════════════╗
║ ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲         ║
║ ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱         ║ ← Silk-like
║ ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲         ║    flowing
║ ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱         ║    pattern
╚═══════════════════════════╝
```

### Particles Preview
```
╔═══════════════════════════╗
║  •    •      •    •       ║
║     •    •       •    •   ║ ← Moving
║ •       •   •        •    ║    particles
║    •  •        •  •       ║
╚═══════════════════════════╝
```

## User Flow

```
1. User clicks "React-Bits" type
   ↓
2. Info banner appears
   "Live animated previews • 31 backgrounds • Page 1 of 6"
   ↓
3. Grid loads with 6 cards
   ↓
4. Previews start animating as they scroll into view
   ↓
5. User scrolls down
   ↓
6. More previews load (Intersection Observer)
   ↓
7. User clicks pagination "2"
   ↓
8. New set of 6 backgrounds loads
   ↓
9. User clicks a card to select
   ↓
10. Card shows checkmark and teal ring
```

## Technical Flow

```
BackgroundStepEnhanced
    ↓
    Renders pagination controls
    ↓
    Maps paginatedBackgrounds
    ↓
    ReactBitsCard (showPreview=true)
        ↓
        Renders BackgroundPreview
            ↓
            Intersection Observer watches
            ↓
            When visible: Lazy load component
            ↓
            Suspense boundary
            ↓
            Component renders with default props
            ↓
            Animation starts
```

## Color Scheme

```
Selected Card:
- Ring: teal-500 (#14B8A6)
- Checkmark: teal-500
- Shadow: teal-500/20

Hover State:
- Text: teal-400 (#2DD4BF)
- Scale: 102%

Loading State:
- Background: gray-800 (#1F2937)
- Text: gray-400 (#9CA3AF)
- Animation: pulse

Pagination:
- Active: teal-600 (#0D9488)
- Inactive: glass-card with gray-300 text
```

## Accessibility

```
Preview Container:
- aria-label="Preview of Aurora background"

Card:
- role="button"
- tabIndex={0}
- aria-pressed={isSelected}
- Keyboard: Enter/Space to select

Pagination:
- aria-label="Go to page X"
- aria-current="page" for active page
- Disabled state for prev/next at boundaries
```
