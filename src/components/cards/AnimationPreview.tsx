import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { ReactBitsComponent } from '../../types';

interface AnimationPreviewProps {
  option: ReactBitsComponent;
}

// Import CSS files for animations that need them (19 total)
import '../../../react-bits/src/content/Animations/BlobCursor/BlobCursor.css';
import '../../../react-bits/src/content/Animations/Cubes/Cubes.css';
import '../../../react-bits/src/content/Animations/ElectricBorder/ElectricBorder.css';
import '../../../react-bits/src/content/Animations/GhostCursor/GhostCursor.css';
import '../../../react-bits/src/content/Animations/GlareHover/GlareHover.css';
import '../../../react-bits/src/content/Animations/GradualBlur/GradualBlur.css';
import '../../../react-bits/src/content/Animations/ImageTrail/ImageTrail.css';
import '../../../react-bits/src/content/Animations/LaserFlow/LaserFlow.css';
import '../../../react-bits/src/content/Animations/LogoLoop/LogoLoop.css';
import '../../../react-bits/src/content/Animations/MagnetLines/MagnetLines.css';
import '../../../react-bits/src/content/Animations/MetaBalls/MetaBalls.css';
import '../../../react-bits/src/content/Animations/MetallicPaint/MetallicPaint.css';
import '../../../react-bits/src/content/Animations/Noise/Noise.css';
import '../../../react-bits/src/content/Animations/PixelTrail/PixelTrail.css';
import '../../../react-bits/src/content/Animations/PixelTransition/PixelTransition.css';
import '../../../react-bits/src/content/Animations/Ribbons/Ribbons.css';
import '../../../react-bits/src/content/Animations/StarBorder/StarBorder.css';
import '../../../react-bits/src/content/Animations/StickerPeel/StickerPeel.css';
import '../../../react-bits/src/content/Animations/TargetCursor/TargetCursor.css';

// Lazy load all animation components
// @ts-ignore - React-bits components are JSX without type definitions
const animationComponents: Record<string, React.LazyExoticComponent<any>> = {
  // @ts-ignore
  'animated-content': lazy(() => import('../../../react-bits/src/content/Animations/AnimatedContent/AnimatedContent')),
  // @ts-ignore
  'blob-cursor': lazy(() => import('../../../react-bits/src/content/Animations/BlobCursor/BlobCursor')),
  // @ts-ignore
  'click-spark': lazy(() => import('../../../react-bits/src/content/Animations/ClickSpark/ClickSpark')),
  // @ts-ignore
  crosshair: lazy(() => import('../../../react-bits/src/content/Animations/Crosshair/Crosshair')),
  // @ts-ignore
  cubes: lazy(() => import('../../../react-bits/src/content/Animations/Cubes/Cubes')),
  // @ts-ignore
  'electric-border': lazy(() => import('../../../react-bits/src/content/Animations/ElectricBorder/ElectricBorder')),
  // @ts-ignore
  'fade-content': lazy(() => import('../../../react-bits/src/content/Animations/FadeContent/FadeContent')),
  // @ts-ignore
  'ghost-cursor': lazy(() => import('../../../react-bits/src/content/Animations/GhostCursor/GhostCursor')),
  // @ts-ignore
  'glare-hover': lazy(() => import('../../../react-bits/src/content/Animations/GlareHover/GlareHover')),
  // @ts-ignore
  'gradual-blur': lazy(() => import('../../../react-bits/src/content/Animations/GradualBlur/GradualBlur')),
  // @ts-ignore
  'image-trail': lazy(() => import('../../../react-bits/src/content/Animations/ImageTrail/ImageTrail')),
  // @ts-ignore
  'laser-flow': lazy(() => import('../../../react-bits/src/content/Animations/LaserFlow/LaserFlow')),
  // @ts-ignore
  'logo-loop': lazy(() => import('../../../react-bits/src/content/Animations/LogoLoop/LogoLoop')),
  // @ts-ignore
  magnet: lazy(() => import('../../../react-bits/src/content/Animations/Magnet/Magnet')),
  // @ts-ignore
  'magnet-lines': lazy(() => import('../../../react-bits/src/content/Animations/MagnetLines/MagnetLines')),
  // @ts-ignore
  'meta-balls': lazy(() => import('../../../react-bits/src/content/Animations/MetaBalls/MetaBalls')),
  // @ts-ignore
  'metallic-paint': lazy(() => import('../../../react-bits/src/content/Animations/MetallicPaint/MetallicPaint')),
  // @ts-ignore
  noise: lazy(() => import('../../../react-bits/src/content/Animations/Noise/Noise')),
  // @ts-ignore
  'pixel-trail': lazy(() => import('../../../react-bits/src/content/Animations/PixelTrail/PixelTrail')),
  // @ts-ignore
  'pixel-transition': lazy(() => import('../../../react-bits/src/content/Animations/PixelTransition/PixelTransition')),
  // @ts-ignore
  ribbons: lazy(() => import('../../../react-bits/src/content/Animations/Ribbons/Ribbons')),
  // @ts-ignore
  'shape-blur': lazy(() => import('../../../react-bits/src/content/Animations/ShapeBlur/ShapeBlur')),
  // @ts-ignore
  'splash-cursor': lazy(() => import('../../../react-bits/src/content/Animations/SplashCursor/SplashCursor')),
  // @ts-ignore
  'star-border': lazy(() => import('../../../react-bits/src/content/Animations/StarBorder/StarBorder')),
  // @ts-ignore
  'sticker-peel': lazy(() => import('../../../react-bits/src/content/Animations/StickerPeel/StickerPeel')),
  // @ts-ignore
  'target-cursor': lazy(() => import('../../../react-bits/src/content/Animations/TargetCursor/TargetCursor')),
};

// Default props for each animation (optimized for small preview)
const defaultProps: Record<string, any> = {
  // Add specific props if needed
};

/**
 * AnimationPreview renders a live animated preview of a react-bits animation component.
 * Uses Intersection Observer to only render when visible for performance.
 */
export const AnimationPreview: React.FC<AnimationPreviewProps> = ({ option }) => {
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

  const AnimationComponent = animationComponents[option.id];
  const hasPreview = Boolean(AnimationComponent);

  return (
    <div
      ref={containerRef}
      className="w-full h-40 rounded-lg overflow-hidden bg-gray-900 relative"
      aria-label={`Preview of ${option.title} animation`}
    >
      {!hasPreview ? (
        // No preview available for this animation
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
            <AnimationComponent {...(defaultProps[option.id] || {})} />
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

export default AnimationPreview;
