# Background Preview Implementation

## Overview

Added live animated previews for React-Bits background components in the Background selection step (Step 8) of the wizard.

## Features Implemented

### 1. Live Animated Previews
- Each background card now displays a real-time animated preview of the background effect
- Previews are rendered using the actual React-Bits components from the `react-bits/` folder
- Preview size: 160px height (h-40) to show the effect without overwhelming the card

### 2. Performance Optimization
- **Intersection Observer**: Previews only render when visible in the viewport
- **Lazy Loading**: Background components are dynamically imported only when needed
- **Suspense Boundaries**: Graceful loading states while components load
- **Root Margin**: 50px buffer to start loading slightly before scrolling into view

### 3. Pagination
- **6 items per page** to prevent performance issues from rendering too many animations
- Clean pagination UI with numbered page buttons
- Previous/Next navigation buttons
- Page indicator showing "Page X of Y"
- Automatic reset to page 1 when switching background types

### 4. User Experience
- Info banner showing total backgrounds available and current page
- Loading placeholder while preview loads
- Smooth transitions and animations
- Maintains all existing card functionality (selection, view details, etc.)

## Technical Implementation

### New Components

#### `BackgroundPreview.tsx`
- Handles rendering of individual background previews
- Uses Intersection Observer for performance
- Lazy loads background components
- Provides fallback UI during loading

#### Updated `ReactBitsCard.tsx`
- Added `showPreview` prop to conditionally show previews
- Preview renders at top of card (negative margins to extend to edges)
- Only shows for background category components

#### Updated `BackgroundStepEnhanced.tsx`
- Added pagination state and logic
- Displays 6 backgrounds per page
- Info banner with context
- Pagination controls with page numbers

### Dependencies Added

```bash
npm install ogl three @react-three/fiber @react-three/drei gsap motion --legacy-peer-deps
```

These are required by various React-Bits background components:
- `ogl`: WebGL library (used by Aurora, Silk, etc.)
- `three`: 3D graphics library
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Useful helpers for React Three Fiber
- `gsap`: Animation library
- `motion`: Framer Motion for animations

## File Structure

```
src/
├── components/
│   ├── cards/
│   │   ├── BackgroundPreview.tsx (NEW)
│   │   └── ReactBitsCard.tsx (UPDATED)
│   └── steps/
│       └── BackgroundStepEnhanced.tsx (UPDATED)
```

## Usage

The preview feature is automatically enabled for the React-Bits background type:

1. Navigate to Step 8 (Background)
2. Select "React-Bits" background type
3. Previews load automatically as you scroll
4. Use pagination to browse all 31 backgrounds (6 per page)

## Performance Considerations

### Why 6 per page?
- Balances user experience with performance
- Prevents rendering 31 simultaneous WebGL/Canvas animations
- Keeps memory usage reasonable
- Provides good visual variety per page

### Intersection Observer Benefits
- Only visible previews are rendered
- Reduces CPU/GPU usage
- Improves battery life on mobile devices
- Smooth scrolling performance

### Lazy Loading Benefits
- Smaller initial bundle size
- Faster page load
- Components load on-demand
- Better code splitting

## Browser Compatibility

Previews work in all modern browsers that support:
- WebGL (for OGL-based backgrounds)
- Canvas API (for most effects)
- Intersection Observer API (polyfill available if needed)

## Future Enhancements

Potential improvements:
1. Add preview quality settings (low/medium/high)
2. Pause animations when tab is not active
3. Add "Play/Pause" button for individual previews
4. Cache loaded components for faster navigation
5. Add search/filter functionality
6. Thumbnail mode vs. full preview mode toggle

## Troubleshooting

### Preview not loading
- Check browser console for errors
- Ensure dependencies are installed
- Verify react-bits folder is present

### Performance issues
- Reduce items per page (change `ITEMS_PER_PAGE` constant)
- Disable previews on low-end devices
- Check for memory leaks in browser DevTools

### TypeScript errors
- `@ts-ignore` comments are used for JSX imports without type definitions
- This is expected as react-bits components are JavaScript

## Testing

To test the implementation:

1. Start dev server: `npm run dev`
2. Navigate to Background step
3. Select "React-Bits" type
4. Verify previews load and animate
5. Test pagination navigation
6. Check performance in DevTools
7. Test on different viewport sizes

## Notes

- CSS files are imported for backgrounds that need them (Aurora, Silk)
- Default props are provided for optimal preview rendering
- Previews are non-interactive (overlay prevents clicks)
- Original card functionality (selection, details) remains unchanged
