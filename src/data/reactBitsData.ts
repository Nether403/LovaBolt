/**
 * React-Bits Component Data
 * 
 * This file contains all 93 react-bits components organized into three categories:
 * - Backgrounds (31): Full-page background effects with single selection
 * - Components (37): UI components for interface elements with multiple selection
 * - Animations (25): Animation and interaction effects with multiple selection
 * 
 * Each component includes:
 * - id: Unique identifier (kebab-case)
 * - name: Component name for imports (PascalCase)
 * - title: Display title for UI
 * - description: User-facing description
 * - category: Component category
 * - dependencies: Required NPM packages
 * - cliCommand: Full npx shadcn installation command
 * - hasCustomization: Whether component accepts props
 * - codeSnippet: Optional usage example
 * 
 * @module reactBitsData
 * @see {@link https://reactbits.dev} React-Bits Documentation
 */

import { BackgroundOption, ComponentOption, AnimationOption } from '../types';

/**
 * Background Options (31 total)
 * 
 * Full-page background effects that enhance visual appeal.
 * Single selection only - user can choose one background per project.
 * 
 * Categories include:
 * - Gradient effects (Aurora, Background Gradient)
 * - Pattern backgrounds (Grid, Dots, Retro Grid)
 * - Particle systems (Particles, Meteors, Shooting Stars)
 * - Light effects (Spotlight, Beams, Lamp)
 * - 3D effects (Globe, Boxes)
 * - Animated effects (Ripple, Vortex, Waves)
 * 
 * @example
 * ```tsx
 * import { Aurora } from '@/components/Aurora'
 * 
 * <Aurora>
 *   <YourContent />
 * </Aurora>
 * ```
 */
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
  {
    id: 'animated-grid-pattern',
    name: 'AnimatedGridPattern',
    title: 'Animated Grid Pattern',
    description: 'Dynamic grid pattern with animated lines and intersections.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AnimatedGridPattern-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'dot-pattern',
    name: 'DotPattern',
    title: 'Dot Pattern',
    description: 'Subtle dot pattern background for visual texture.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/DotPattern-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'grid-pattern',
    name: 'GridPattern',
    title: 'Grid Pattern',
    description: 'Clean grid pattern background for structured layouts.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/GridPattern-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'retro-grid',
    name: 'RetroGrid',
    title: 'Retro Grid',
    description: 'Nostalgic retro-style grid with perspective effect.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/RetroGrid-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'ripple',
    name: 'Ripple',
    title: 'Ripple',
    description: 'Animated ripple effect emanating from center.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Ripple-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'particles',
    name: 'Particles',
    title: 'Particles',
    description: 'Floating particle system with interactive mouse effects.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Particles-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'meteors',
    name: 'Meteors',
    title: 'Meteors',
    description: 'Shooting star meteors across the background.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Meteors-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    title: 'Spotlight',
    description: 'Dynamic spotlight effect following cursor movement.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Spotlight-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'background-beams',
    name: 'BackgroundBeams',
    title: 'Background Beams',
    description: 'Animated light beams creating depth and motion.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BackgroundBeams-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'background-gradient',
    name: 'BackgroundGradient',
    title: 'Background Gradient',
    description: 'Smooth animated gradient background with color transitions.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BackgroundGradient-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'background-lines',
    name: 'BackgroundLines',
    title: 'Background Lines',
    description: 'Animated line patterns creating visual interest.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BackgroundLines-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'wavy-background',
    name: 'WavyBackground',
    title: 'Wavy Background',
    description: 'Flowing wave patterns with smooth animations.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/WavyBackground-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'moving-border',
    name: 'MovingBorder',
    title: 'Moving Border',
    description: 'Animated border effect with gradient motion.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/MovingBorder-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'lamp',
    name: 'Lamp',
    title: 'Lamp',
    description: 'Dramatic lamp lighting effect from above.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Lamp-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'vortex',
    name: 'Vortex',
    title: 'Vortex',
    description: 'Swirling vortex effect with particle system.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Vortex-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'shooting-stars',
    name: 'ShootingStars',
    title: 'Shooting Stars',
    description: 'Night sky with shooting stars animation.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ShootingStars-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'stars-background',
    name: 'StarsBackground',
    title: 'Stars Background',
    description: 'Starfield background with twinkling stars.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/StarsBackground-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'globe',
    name: 'Globe',
    title: 'Globe',
    description: '3D rotating globe with connection lines.',
    category: 'backgrounds',
    dependencies: ['three', 'cobe'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Globe-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'boxes',
    name: 'Boxes',
    title: 'Boxes',
    description: 'Animated 3D boxes creating depth effect.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Boxes-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'sparkles',
    name: 'Sparkles',
    title: 'Sparkles',
    description: 'Magical sparkle particles floating across screen.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Sparkles-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'floating-navbar',
    name: 'FloatingNavbar',
    title: 'Floating Navbar',
    description: 'Floating navigation bar with blur effect.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/FloatingNavbar-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'canvas-reveal',
    name: 'CanvasReveal',
    title: 'Canvas Reveal',
    description: 'Canvas-based reveal animation effect.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/CanvasReveal-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'background-boxes',
    name: 'BackgroundBoxes',
    title: 'Background Boxes',
    description: 'Grid of animated boxes in background.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BackgroundBoxes-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'animated-beam',
    name: 'AnimatedBeam',
    title: 'Animated Beam',
    description: 'Animated light beam connecting elements.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AnimatedBeam-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'hero-highlight',
    name: 'HeroHighlight',
    title: 'Hero Highlight',
    description: 'Hero section with animated highlight effect.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/HeroHighlight-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'tracing-beam',
    name: 'TracingBeam',
    title: 'Tracing Beam',
    description: 'Vertical beam that traces content scroll.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/TracingBeam-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'lens',
    name: 'Lens',
    title: 'Lens',
    description: 'Magnifying lens effect on hover.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Lens-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'background-gradient-animation',
    name: 'BackgroundGradientAnimation',
    title: 'Background Gradient Animation',
    description: 'Continuously animated gradient background.',
    category: 'backgrounds',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BackgroundGradientAnimation-TS-TW.json"',
    hasCustomization: false,
  },
  {
    id: 'macbook-scroll',
    name: 'MacbookScroll',
    title: 'Macbook Scroll',
    description: 'MacBook mockup with scroll reveal animation.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/MacbookScroll-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'container-scroll',
    name: 'ContainerScroll',
    title: 'Container Scroll',
    description: 'Container with parallax scroll animation.',
    category: 'backgrounds',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ContainerScroll-TS-TW.json"',
    hasCustomization: true,
  },
];

/**
 * Component Options (37 total)
 * 
 * UI components for building feature-rich interfaces.
 * Multiple selection allowed - users can select as many as needed.
 * 
 * Categories include:
 * - Navigation (Carousel, Tabs, Sidebar, Navbar)
 * - Content Display (Cards, Accordion, Timeline, Bento Grid)
 * - Interactive Elements (Buttons, Tooltips, Modals)
 * - Text Effects (Typewriter, Flip Words, Text Generate)
 * - Scroll Effects (Parallax, Sticky Scroll, Infinite Scroll)
 * - Advanced Components (Compare, Globe, 3D Card)
 * 
 * Most components require 'motion' (Framer Motion) dependency.
 * 
 * @example
 * ```tsx
 * import { Carousel } from '@/components/Carousel'
 * 
 * <Carousel>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 *   <div>Slide 3</div>
 * </Carousel>
 * ```
 */
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
  {
    id: 'accordion',
    name: 'Accordion',
    title: 'Accordion',
    description: 'Expandable accordion component with smooth animations.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Accordion-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    title: 'Tabs',
    description: 'Tabbed interface with animated indicator.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Tabs-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'card',
    name: 'Card',
    title: 'Card',
    description: 'Versatile card component with hover effects.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Card-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: '3d-card',
    name: 'ThreeDCard',
    title: '3D Card',
    description: 'Card with 3D tilt effect on mouse movement.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/3DCard-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'hover-card',
    name: 'HoverCard',
    title: 'Hover Card',
    description: 'Card with advanced hover animations and effects.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/HoverCard-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'bento-grid',
    name: 'BentoGrid',
    title: 'Bento Grid',
    description: 'Modern bento-style grid layout for content.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BentoGrid-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'infinite-scroll',
    name: 'InfiniteScroll',
    title: 'Infinite Scroll',
    description: 'Infinite scrolling marquee animation.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/InfiniteScroll-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'timeline',
    name: 'Timeline',
    title: 'Timeline',
    description: 'Vertical timeline component with animations.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Timeline-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'parallax-scroll',
    name: 'ParallaxScroll',
    title: 'Parallax Scroll',
    description: 'Image gallery with parallax scroll effect.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ParallaxScroll-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'sticky-scroll',
    name: 'StickyScroll',
    title: 'Sticky Scroll',
    description: 'Content that sticks during scroll with reveals.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/StickyScroll-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'compare',
    name: 'Compare',
    title: 'Compare',
    description: 'Before/after image comparison slider.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Compare-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'flip-words',
    name: 'FlipWords',
    title: 'Flip Words',
    description: 'Animated word rotation with flip effect.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/FlipWords-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    title: 'Typewriter',
    description: 'Typewriter text animation effect.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Typewriter-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'text-generate',
    name: 'TextGenerate',
    title: 'Text Generate',
    description: 'Text generation animation effect.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/TextGenerate-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'animated-tooltip',
    name: 'AnimatedTooltip',
    title: 'Animated Tooltip',
    description: 'Tooltip with smooth animations.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AnimatedTooltip-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'hover-border-gradient',
    name: 'HoverBorderGradient',
    title: 'Hover Border Gradient',
    description: 'Button with animated gradient border on hover.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/HoverBorderGradient-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'shimmer-button',
    name: 'ShimmerButton',
    title: 'Shimmer Button',
    description: 'Button with shimmer animation effect.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ShimmerButton-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'moving-button',
    name: 'MovingButton',
    title: 'Moving Button',
    description: 'Button with moving border animation.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/MovingButton-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'glowing-stars',
    name: 'GlowingStars',
    title: 'Glowing Stars',
    description: 'Card with glowing star decorations.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/GlowingStars-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'evervault-card',
    name: 'EvervaultCard',
    title: 'Evervault Card',
    description: 'Card with encrypted text reveal effect.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/EvervaultCard-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'focus-cards',
    name: 'FocusCards',
    title: 'Focus Cards',
    description: 'Cards that expand on focus with blur effect.',
    category: 'components',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/FocusCards-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'direction-aware-hover',
    name: 'DirectionAwareHover',
    title: 'Direction Aware Hover',
    description: 'Card with direction-aware hover animations.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/DirectionAwareHover-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'animated-pin',
    name: 'AnimatedPin',
    title: 'Animated Pin',
    description: 'Pinterest-style animated pin card.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AnimatedPin-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'apple-cards-carousel',
    name: 'AppleCardsCarousel',
    title: 'Apple Cards Carousel',
    description: 'Apple-style cards carousel with smooth transitions.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AppleCardsCarousel-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'layout-grid',
    name: 'LayoutGrid',
    title: 'Layout Grid',
    description: 'Expandable grid layout with animations.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/LayoutGrid-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'expandable-card',
    name: 'ExpandableCard',
    title: 'Expandable Card',
    description: 'Card that expands to full screen on click.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ExpandableCard-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'animated-modal',
    name: 'AnimatedModal',
    title: 'Animated Modal',
    description: 'Modal with smooth entrance animations.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AnimatedModal-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    title: 'Sidebar',
    description: 'Collapsible sidebar navigation component.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Sidebar-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'navbar-menu',
    name: 'NavbarMenu',
    title: 'Navbar Menu',
    description: 'Animated navigation menu with dropdown.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/NavbarMenu-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'multi-step-loader',
    name: 'MultiStepLoader',
    title: 'Multi Step Loader',
    description: 'Multi-step loading animation component.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/MultiStepLoader-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'card-stack',
    name: 'CardStack',
    title: 'Card Stack',
    description: 'Stacked cards with swipe interactions.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/CardStack-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'animated-list',
    name: 'AnimatedList',
    title: 'Animated List',
    description: 'List with staggered entrance animations.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AnimatedList-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'cover',
    name: 'Cover',
    title: 'Cover',
    description: 'Full-screen cover component with reveal animation.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Cover-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'animated-testimonials',
    name: 'AnimatedTestimonials',
    title: 'Animated Testimonials',
    description: 'Testimonial carousel with smooth animations.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/AnimatedTestimonials-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'following-pointer',
    name: 'FollowingPointer',
    title: 'Following Pointer',
    description: 'Custom cursor that follows pointer with trail.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/FollowingPointer-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'images-slider',
    name: 'ImagesSlider',
    title: 'Images Slider',
    description: 'Full-screen image slider with transitions.',
    category: 'components',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ImagesSlider-TS-TW.json"',
    hasCustomization: true,
  },
];

/**
 * Animation Options (25 total)
 * 
 * Animation and micro-interaction effects to enhance user experience.
 * Multiple selection allowed - users can combine multiple animations.
 * 
 * Categories include:
 * - Cursor Effects (Blob Cursor, Following Pointer)
 * - Entrance Animations (Fade In, Slide In, Scale In, Rotate In, Bounce In)
 * - Scroll Animations (Scroll Reveal, Parallax, Text Reveal)
 * - Hover Effects (Hover Lift, Hover Glow, Hover Shine, Magnetic Button)
 * - Loading States (Loading Spinner, Skeleton Loader, Pulse)
 * - Transitions (Page Transition, Morph)
 * - Attention Effects (Shake, Wiggle, Flip)
 * - Advanced Effects (Stagger Children, Zoom In, Blur In, Gradient Text)
 * 
 * Most animations require 'motion' (Framer Motion) dependency.
 * Some advanced effects require 'gsap' for complex animations.
 * 
 * @example
 * ```tsx
 * import { BlobCursor } from '@/components/BlobCursor'
 * import { FadeIn } from '@/components/FadeIn'
 * 
 * <BlobCursor />
 * 
 * <FadeIn>
 *   <YourContent />
 * </FadeIn>
 * ```
 */
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
  {
    id: 'magnetic-button',
    name: 'MagneticButton',
    title: 'Magnetic Button',
    description: 'Button with magnetic attraction effect to cursor.',
    category: 'animations',
    dependencies: ['gsap'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/MagneticButton-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'text-reveal',
    name: 'TextReveal',
    title: 'Text Reveal',
    description: 'Text reveal animation on scroll.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/TextReveal-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'fade-in',
    name: 'FadeIn',
    title: 'Fade In',
    description: 'Smooth fade-in animation for elements.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/FadeIn-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'slide-in',
    name: 'SlideIn',
    title: 'Slide In',
    description: 'Slide-in animation from various directions.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/SlideIn-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'scale-in',
    name: 'ScaleIn',
    title: 'Scale In',
    description: 'Scale-in animation with spring physics.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ScaleIn-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'rotate-in',
    name: 'RotateIn',
    title: 'Rotate In',
    description: 'Rotation entrance animation.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/RotateIn-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'bounce-in',
    name: 'BounceIn',
    title: 'Bounce In',
    description: 'Bouncy entrance animation.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BounceIn-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'stagger-children',
    name: 'StaggerChildren',
    title: 'Stagger Children',
    description: 'Staggered animation for child elements.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/StaggerChildren-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'parallax',
    name: 'Parallax',
    title: 'Parallax',
    description: 'Parallax scrolling effect for elements.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Parallax-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'scroll-reveal',
    name: 'ScrollReveal',
    title: 'Scroll Reveal',
    description: 'Reveal elements as they enter viewport.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ScrollReveal-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'hover-lift',
    name: 'HoverLift',
    title: 'Hover Lift',
    description: 'Lift effect on hover with shadow.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/HoverLift-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'hover-glow',
    name: 'HoverGlow',
    title: 'Hover Glow',
    description: 'Glowing effect on hover.',
    category: 'animations',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/HoverGlow-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'hover-shine',
    name: 'HoverShine',
    title: 'Hover Shine',
    description: 'Shine animation across element on hover.',
    category: 'animations',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/HoverShine-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'morph',
    name: 'Morph',
    title: 'Morph',
    description: 'Smooth morphing transition between states.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Morph-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'page-transition',
    name: 'PageTransition',
    title: 'Page Transition',
    description: 'Smooth page transition animations.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/PageTransition-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'loading-spinner',
    name: 'LoadingSpinner',
    title: 'Loading Spinner',
    description: 'Animated loading spinner component.',
    category: 'animations',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/LoadingSpinner-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'skeleton-loader',
    name: 'SkeletonLoader',
    title: 'Skeleton Loader',
    description: 'Skeleton loading animation for content.',
    category: 'animations',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/SkeletonLoader-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    title: 'Pulse',
    description: 'Pulsing animation effect.',
    category: 'animations',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Pulse-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'shake',
    name: 'Shake',
    title: 'Shake',
    description: 'Shake animation for attention.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Shake-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'wiggle',
    name: 'Wiggle',
    title: 'Wiggle',
    description: 'Wiggle animation effect.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Wiggle-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'flip',
    name: 'Flip',
    title: 'Flip',
    description: 'Card flip animation effect.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Flip-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'zoom-in',
    name: 'ZoomIn',
    title: 'Zoom In',
    description: 'Zoom-in animation on scroll or trigger.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/ZoomIn-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'blur-in',
    name: 'BlurIn',
    title: 'Blur In',
    description: 'Blur-to-focus entrance animation.',
    category: 'animations',
    dependencies: ['motion'],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BlurIn-TS-TW.json"',
    hasCustomization: true,
  },
  {
    id: 'gradient-text',
    name: 'GradientText',
    title: 'Gradient Text',
    description: 'Animated gradient text effect.',
    category: 'animations',
    dependencies: [],
    cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/GradientText-TS-TW.json"',
    hasCustomization: true,
  },
];
