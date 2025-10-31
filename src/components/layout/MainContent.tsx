import React, { lazy, Suspense, useRef, useEffect } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { StepLoadingFallback } from '../ui/StepLoadingFallback';

// Lazy load all wizard steps for code splitting
const ProjectSetupStep = lazy(() => import('../steps/ProjectSetupStep'));
const LayoutStep = lazy(() => import('../steps/LayoutStep'));
const DesignStyleStep = lazy(() => import('../steps/DesignStyleStep'));
const ColorThemeStep = lazy(() => import('../steps/ColorThemeStep'));
const TypographyStep = lazy(() => import('../steps/TypographyStep'));
const VisualsStep = lazy(() => import('../steps/VisualsStep'));
const BackgroundStep = lazy(() => import('../steps/BackgroundStep'));
const ComponentsStep = lazy(() => import('../steps/ComponentsStep'));
const FunctionalityStep = lazy(() => import('../steps/FunctionalityStep'));
const AnimationsStep = lazy(() => import('../steps/AnimationsStep'));
const PreviewStep = lazy(() => import('../steps/PreviewStep'));

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
        <Suspense fallback={<StepLoadingFallback stepName={currentStep} />}>
          {renderCurrentStep()}
        </Suspense>
      </div>
    </main>
  );
};

export default MainContent;