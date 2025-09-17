import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  ProjectInfo, 
  LayoutOption, 
  DesignStyle, 
  ColorTheme, 
  Typography, 
  VisualElement, 
  FunctionalityOption, 
  AnimationType 
} from '../types';

interface BoltBuilderContextType {
  // Steps
  currentStep: string;
  setCurrentStep: (step: string) => void;
  
  // Project Info
  projectInfo: ProjectInfo;
  setProjectInfo: (info: ProjectInfo) => void;
  
  // Layout
  selectedLayout: LayoutOption | null;
  setSelectedLayout: (layout: LayoutOption | null) => void;
  selectedSpecialLayouts: LayoutOption[];
  setSelectedSpecialLayouts: (layouts: LayoutOption[]) => void;
  
  // Design Style
  selectedDesignStyle: DesignStyle | null;
  setSelectedDesignStyle: (style: DesignStyle | null) => void;
  
  // Color Theme
  selectedColorTheme: ColorTheme | null;
  setSelectedColorTheme: (theme: ColorTheme | null) => void;
  
  // Typography
  selectedTypography: Typography;
  setSelectedTypography: (typography: Typography) => void;
  
  // Functionality
  selectedFunctionality: FunctionalityOption[];
  setSelectedFunctionality: (functionality: FunctionalityOption[]) => void;
  
  // Visuals
  selectedVisuals: VisualElement[];
  setSelectedVisuals: (visuals: VisualElement[]) => void;
  
  // Animations
  selectedAnimations: AnimationType[];
  setSelectedAnimations: (animations: AnimationType[]) => void;
  
  // Progress
  progress: number;
  
  // Prompt Generation
  generatePrompt: () => string;
  generateBasicPrompt: () => string;
  promptText: string;
  setPromptText: (text: string) => void;
  promptType: 'basic' | 'detailed';
  setPromptType: (type: 'basic' | 'detailed') => void;
  
  // Project Management
  saveProject: () => void;
  loadProject: (projectData: any) => void;
  clearProject: () => void;
}

const BoltBuilderContext = createContext<BoltBuilderContextType | undefined>(undefined);

const defaultTypography: Typography = {
  fontFamily: "'Inter', sans-serif",
  headingWeight: 'Semibold',
  bodyWeight: 'Regular',
  textAlignment: 'Left',
  headingSize: 'Large',
  bodySize: 'Medium',
  lineHeight: 'Normal'
};

export const BoltBuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Step management
  const [currentStep, setCurrentStep] = useState('project-setup');
  
  // Form state
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: '',
    description: '',
    type: 'Website',
    purpose: 'Portfolio',
    targetAudience: '',
    goals: ''
  });
  
  const [selectedLayout, setSelectedLayout] = useState<LayoutOption | null>(null);
  const [selectedSpecialLayouts, setSelectedSpecialLayouts] = useState<LayoutOption[]>([]);
  const [selectedDesignStyle, setSelectedDesignStyle] = useState<DesignStyle | null>(null);
  const [selectedColorTheme, setSelectedColorTheme] = useState<ColorTheme | null>(null);
  const [selectedTypography, setSelectedTypography] = useState<Typography>(defaultTypography);
  const [selectedFunctionality, setSelectedFunctionality] = useState<FunctionalityOption[]>([]);
  const [selectedVisuals, setSelectedVisuals] = useState<VisualElement[]>([]);
  const [selectedAnimations, setSelectedAnimations] = useState<AnimationType[]>([]);
  
  // Prompt state
  const [promptText, setPromptText] = useState('');
  const [promptType, setPromptType] = useState<'basic' | 'detailed'>('detailed');
  
  // Calculate progress
  const progress = (() => {
    let completed = 0;
    const totalSteps = 8;
    
    if (projectInfo.name && projectInfo.description && projectInfo.purpose) completed++;
    if (selectedLayout) completed++;
    if (selectedDesignStyle) completed++;
    if (selectedColorTheme) completed++;
    if (selectedTypography.fontFamily) completed++;
    if (selectedVisuals.length > 0) completed++;
    if (selectedFunctionality.length > 0) completed++;
    if (selectedAnimations.length > 0) completed++;
    
    return Math.round((completed / totalSteps) * 100);
  })();
  
  // Generate detailed prompt
  const generatePrompt = (): string => {
    if (!projectInfo.name || !selectedLayout || !selectedDesignStyle || !selectedColorTheme) {
      return 'Please complete all required sections before generating a prompt.';
    }
    
    const functionalityTier = selectedFunctionality.find(item => item.tier);
    const technicalFeatures = selectedFunctionality.filter(item => !item.tier);
    
    const visualElements = selectedVisuals.map(visual => {
      return `${visual.type}: ${visual.style}`;
    });
    
    const animations = selectedAnimations.map(anim => anim).filter(Boolean);
    
    return `Create a ${projectInfo.type.toLowerCase()} with the following specifications:

**Project Name:** "${projectInfo.name}"

## 1. Project Overview
- **Type:** ${projectInfo.type}
- **Purpose:** ${projectInfo.purpose}
- **Description:** ${projectInfo.description}
${projectInfo.targetAudience ? `- **Target Audience:** ${projectInfo.targetAudience}` : ''}
${projectInfo.goals ? `- **Goals:** ${projectInfo.goals}` : ''}

## 2. Layout Structure
- **Primary Layout:** ${selectedLayout.title}
- **Layout Description:** ${selectedLayout.description}
${selectedSpecialLayouts.length > 0 ? `
- **Additional Layout Features:**
  ${selectedSpecialLayouts.map(layout => `• ${layout.title}`).join('\n  ')}` : ''}

## 3. Design Style
- **Primary Style:** ${selectedDesignStyle.title}
- **Style Description:** ${selectedDesignStyle.description}
- **Design Approach:** Modern ${selectedDesignStyle.title.toLowerCase()} with attention to user experience

## 4. Color Scheme
- **Theme:** ${selectedColorTheme.title}
- **Primary Colors:** ${selectedColorTheme.colors.join(', ')}
- **Color Distribution:** Primary (${selectedColorTheme.distribution[0]}%), Secondary (${selectedColorTheme.distribution[1]}%), Accent (${selectedColorTheme.distribution[2]}%)
- **Color Usage:** Use primary color for main elements, secondary for backgrounds, accent for highlights and CTAs

## 5. Typography
- **Font Family:** ${selectedTypography.fontFamily}
- **Heading Weight:** ${selectedTypography.headingWeight}
- **Body Text Weight:** ${selectedTypography.bodyWeight}
- **Text Alignment:** ${selectedTypography.textAlignment}
- **Heading Size:** ${selectedTypography.headingSize}
- **Body Size:** ${selectedTypography.bodySize}
- **Line Height:** ${selectedTypography.lineHeight}

## 6. Visual Elements
${visualElements.length > 0 ? visualElements.map(element => `- ${element}`).join('\n') : '- Standard visual elements'}

## 7. UI/UX Animations
${animations.length > 0 ? animations.map(anim => `- ${anim}: Smooth transitions and micro-interactions`).join('\n') : '- Subtle hover effects and transitions'}

## 8. Functionality & Features
${functionalityTier ? `
**Tier:** ${functionalityTier.title}
**Core Features:**
${functionalityTier.features.map(feature => `   - ${feature}`).join('\n')}` : ''}

${technicalFeatures.length > 0 ? `
**Technical Requirements:**
${technicalFeatures.map(feature => `   - ${feature.title}: ${feature.description}`).join('\n')}` : ''}

## 9. Technical Implementation
- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS with modern design patterns
- **Responsive Design:** Mobile-first approach with breakpoints for tablet and desktop
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Optimized loading and smooth interactions
- **SEO:** Semantic HTML structure and meta tags

## 10. Design Requirements
- **Modern Aesthetics:** Clean, professional design with attention to detail
- **User Experience:** Intuitive navigation and clear information hierarchy
- **Interactive Elements:** Smooth hover states, loading states, and feedback
- **Cross-browser Compatibility:** Support for modern browsers
- **Mobile Optimization:** Touch-friendly interface and responsive layouts

Please implement this design with pixel-perfect attention to detail, ensuring all elements work harmoniously together to create an exceptional user experience.`.trim();
  };
  
  // Generate basic prompt
  const generateBasicPrompt = (): string => {
    if (!projectInfo.name || !selectedLayout || !selectedDesignStyle || !selectedColorTheme) {
      return 'Please complete all required sections before generating a prompt.';
    }
    
    const functionalityTier = selectedFunctionality.find(item => item.tier);
    const animations = selectedAnimations.filter(Boolean);
    
    return `Create a ${projectInfo.type.toLowerCase()} called "${projectInfo.name}" for ${projectInfo.purpose.toLowerCase()} purposes. ${projectInfo.description}

Use a ${selectedLayout.title.toLowerCase()} layout with a ${selectedDesignStyle.title.toLowerCase()} design style. The color scheme should follow the ${selectedColorTheme.title.toLowerCase()} theme, using ${selectedColorTheme.colors.join(', ')} as the main colors.

For typography, use ${selectedTypography.fontFamily} with ${selectedTypography.headingWeight.toLowerCase()} headings and ${selectedTypography.bodyWeight.toLowerCase()} body text. Visual elements should include ${selectedVisuals.map(visual => `${visual.type} in ${visual.style} style`).join(', ')}.

${animations.length > 0 ? `Include animations for ${animations.join(', ')}.` : ''}

Include ${functionalityTier ? functionalityTier.title.toLowerCase() : 'basic'} functionality features. Build using React, TypeScript, and Tailwind CSS with modern responsive design.`.trim();
  };
  
  // Project management
  const saveProject = () => {
    const projectData = {
      projectInfo,
      selectedLayout,
      selectedSpecialLayouts,
      selectedDesignStyle,
      selectedColorTheme,
      selectedTypography,
      selectedFunctionality,
      selectedVisuals,
      selectedAnimations,
      currentStep,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('lovabolt-project', JSON.stringify(projectData));
  };
  
  const loadProject = (projectData: any) => {
    if (projectData.projectInfo) setProjectInfo(projectData.projectInfo);
    if (projectData.selectedLayout) setSelectedLayout(projectData.selectedLayout);
    if (projectData.selectedSpecialLayouts) setSelectedSpecialLayouts(projectData.selectedSpecialLayouts);
    if (projectData.selectedDesignStyle) setSelectedDesignStyle(projectData.selectedDesignStyle);
    if (projectData.selectedColorTheme) setSelectedColorTheme(projectData.selectedColorTheme);
    if (projectData.selectedTypography) setSelectedTypography(projectData.selectedTypography);
    if (projectData.selectedFunctionality) setSelectedFunctionality(projectData.selectedFunctionality);
    if (projectData.selectedVisuals) setSelectedVisuals(projectData.selectedVisuals);
    if (projectData.selectedAnimations) setSelectedAnimations(projectData.selectedAnimations);
    if (projectData.currentStep) setCurrentStep(projectData.currentStep);
  };
  
  const clearProject = () => {
    setProjectInfo({
      name: '',
      description: '',
      type: 'Website',
      purpose: 'Portfolio',
      targetAudience: '',
      goals: ''
    });
    setSelectedLayout(null);
    setSelectedSpecialLayouts([]);
    setSelectedDesignStyle(null);
    setSelectedColorTheme(null);
    setSelectedTypography(defaultTypography);
    setSelectedFunctionality([]);
    setSelectedVisuals([]);
    setSelectedAnimations([]);
    setCurrentStep('project-setup');
    setPromptText('');
    localStorage.removeItem('lovabolt-project');
  };
  
  // Auto-save functionality
  React.useEffect(() => {
    const timer = setTimeout(saveProject, 1000);
    return () => clearTimeout(timer);
  }, [projectInfo, selectedLayout, selectedSpecialLayouts, selectedDesignStyle, selectedColorTheme, selectedTypography, selectedFunctionality, selectedVisuals, selectedAnimations]);
  
  // Load project on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('lovabolt-project');
    if (saved) {
      try {
        const projectData = JSON.parse(saved);
        loadProject(projectData);
      } catch (error) {
        console.error('Failed to load saved project:', error);
      }
    }
  }, []);
  
  const contextValue: BoltBuilderContextType = {
    currentStep,
    setCurrentStep,
    projectInfo,
    setProjectInfo,
    selectedLayout,
    setSelectedLayout,
    selectedSpecialLayouts,
    setSelectedSpecialLayouts,
    selectedDesignStyle,
    setSelectedDesignStyle,
    selectedColorTheme,
    setSelectedColorTheme,
    selectedTypography,
    setSelectedTypography,
    selectedFunctionality,
    setSelectedFunctionality,
    selectedVisuals,
    setSelectedVisuals,
    selectedAnimations,
    setSelectedAnimations,
    progress,
    generatePrompt,
    generateBasicPrompt,
    promptText,
    setPromptText,
    promptType,
    setPromptType,
    saveProject,
    loadProject,
    clearProject
  };

  return (
    <BoltBuilderContext.Provider value={contextValue}>
      {children}
    </BoltBuilderContext.Provider>
  );
};

export const useBoltBuilder = () => {
  const context = useContext(BoltBuilderContext);
  if (context === undefined) {
    throw new Error('useBoltBuilder must be used within a BoltBuilderProvider');
  }
  return context;
};