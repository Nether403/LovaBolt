import React, { useRef, useEffect } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import ProjectSetupStep from '../steps/ProjectSetupStep';
import LayoutStep from '../steps/LayoutStep';
import DesignStyleStep from '../steps/DesignStyleStep';
import ColorThemeStep from '../steps/ColorThemeStep';
import TypographyStep from '../steps/TypographyStep';
import VisualsStep from '../steps/VisualsStep';
import FunctionalityStep from '../steps/FunctionalityStep';
import AnimationsStep from '../steps/AnimationsStep';
import PreviewStep from '../steps/PreviewStep';

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