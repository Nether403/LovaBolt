import { LayoutOption, DesignStyle, ColorTheme, FunctionalityOption, Font } from '../types';

export const layoutOptions: LayoutOption[] = [
  {
    id: 'single-column',
    title: 'Single Column',
    description: 'Content in one vertical line, ideal for mobile or minimalist designs.',
    category: 'column'
  },
  {
    id: 'two-column',
    title: 'Two Column',
    description: 'Content split into two columns, perfect for blogs with sidebars.',
    category: 'column'
  },
  {
    id: 'three-column',
    title: 'Three Column',
    description: 'Content divided into three columns, ideal for content-rich dashboards.',
    category: 'column'
  },
  {
    id: 'grid-layout',
    title: 'Grid Layout',
    description: 'Content organized in a responsive grid system, perfect for galleries or portfolios.',
    category: 'column'
  },
  {
    id: 'asymmetrical',
    title: 'Asymmetrical Layout',
    description: 'Dynamic, uneven placement of elements for artistic and unique designs.',
    category: 'column'
  },
  {
    id: 'card-based',
    title: 'Card Based',
    description: 'Content grouped into modular cards, great for blog posts or product listings.',
    category: 'special'
  },
  {
    id: 'hero-section',
    title: 'Hero Section',
    description: 'Full-width, eye-catching area at the top, perfect for landing pages.',
    category: 'special'
  },
  {
    id: 'sticky-header',
    title: 'Sticky Header',
    description: 'Navigation that stays fixed at the top while scrolling.',
    category: 'special'
  },
  {
    id: 'footer',
    title: 'Footer',
    description: 'Bottom section for additional navigation, contact info, and site details.',
    category: 'special'
  },
  {
    id: 'sidebar',
    title: 'Sidebar Navigation',
    description: 'Side-positioned navigation menu for easy access to sections.',
    category: 'special'
  }
];

export const designStyles: DesignStyle[] = [
  {
    id: 'material-design',
    title: 'Material Design',
    description: 'Google\'s design system with depth, bold colors, and meaningful motion.'
  },
  {
    id: 'fluent-design',
    title: 'Fluent Design',
    description: 'Microsoft\'s design language featuring light, depth, motion, and material.'
  },
  {
    id: 'apple-hig',
    title: 'Apple Human Interface',
    description: 'Apple\'s design principles emphasizing clarity, deference, and depth.'
  },
  {
    id: 'minimalist',
    title: 'Minimalist',
    description: 'Clean design with essential elements only, focusing on content and functionality.'
  },
  {
    id: 'neumorphism',
    title: 'Neumorphism',
    description: 'Soft UI design with subtle shadows and depth, creating a tactile experience.'
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    description: 'Frosted glass effect with elegant blur and translucent surfaces.'
  },
  {
    id: 'digital-brutalism',
    title: 'Digital Brutalism',
    description: 'Bold, raw design with strong contrasts and unconventional layouts.'
  },
  {
    id: 'organic-design',
    title: 'Organic Design',
    description: 'Natural flowing shapes, soft elements, and biomorphic forms.'
  },
  {
    id: 'retro-futurism',
    title: 'Retro Futurism',
    description: 'Vintage aesthetics meets future technology with bold geometry.'
  }
];

export const colorThemes: ColorTheme[] = [
  {
    id: 'custom-theme',
    title: 'Custom Theme',
    description: 'Create your own unique color palette',
    colors: ['#3B82F6', '#1E40AF', '#F59E0B'],
    distribution: [40, 40, 20],
    isCustom: true
  },
  {
    id: 'ocean-breeze',
    title: 'Ocean Breeze',
    description: 'Calming blues and teals inspired by the sea',
    colors: ['#0EA5E9', '#0891B2', '#F0F9FF'],
    distribution: [50, 30, 20]
  },
  {
    id: 'sunset-warmth',
    title: 'Sunset Warmth',
    description: 'Warm oranges and yellows with soft accents',
    colors: ['#F97316', '#FCD34D', '#FEF3C7'],
    distribution: [40, 35, 25]
  },
  {
    id: 'forest-green',
    title: 'Forest Green',
    description: 'Natural greens with earth tone accents',
    colors: ['#10B981', '#059669', '#D1FAE5'],
    distribution: [45, 35, 20]
  },
  {
    id: 'royal-purple',
    title: 'Royal Purple',
    description: 'Elegant purples with sophisticated highlights',
    colors: ['#8B5CF6', '#7C3AED', '#F3E8FF'],
    distribution: [40, 40, 20]
  },
  {
    id: 'monochrome-modern',
    title: 'Monochrome Modern',
    description: 'Sophisticated grayscale with blue accents',
    colors: ['#374151', '#9CA3AF', '#3B82F6'],
    distribution: [50, 30, 20]
  },
  {
    id: 'tech-neon',
    title: 'Tech Neon',
    description: 'Futuristic dark theme with neon highlights',
    colors: ['#1F2937', '#6366F1', '#00F5FF'],
    distribution: [60, 25, 15]
  }
];

export const fonts: Font[] = [
  {
    id: 'inter',
    name: 'Inter',
    family: "'Inter', sans-serif",
    style: 'modern',
    weights: ['Light', 'Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: "'Poppins', sans-serif",
    style: 'friendly',
    weights: ['Light', 'Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'roboto',
    name: 'Roboto',
    family: "'Roboto', sans-serif",
    style: 'clean',
    weights: ['Light', 'Regular', 'Medium', 'Bold']
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    family: "'Playfair Display', serif",
    style: 'elegant',
    weights: ['Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: "'Montserrat', sans-serif",
    style: 'geometric',
    weights: ['Light', 'Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'source-sans',
    name: 'Source Sans Pro',
    family: "'Source Sans Pro', sans-serif",
    style: 'professional',
    weights: ['Light', 'Regular', 'Semibold', 'Bold']
  }
];

export const functionalityOptions: FunctionalityOption[] = [
  {
    id: 'basic-package',
    title: 'Basic Package',
    description: 'Essential features for a simple website',
    category: 'functionality',
    tier: 'basic',
    features: [
      'Contact Form',
      'Social Media Integration',
      'Basic SEO Setup',
      'Mobile Responsive Design',
      'Simple Navigation Menu',
      'Image Gallery',
      'Basic Analytics'
    ]
  },
  {
    id: 'standard-package',
    title: 'Standard Package',
    description: 'Advanced features for growing businesses',
    category: 'functionality',
    tier: 'standard',
    features: [
      'All Basic Features',
      'Blog System with CMS',
      'Newsletter Integration',
      'Custom Forms Builder',
      'Advanced Image Gallery',
      'Search Functionality',
      'User Comments System',
      'Content Management',
      'Multi-language Support',
      'Advanced SEO Tools'
    ]
  },
  {
    id: 'advanced-package',
    title: 'Advanced Package',
    description: 'Comprehensive solution for established businesses',
    category: 'functionality',
    tier: 'advanced',
    features: [
      'All Standard Features',
      'User Authentication System',
      'Role-based Access Control',
      'Advanced Analytics Dashboard',
      'API Integration Capabilities',
      'E-commerce Ready',
      'Payment Gateway Integration',
      'Inventory Management',
      'Customer Management',
      'Automated Workflows',
      'Advanced Security Features'
    ]
  },
  {
    id: 'enterprise-package',
    title: 'Enterprise Package',
    description: 'Full-featured solution for large organizations',
    category: 'functionality',
    tier: 'enterprise',
    features: [
      'All Advanced Features',
      'Custom Workflow Automation',
      'Advanced Security & Compliance',
      'Multi-tenant Architecture',
      'Advanced Reporting & Analytics',
      'Custom Integrations',
      'Priority Support',
      'White-label Options',
      'Advanced Performance Optimization',
      'Custom Feature Development'
    ]
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'Optimized for all screen sizes and devices',
    category: 'technical',
    features: [
      'Mobile-First Approach',
      'Fluid Layouts',
      'Responsive Images',
      'Touch-Friendly Interface',
      'Breakpoint Optimization'
    ]
  },
  {
    id: 'dark-mode',
    title: 'Dark Mode Support',
    description: 'Alternative color scheme for low-light conditions',
    category: 'technical',
    features: [
      'System Preference Detection',
      'Manual Toggle Option',
      'Persistent User Preference',
      'Optimized Color Contrast'
    ]
  },
  {
    id: 'pwa-features',
    title: 'Progressive Web App',
    description: 'Modern web app capabilities',
    category: 'technical',
    features: [
      'Offline Functionality',
      'App-like Experience',
      'Push Notifications',
      'Install Prompts'
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility Features',
    description: 'WCAG 2.1 AA compliance and inclusive design',
    category: 'technical',
    features: [
      'Screen Reader Support',
      'Keyboard Navigation',
      'High Contrast Mode',
      'Focus Management',
      'ARIA Labels'
    ]
  }
];

export const visualTypes = [
  {
    id: 'icons',
    title: 'Icons',
    description: 'Choose your icon style',
    options: [
      { id: 'line', title: 'Line Icons', description: 'Clean and minimal line-based icons' },
      { id: 'solid', title: 'Solid Icons', description: 'Bold and filled icon style' },
      { id: 'duotone', title: 'Duotone Icons', description: 'Two-toned iconic style' },
      { id: 'gradient', title: 'Gradient Icons', description: 'Modern icons with color gradients' }
    ]
  },
  {
    id: 'illustrations',
    title: 'Illustrations',
    description: 'Select illustration style',
    options: [
      { id: 'flat', title: 'Flat Illustrations', description: '2D illustrations with solid colors' },
      { id: 'isometric', title: 'Isometric', description: '3D isometric illustration style' },
      { id: '3d', title: '3D Illustrations', description: 'Realistic 3D rendered illustrations' },
      { id: 'minimal', title: 'Minimal', description: 'Simple and clean illustrations' }
    ]
  },
  {
    id: 'images',
    title: 'Images',
    description: 'Pick your image style',
    options: [
      { id: 'photography', title: 'Photography', description: 'High-quality photographic content' },
      { id: 'abstract', title: 'Abstract', description: 'Artistic and abstract imagery' },
      { id: 'nature', title: 'Nature', description: 'Natural landscapes and organic elements' },
      { id: 'lifestyle', title: 'Lifestyle', description: 'People and lifestyle photography' }
    ]
  }
];

export const backgroundPatterns = [
  { id: 'geometric', title: 'Geometric', description: 'Regular shapes and mathematical patterns' },
  { id: 'organic', title: 'Organic', description: 'Natural flowing patterns' },
  { id: 'abstract', title: 'Abstract', description: 'Modern abstract patterns' },
  { id: 'minimal', title: 'Minimal', description: 'Simple repeating patterns' }
];

export const animationTypes = [
  {
    id: 'fade-in',
    title: 'Fade In',
    description: 'Smooth opacity transitions for content reveal'
  },
  {
    id: 'slide-up',
    title: 'Slide Up',
    description: 'Content slides up from bottom with easing'
  },
  {
    id: 'scale-in',
    title: 'Scale In',
    description: 'Elements scale from small to full size'
  },
  {
    id: 'hover-effects',
    title: 'Hover Effects',
    description: 'Interactive hover states for buttons and cards'
  },
  {
    id: 'loading-states',
    title: 'Loading States',
    description: 'Skeleton loaders and progress indicators'
  },
  {
    id: 'parallax',
    title: 'Parallax Scrolling',
    description: 'Multi-layer depth animations on scroll'
  },
  {
    id: 'micro-interactions',
    title: 'Micro Interactions',
    description: 'Subtle feedback animations for user actions'
  },
  {
    id: 'page-transitions',
    title: 'Page Transitions',
    description: 'Smooth animations between different pages'
  }
];

export const fontWeights = ['Light', 'Regular', 'Medium', 'Semibold', 'Bold'];
export const textAlignments = ['Left', 'Center', 'Right'];
export const fontSizes = ['Small', 'Medium', 'Large', 'Extra Large'];
export const lineHeights = ['Tight', 'Normal', 'Relaxed', 'Loose'];