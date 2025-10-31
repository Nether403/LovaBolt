import React, { lazy, Suspense, useRef, useEffect, useMemo } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { StepLoadingFallback } from '../ui/StepLoadingFallback';
import { useKeyboardShortcuts, KeyboardShortcut } from '../../hooks/useKeyboardShortcuts';

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
  const { currentStep, setCurrentStep, generatePrompt, setPromptText, undo, redo } =
    useBoltBuilder();
  const mainRef = useRef<HTMLDivElement>(null);

  // Define step order for navigation
  const stepOrder = [
    'project-setup',
    'layout',
    'design-style',
    'color-theme',
    'typography',
    'visuals',
    'background',
    'components',
    'functionality',
    'animations',
    'preview',
  ];

  // Navigation functions
  const navigateNext = React.useCallback(() => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      const nextStep = stepOrder[currentIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }
  }, [currentStep, stepOrder, setCurrentStep]);

  const navigatePrevious = React.useCallback(() => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = stepOrder[currentIndex - 1];
      if (prevStep) {
        setCurrentStep(prevStep);
      }
    }
  }, [currentStep, stepOrder, setCurrentStep]);

  const handleGeneratePrompt = React.useCallback(() => {
    const prompt = generatePrompt();
    setPromptText(prompt);
    setCurrentStep('preview');
  }, [generatePrompt, setPromptText, setCurrentStep]);

  // Define keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = useMemo(
    () => [
      {
        key: 'ArrowRight',
        ctrlKey: true,
        action: navigateNext,
        description: 'Navigate to next step',
      },
      {
        key: 'ArrowLeft',
        ctrlKey: true,
        action: navigatePrevious,
        description: 'Navigate to previous step',
      },
      {
        key: 'g',
        ctrlKey: true,
        action: handleGeneratePrompt,
        description: 'Generate prompt and go to preview',
      },
      {
        key: 'z',
        ctrlKey: true,
        shiftKey: false,
        action: undo,
        description: 'Undo last action',
      },
      {
        key: 'z',
        ctrlKey: true,
        shiftKey: true,
        action: redo,
        description: 'Redo last undone action',
      },
    ],
    [navigateNext, navigatePrevious, handleGeneratePrompt, undo, redo]
  );

  // Enable keyboard shortcuts
  useKeyboardShortcuts({ shortcuts });

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
      id="main-content"
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
