import React, { useRef, useEffect } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import ProjectSetupStep from '../steps/ProjectSetupStep';
import LayoutStep from '../steps/LayoutStep';
import DesignStyleStep from '../steps/DesignStyleStep';
import ColorThemeStep from '../steps/ColorThemeStep';
import TypographyStep from '../steps/TypographyStep';
import VisualsStep from '../steps/VisualsStep';
import BackgroundStep from '../steps/BackgroundStepEnhanced';
import ComponentsStep from '../steps/ComponentsStep';
import FunctionalityStep from '../steps/FunctionalityStep';
import AnimationsStep from '../steps/AnimationsStep';
import PreviewStep from '../steps/PreviewStep';

/**
 * PERFORMANCE OPTIMIZATION NOTE: Code Splitting
 * 
 * If bundle size becomes a concern, consider implementing code splitting for step components
 * using React.lazy() and Suspense. This will load step components on-demand rather than
 * bundling them all upfront.
 * 
 * Example implementation:
 * 
 * const ProjectSetupStep = React.lazy(() => import('../steps/ProjectSetupStep'));
 * const LayoutStep = React.lazy(() => import('../steps/LayoutStep'));
 * // ... other steps
 * 
 * Then wrap renderCurrentStep() in a Suspense boundary:
 * 
 * <Suspense fallback={<div className="text-white">Loading...</div>}>
 *   {renderCurrentStep()}
 * </Suspense>
 * 
 * This optimization should only be implemented if:
 * 1. Bundle size exceeds acceptable limits (>500KB for main bundle)
 * 2. Initial load time is negatively impacted
 * 3. Performance metrics indicate a need for optimization
 */

const MainContent: React.FC = () => {
  const { currentStep } = useBoltBuilder();
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top when step changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'project-setup':
        return <ProjectSetupStep />;
      case 'layout':
        return <LayoutStep />;
      case 'design-style':
        return <DesignStyleStep />;
      case 'color-theme':
        return <ColorThemeStep />;
      case 'typography':
        return <TypographyStep />;
      case 'visuals':
        return <VisualsStep />;
      case 'background':
        return <BackgroundStep />;
      case 'components':
        return <ComponentsStep />;
      case 'functionality':
        return <FunctionalityStep />;
      case 'animations':
        return <AnimationsStep />;
      case 'preview':
        return <PreviewStep />;
      default:
        return <ProjectSetupStep />;
    }
  };

  return (
    <main 
      ref={mainRef}
      className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 text-white"
    >
      <div className="max-w-4xl mx-auto">
        {renderCurrentStep()}
      </div>
    </main>
  );
};

export default MainContent;