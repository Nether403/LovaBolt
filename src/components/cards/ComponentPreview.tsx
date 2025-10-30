import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { ReactBitsComponent } from '../../types';

interface ComponentPreviewProps {
  option: ReactBitsComponent;
}

// Import CSS files for components that need them (33 total)
import '../../../react-bits/src/content/Components/AnimatedList/AnimatedList.css';
import '../../../react-bits/src/content/Components/BounceCards/BounceCards.css';
import '../../../react-bits/src/content/Components/BubbleMenu/BubbleMenu.css';
import '../../../react-bits/src/content/Components/CardNav/CardNav.css';
import '../../../react-bits/src/content/Components/CardSwap/CardSwap.css';
import '../../../react-bits/src/content/Components/Carousel/Carousel.css';
import '../../../react-bits/src/content/Components/ChromaGrid/ChromaGrid.css';
import '../../../react-bits/src/content/Components/CircularGallery/CircularGallery.css';
import '../../../react-bits/src/content/Components/Counter/Counter.css';
import '../../../react-bits/src/content/Components/DecayCard/DecayCard.css';
import '../../../react-bits/src/content/Components/Dock/Dock.css';
import '../../../react-bits/src/content/Components/DomeGallery/DomeGallery.css';
import '../../../react-bits/src/content/Components/ElasticSlider/ElasticSlider.css';
import '../../../react-bits/src/content/Components/FlowingMenu/FlowingMenu.css';
import '../../../react-bits/src/content/Components/FlyingPosters/FlyingPosters.css';
import '../../../react-bits/src/content/Components/Folder/Folder.css';
import '../../../react-bits/src/content/Components/GlassIcons/GlassIcons.css';
import '../../../react-bits/src/content/Components/GlassSurface/GlassSurface.css';
import '../../../react-bits/src/content/Components/GooeyNav/GooeyNav.css';
import '../../../react-bits/src/content/Components/InfiniteMenu/InfiniteMenu.css';
import '../../../react-bits/src/content/Components/InfiniteScroll/InfiniteScroll.css';
import '../../../react-bits/src/content/Components/Lanyard/Lanyard.css';
import '../../../react-bits/src/content/Components/MagicBento/MagicBento.css';
import '../../../react-bits/src/content/Components/Masonry/Masonry.css';
import '../../../react-bits/src/content/Components/PillNav/PillNav.css';
import '../../../react-bits/src/content/Components/PixelCard/PixelCard.css';
import '../../../react-bits/src/content/Components/ProfileCard/ProfileCard.css';
import '../../../react-bits/src/content/Components/ScrollStack/ScrollStack.css';
import '../../../react-bits/src/content/Components/SpotlightCard/SpotlightCard.css';
import '../../../react-bits/src/content/Components/Stack/Stack.css';
import '../../../react-bits/src/content/Components/StaggeredMenu/StaggeredMenu.css';
import '../../../react-bits/src/content/Components/Stepper/Stepper.css';
import '../../../react-bits/src/content/Components/TiltedCard/TiltedCard.css';

// Lazy load all component components
// @ts-ignore - React-bits components are JSX without type definitions
const componentComponents: Record<string, React.LazyExoticComponent<any>> = {
  // @ts-ignore
  'animated-list': lazy(() => import('../../../react-bits/src/content/Components/AnimatedList/AnimatedList')),
  // @ts-ignore
  'bounce-cards': lazy(() => import('../../../react-bits/src/content/Components/BounceCards/BounceCards')),
  // @ts-ignore
  'bubble-menu': lazy(() => import('../../../react-bits/src/content/Components/BubbleMenu/BubbleMenu')),
  // @ts-ignore
  'card-nav': lazy(() => import('../../../react-bits/src/content/Components/CardNav/CardNav')),
  // @ts-ignore
  'card-swap': lazy(() => import('../../../react-bits/src/content/Components/CardSwap/CardSwap')),
  // @ts-ignore
  carousel: lazy(() => import('../../../react-bits/src/content/Components/Carousel/Carousel')),
  // @ts-ignore
  'chroma-grid': lazy(() => import('../../../react-bits/src/content/Components/ChromaGrid/ChromaGrid')),
  // @ts-ignore
  'circular-gallery': lazy(() => import('../../../react-bits/src/content/Components/CircularGallery/CircularGallery')),
  // @ts-ignore
  counter: lazy(() => import('../../../react-bits/src/content/Components/Counter/Counter')),
  // @ts-ignore
  'decay-card': lazy(() => import('../../../react-bits/src/content/Components/DecayCard/DecayCard')),
  // @ts-ignore
  dock: lazy(() => import('../../../react-bits/src/content/Components/Dock/Dock')),
  // @ts-ignore
  'dome-gallery': lazy(() => import('../../../react-bits/src/content/Components/DomeGallery/DomeGallery')),
  // @ts-ignore
  'elastic-slider': lazy(() => import('../../../react-bits/src/content/Components/ElasticSlider/ElasticSlider')),
  // @ts-ignore
  'flowing-menu': lazy(() => import('../../../react-bits/src/content/Components/FlowingMenu/FlowingMenu')),
  // @ts-ignore
  'fluid-glass': lazy(() => import('../../../react-bits/src/content/Components/FluidGlass/FluidGlass')),
  // @ts-ignore
  'flying-posters': lazy(() => import('../../../react-bits/src/content/Components/FlyingPosters/FlyingPosters')),
  // @ts-ignore
  folder: lazy(() => import('../../../react-bits/src/content/Components/Folder/Folder')),
  // @ts-ignore
  'glass-icons': lazy(() => import('../../../react-bits/src/content/Components/GlassIcons/GlassIcons')),
  // @ts-ignore
  'glass-surface': lazy(() => import('../../../react-bits/src/content/Components/GlassSurface/GlassSurface')),
  // @ts-ignore
  'gooey-nav': lazy(() => import('../../../react-bits/src/content/Components/GooeyNav/GooeyNav')),
  // @ts-ignore
  'infinite-menu': lazy(() => import('../../../react-bits/src/content/Components/InfiniteMenu/InfiniteMenu')),
  // @ts-ignore
  'infinite-scroll': lazy(() => import('../../../react-bits/src/content/Components/InfiniteScroll/InfiniteScroll')),
  // @ts-ignore
  lanyard: lazy(() => import('../../../react-bits/src/content/Components/Lanyard/Lanyard')),
  // @ts-ignore
  'magic-bento': lazy(() => import('../../../react-bits/src/content/Components/MagicBento/MagicBento')),
  // @ts-ignore
  masonry: lazy(() => import('../../../react-bits/src/content/Components/Masonry/Masonry')),
  // @ts-ignore
  'model-viewer': lazy(() => import('../../../react-bits/src/content/Components/ModelViewer/ModelViewer')),
  // @ts-ignore
  'pill-nav': lazy(() => import('../../../react-bits/src/content/Components/PillNav/PillNav')),
  // @ts-ignore
  'pixel-card': lazy(() => import('../../../react-bits/src/content/Components/PixelCard/PixelCard')),
  // @ts-ignore
  'profile-card': lazy(() => import('../../../react-bits/src/content/Components/ProfileCard/ProfileCard')),
  // @ts-ignore
  'scroll-stack': lazy(() => import('../../../react-bits/src/content/Components/ScrollStack/ScrollStack')),
  // @ts-ignore
  'spotlight-card': lazy(() => import('../../../react-bits/src/content/Components/SpotlightCard/SpotlightCard')),
  // @ts-ignore
  stack: lazy(() => import('../../../react-bits/src/content/Components/Stack/Stack')),
  // @ts-ignore
  'staggered-menu': lazy(() => import('../../../react-bits/src/content/Components/StaggeredMenu/StaggeredMenu')),
  // @ts-ignore
  stepper: lazy(() => import('../../../react-bits/src/content/Components/Stepper/Stepper')),
  // @ts-ignore
  'tilted-card': lazy(() => import('../../../react-bits/src/content/Components/TiltedCard/TiltedCard')),
};

// Default props for each component (optimized for small preview)
const defaultProps: Record<string, any> = {
  dock: { items: [] },
  carousel: { items: [] },
  // Add more as needed - most components work with defaults
};

/**
 * ComponentPreview renders a live animated preview of a react-bits UI component.
 * Uses Intersection Observer to only render when visible for performance.
 */
export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ option }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px', // Start loading slightly before visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const ComponentComponent = componentComponents[option.id];
  const hasPreview = Boolean(ComponentComponent);

  return (
    <div
      ref={containerRef}
      className="w-full h-40 rounded-lg overflow-hidden bg-gray-900 relative"
      aria-label={`Preview of ${option.title} component`}
    >
      {!hasPreview ? (
        // No preview available for this component
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="text-gray-500 text-xs">Preview not available</div>
          </div>
        </div>
      ) : isVisible ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="animate-pulse text-gray-400 text-sm">Loading preview...</div>
            </div>
          }
        >
          <div className="w-full h-full relative flex items-center justify-center p-4">
            <ComponentComponent {...(defaultProps[option.id] || {})} />
            {/* Overlay to prevent interaction */}
            <div className="absolute inset-0 pointer-events-none" />
          </div>
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="text-gray-500 text-sm">Scroll to load</div>
        </div>
      )}
    </div>
  );
};

export default ComponentPreview;
