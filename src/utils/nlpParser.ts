import { ProjectInfo, DesignStyle, ColorTheme } from '../types';
import { designStyles, colorThemes } from '../data/wizardData';

/**
 * Interface for keyword mappings used in NLP parsing
 */
export interface KeywordMapping {
  [category: string]: {
    [option: string]: string[];
  };
}

/**
 * Result of NLP parsing with detected selections and confidence scores
 */
export interface NLPParseResult {
  projectType?: ProjectInfo['type'];
  designStyle?: string;
  colorTheme?: string;
  confidence: Record<string, number>;
  detectedKeywords: string[];
}

/**
 * Comprehensive keyword mappings for project types, design styles, and color themes
 */
const KEYWORD_MAPPINGS: KeywordMapping = {
  projectTypes: {
    'Portfolio': [
      'portfolio',
      'showcase',
      'personal site',
      'personal website',
      'work samples',
      'projects',
      'creative work',
      'my work',
      'professional profile',
      'resume site',
      'cv site',
      'freelancer',
      'designer portfolio',
      'developer portfolio'
    ],
    'E-commerce': [
      'shop',
      'store',
      'sell',
      'products',
      'ecommerce',
      'e-commerce',
      'online store',
      'marketplace',
      'shopping',
      'buy',
      'purchase',
      'cart',
      'checkout',
      'payment',
      'retail',
      'merchant',
      'vendor'
    ],
    'Dashboard': [
      'dashboard',
      'admin',
      'analytics',
      'metrics',
      'data visualization',
      'statistics',
      'reporting',
      'insights',
      'kpi',
      'monitoring',
      'control panel',
      'admin panel',
      'management',
      'backend',
      'data analysis'
    ],
    'Web App': [
      'app',
      'application',
      'platform',
      'tool',
      'software',
      'saas',
      'service',
      'system',
      'web application',
      'interactive',
      'productivity',
      'utility',
      'webapp',
      'web tool'
    ],
    'Mobile App': [
      'mobile',
      'ios',
      'android',
      'phone',
      'tablet',
      'mobile app',
      'mobile application',
      'smartphone',
      'mobile-first',
      'touch',
      'responsive mobile',
      'native',
      'hybrid app'
    ],
    'Website': [
      'website',
      'site',
      'web',
      'landing page',
      'homepage',
      'web page',
      'online presence',
      'company site',
      'business site',
      'informational',
      'static site',
      'marketing site'
    ]
  },
  designStyles: {
    'material-design': [
      'material',
      'material design',
      'google design',
      'android style',
      'elevation',
      'paper',
      'cards',
      'floating action',
      'ripple',
      'material ui'
    ],
    'fluent-design': [
      'fluent',
      'fluent design',
      'microsoft',
      'windows',
      'acrylic',
      'reveal',
      'depth',
      'light',
      'modern windows'
    ],
    'apple-hig': [
      'apple',
      'ios',
      'macos',
      'human interface',
      'hig',
      'cupertino',
      'san francisco',
      'clarity',
      'deference',
      'apple style'
    ],
    'minimalist': [
      'minimal',
      'minimalist',
      'clean',
      'simple',
      'modern',
      'sleek',
      'uncluttered',
      'basic',
      'essential',
      'stripped down',
      'less is more',
      'white space',
      'spacious',
      'zen'
    ],
    'neumorphism': [
      'neumorphism',
      'soft ui',
      'neomorphism',
      'tactile',
      'embossed',
      'extruded',
      'soft shadows',
      'subtle depth'
    ],
    'glassmorphism': [
      'glass',
      'glassmorphism',
      'frosted',
      'blur',
      'translucent',
      'transparent',
      'frosted glass',
      'backdrop blur',
      'glassy',
      'see-through'
    ],
    'digital-brutalism': [
      'brutalism',
      'brutalist',
      'bold',
      'raw',
      'edgy',
      'unconventional',
      'stark',
      'harsh',
      'industrial',
      'concrete',
      'rough',
      'anti-design'
    ],
    'organic-design': [
      'organic',
      'natural',
      'flowing',
      'curved',
      'biomorphic',
      'fluid',
      'soft shapes',
      'nature-inspired',
      'rounded',
      'smooth'
    ],
    'retro-futurism': [
      'retro',
      'futurism',
      'retro futurism',
      'vintage',
      '80s',
      '90s',
      'neon',
      'cyberpunk',
      'synthwave',
      'vaporwave',
      'nostalgic',
      'old school'
    ]
  },
  colorThemes: {
    'ocean-breeze': [
      'blue',
      'ocean',
      'sea',
      'water',
      'calm',
      'aqua',
      'teal',
      'cyan',
      'turquoise',
      'marine',
      'coastal',
      'sky blue',
      'azure'
    ],
    'sunset-warmth': [
      'orange',
      'warm',
      'sunset',
      'vibrant',
      'red',
      'yellow',
      'amber',
      'gold',
      'fire',
      'autumn',
      'energetic',
      'hot'
    ],
    'forest-green': [
      'green',
      'forest',
      'nature',
      'earth',
      'natural',
      'eco',
      'organic',
      'leaf',
      'plant',
      'environmental',
      'sustainable',
      'fresh'
    ],
    'royal-purple': [
      'purple',
      'violet',
      'royal',
      'elegant',
      'luxury',
      'lavender',
      'plum',
      'mauve',
      'sophisticated',
      'regal',
      'premium'
    ],
    'monochrome-modern': [
      'black',
      'white',
      'gray',
      'grey',
      'monochrome',
      'neutral',
      'grayscale',
      'minimal color',
      'achromatic',
      'black and white',
      'sophisticated',
      'timeless'
    ],
    'tech-neon': [
      'neon',
      'bright',
      'electric',
      'cyber',
      'futuristic',
      'glow',
      'fluorescent',
      'vibrant',
      'tech',
      'digital',
      'modern tech',
      'high tech'
    ]
  }
};

/**
 * Parses a project description using natural language processing to detect
 * project type, design style, and color theme preferences.
 * 
 * @param description - The user's project description text
 * @returns NLPParseResult with detected selections and confidence scores
 */
export const parseProjectDescription = (description: string): NLPParseResult => {
  const lowerDesc = description.toLowerCase();
  const result: NLPParseResult = {
    confidence: {},
    detectedKeywords: []
  };

  // Detect project type
  const projectTypeScores: Record<string, { score: number; matches: string[] }> = {};
  
  const projectTypesMap = KEYWORD_MAPPINGS['projectTypes'];
  if (projectTypesMap) {
    Object.entries(projectTypesMap).forEach(([type, keywords]) => {
      const matches = keywords.filter(keyword => lowerDesc.includes(keyword.toLowerCase()));
      if (matches.length > 0) {
        projectTypeScores[type] = {
          score: matches.length,
          matches
        };
        result.detectedKeywords.push(...matches);
      }
    });
  }

  if (Object.keys(projectTypeScores).length > 0) {
    const topType = Object.entries(projectTypeScores)
      .sort(([, a], [, b]) => b.score - a.score)[0];
    if (topType) {
      result.projectType = topType[0] as ProjectInfo['type'];
      // Normalize confidence to 0-1 range (max 3 keyword matches = 1.0 confidence)
      result.confidence['projectType'] = Math.min(topType[1].score / 3, 1);
    }
  }

  // Detect design style
  const designStyleScores: Record<string, { score: number; matches: string[] }> = {};
  
  const designStylesMap = KEYWORD_MAPPINGS['designStyles'];
  if (designStylesMap) {
    Object.entries(designStylesMap).forEach(([style, keywords]) => {
      const matches = keywords.filter(keyword => lowerDesc.includes(keyword.toLowerCase()));
      if (matches.length > 0) {
        designStyleScores[style] = {
          score: matches.length,
          matches
        };
        result.detectedKeywords.push(...matches);
      }
    });
  }

  if (Object.keys(designStyleScores).length > 0) {
    const topStyle = Object.entries(designStyleScores)
      .sort(([, a], [, b]) => b.score - a.score)[0];
    if (topStyle) {
      result.designStyle = topStyle[0];
      // Normalize confidence to 0-1 range (max 2 keyword matches = 1.0 confidence)
      result.confidence['designStyle'] = Math.min(topStyle[1].score / 2, 1);
    }
  }

  // Detect color theme
  const colorThemeScores: Record<string, { score: number; matches: string[] }> = {};
  
  const colorThemesMap = KEYWORD_MAPPINGS['colorThemes'];
  if (colorThemesMap) {
    Object.entries(colorThemesMap).forEach(([theme, keywords]) => {
      const matches = keywords.filter(keyword => lowerDesc.includes(keyword.toLowerCase()));
      if (matches.length > 0) {
        colorThemeScores[theme] = {
          score: matches.length,
          matches
        };
        result.detectedKeywords.push(...matches);
      }
    });
  }

  if (Object.keys(colorThemeScores).length > 0) {
    const topTheme = Object.entries(colorThemeScores)
      .sort(([, a], [, b]) => b.score - a.score)[0];
    if (topTheme) {
      result.colorTheme = topTheme[0];
      // Normalize confidence to 0-1 range (max 2 keyword matches = 1.0 confidence)
      result.confidence['colorTheme'] = Math.min(topTheme[1].score / 2, 1);
    }
  }

  return result;
};

/**
 * Applies NLP parsing results to the current wizard state.
 * Only applies selections if confidence is above threshold (>0.5).
 * 
 * @param parseResult - The result from parseProjectDescription
 * @param currentProjectInfo - Current project info state
 * @param currentDesignStyle - Current design style selection
 * @param currentColorTheme - Current color theme selection
 * @returns Object with updated selections
 */
export const applyNLPResults = (
  parseResult: NLPParseResult,
  currentProjectInfo?: ProjectInfo,
  currentDesignStyle?: DesignStyle,
  currentColorTheme?: ColorTheme
): {
  projectInfo?: Partial<ProjectInfo>;
  designStyle?: DesignStyle;
  colorTheme?: ColorTheme;
} => {
  const updates: {
    projectInfo?: Partial<ProjectInfo>;
    designStyle?: DesignStyle;
    colorTheme?: ColorTheme;
  } = {};

  // Only apply if confidence is high enough (>0.5) and not already set
  if (parseResult.projectType && parseResult.confidence['projectType'] && parseResult.confidence['projectType'] > 0.5) {
    if (!currentProjectInfo?.type || currentProjectInfo.type === 'Website') {
      updates.projectInfo = {
        ...currentProjectInfo,
        type: parseResult.projectType
      };
    }
  }

  if (parseResult.designStyle && parseResult.confidence['designStyle'] && parseResult.confidence['designStyle'] > 0.5) {
    if (!currentDesignStyle) {
      const style = designStyles.find(s => s.id === parseResult.designStyle);
      if (style) {
        updates.designStyle = style;
      }
    }
  }

  if (parseResult.colorTheme && parseResult.confidence['colorTheme'] && parseResult.confidence['colorTheme'] > 0.5) {
    if (!currentColorTheme || currentColorTheme.isCustom) {
      const theme = colorThemes.find(t => t.id === parseResult.colorTheme);
      if (theme) {
        updates.colorTheme = theme;
      }
    }
  }

  return updates;
};
