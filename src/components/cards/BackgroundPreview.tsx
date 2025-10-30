import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { ReactBitsComponent } from '../../types';

interface BackgroundPreviewProps {
  option: ReactBitsComponent;
}

// Import CSS files for backgrounds that need them
import '../../../react-bits/src/content/Backgrounds/Aurora/Aurora.css';
import '../../../react-bits/src/content/Backgrounds/Balatro/Balatro.css';
import '../../../react-bits/src/content/Backgrounds/Beams/Beams.css';
import '../../../react-bits/src/content/Backgrounds/ColorBends/ColorBends.css';
import '../../../react-bits/src/content/Backgrounds/DarkVeil/DarkVeil.css';
import '../../../react-bits/src/content/Backgrounds/Dither/Dither.css';
import '../../../react-bits/src/content/Backgrounds/DotGrid/DotGrid.css';
import '../../../react-bits/src/content/Backgrounds/FaultyTerminal/FaultyTerminal.css';
import '../../../react-bits/src/content/Backgrounds/Galaxy/Galaxy.css';
import '../../../react-bits/src/content/Backgrounds/GradientBlinds/GradientBlinds.css';
import '../../../react-bits/src/content/Backgrounds/GridDistortion/GridDistortion.css';
import '../../../react-bits/src/content/Backgrounds/GridMotion/GridMotion.css';
import '../../../react-bits/src/content/Backgrounds/Hyperspeed/Hyperspeed.css';
import '../../../react-bits/src/content/Backgrounds/Iridescence/Iridescence.css';
import '../../../react-bits/src/content/Backgrounds/Lightning/Lightning.css';
import '../../../react-bits/src/content/Backgrounds/LightRays/LightRays.css';
import '../../../react-bits/src/content/Backgrounds/LiquidChrome/LiquidChrome.css';
import '../../../react-bits/src/content/Backgrounds/LiquidEther/LiquidEther.css';
import '../../../react-bits/src/content/Backgrounds/Orb/Orb.css';
import '../../../react-bits/src/content/Backgrounds/Particles/Particles.css';
import '../../../react-bits/src/content/Backgrounds/PixelBlast/PixelBlast.css';
import '../../../react-bits/src/content/Backgrounds/Plasma/Plasma.css';
import '../../../react-bits/src/content/Backgrounds/Prism/Prism.css';
import '../../../react-bits/src/content/Backgrounds/PrismaticBurst/PrismaticBurst.css';
import '../../../react-bits/src/content/Backgrounds/RippleGrid/RippleGrid.css';
import '../../../react-bits/src/content/Backgrounds/Squares/Squares.css';
import '../../../react-bits/src/content/Backgrounds/Threads/Threads.css';
import '../../../react-bits/src/content/Backgrounds/Waves/Waves.css';

// Helper to safely load background components
const safeLoad = (importFn: () => Promise<any>, name: string) => {
  return lazy(() =>
    importFn()
      .then((module) => {
        // Ensure we have a default export
        if (!module.default) {
          console.warn(`${name} has no default export`);
          return { default: () => <div>No preview</div> };
        }
        return module;
      })
      .catch((err) => {
        console.error(`Failed to load ${name}:`, err);
        return { default: () => <div>Load error</div> };
      })
  );
};

// Lazy load all background components
// @ts-ignore - React-bits components are JSX without type definitions
const backgroundComponents: Record<string, React.LazyExoticComponent<any>> = {
  // @ts-ignore
  aurora: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Aurora/Aurora'), 'Aurora'),
  // @ts-ignore
  balatro: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Balatro/Balatro'), 'Balatro'),
  // @ts-ignore
  ballpit: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Ballpit/Ballpit'), 'Ballpit'),
  // @ts-ignore
  beams: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Beams/Beams'), 'Beams'),
  // @ts-ignore
  'color-bends': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/ColorBends/ColorBends'), 'ColorBends'),
  // @ts-ignore
  'dark-veil': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/DarkVeil/DarkVeil'), 'DarkVeil'),
  // @ts-ignore
  dither: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Dither/Dither'), 'Dither'),
  // @ts-ignore
  'dot-grid': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/DotGrid/DotGrid'), 'DotGrid'),
  // @ts-ignore
  'faulty-terminal': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/FaultyTerminal/FaultyTerminal'), 'FaultyTerminal'),
  // @ts-ignore
  galaxy: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Galaxy/Galaxy'), 'Galaxy'),
  // @ts-ignore
  'gradient-blinds': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/GradientBlinds/GradientBlinds'), 'GradientBlinds'),
  // @ts-ignore
  'grid-distortion': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/GridDistortion/GridDistortion'), 'GridDistortion'),
  // @ts-ignore
  'grid-motion': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/GridMotion/GridMotion'), 'GridMotion'),
  // @ts-ignore
  hyperspeed: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Hyperspeed/Hyperspeed'), 'Hyperspeed'),
  // @ts-ignore
  iridescence: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Iridescence/Iridescence'), 'Iridescence'),
  // @ts-ignore
  'letter-glitch': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/LetterGlitch/LetterGlitch'), 'LetterGlitch'),
  // @ts-ignore
  lightning: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Lightning/Lightning'), 'Lightning'),
  // @ts-ignore
  'light-rays': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/LightRays/LightRays'), 'LightRays'),
  // @ts-ignore
  'liquid-chrome': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/LiquidChrome/LiquidChrome'), 'LiquidChrome'),
  // @ts-ignore
  'liquid-ether': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/LiquidEther/LiquidEther'), 'LiquidEther'),
  // @ts-ignore
  orb: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Orb/Orb'), 'Orb'),
  // @ts-ignore
  particles: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Particles/Particles'), 'Particles'),
  // @ts-ignore
  'pixel-blast': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/PixelBlast/PixelBlast'), 'PixelBlast'),
  // @ts-ignore
  plasma: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Plasma/Plasma'), 'Plasma'),
  // @ts-ignore
  prism: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Prism/Prism'), 'Prism'),
  // @ts-ignore
  'prismatic-burst': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/PrismaticBurst/PrismaticBurst'), 'PrismaticBurst'),
  // @ts-ignore
  'ripple-grid': safeLoad(() => import('../../../react-bits/src/content/Backgrounds/RippleGrid/RippleGrid'), 'RippleGrid'),
  // @ts-ignore
  silk: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Silk/Silk'), 'Silk'),
  // @ts-ignore
  squares: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Squares/Squares'), 'Squares'),
  // @ts-ignore
  threads: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Threads/Threads'), 'Threads'),
  // @ts-ignore
  waves: safeLoad(() => import('../../../react-bits/src/content/Backgrounds/Waves/Waves'), 'Waves'),
};

// Default props for each background (optimized for small preview)
const defaultProps: Record<string, any> = {
  aurora: { speed: 1, blend: 0.5, amplitude: 1.0 },
  silk: { speed: 5, scale: 1, noiseIntensity: 1.5 },
  // Add more as needed - most components work with defaults
};

/**
 * Error boundary for individual preview components
 */
class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Preview error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * BackgroundPreview renders a live animated preview of a react-bits background component.
 * Uses Intersection Observer to only render when visible for performance.
 */
export const BackgroundPreview: React.FC<BackgroundPreviewProps> = ({ option }) => {
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

  const BackgroundComponent = backgroundComponents[option.id];
  const hasPreview = Boolean(BackgroundComponent);

  const errorFallback = (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900/20 to-gray-900">
      <div className="text-center p-4">
        <svg className="w-10 h-10 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="text-red-400 text-xs">Preview error</div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-40 rounded-lg overflow-hidden bg-gray-900 relative"
      aria-label={`Preview of ${option.title} background`}
    >
      {!hasPreview ? (
        // No preview available
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center p-4">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-gray-500 text-xs">Preview not available</div>
          </div>
        </div>
      ) : isVisible ? (
        <PreviewErrorBoundary fallback={errorFallback}>
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="animate-pulse text-gray-400 text-sm">Loading preview...</div>
              </div>
            }
          >
            <div className="w-full h-full relative" style={{ isolation: 'isolate' }}>
              <BackgroundComponent {...(defaultProps[option.id] || {})} />
              {/* Overlay to prevent interaction */}
              <div className="absolute inset-0 pointer-events-none bg-transparent" />
            </div>
          </Suspense>
        </PreviewErrorBoundary>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="text-gray-500 text-sm">Scroll to load</div>
        </div>
      )}
    </div>
  );
};

export default BackgroundPreview;
