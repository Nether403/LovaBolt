import React, { useState, useEffect } from 'react';
import { useBoltBuilderStore } from '../../stores/boltBuilderStore';
import { Button } from '../ui/button';
import PromptModal from '../modals/PromptModal';
import { PromptQualityScore } from '../ai/PromptQualityScore';
import { PromptEnhancement } from '../ai/PromptEnhancement';
import { analyzePrompt, type PromptAnalysisResult } from '../../utils/promptAnalyzer';
import { TemplateSelector } from '../preview/TemplateSelector';
import { FeedbackPrompt, FeedbackData } from '../ai/FeedbackPrompt';
import { saveFeedback } from '../../utils/feedbackStorage';
import { trackAIEvent } from '../../utils/analyticsTracking';
import { useEnhancePrompt } from '../../hooks/ai/useAiMutations';
import { isAIEnabled } from '../../utils/aiPreferences';
import {
  renderTemplate,
  getDefaultTemplate,
  type PromptTemplate,
} from '../../data/promptTemplates';
import type { BoltBuilderState } from '../../types';
import type { PromptEnhancement as PromptEnhancementType } from '../../types/gemini';
import { Sparkles } from 'lucide-react';
import { AIErrorFeedback } from '../ai/AIErrorFeedback';

const PreviewStep: React.FC = () => {
  const {
    projectInfo,
    selectedLayout,
    selectedSpecialLayouts,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedFunctionality,
    selectedVisuals,
    backgroundSelection,
    selectedComponents,
    selectedAnimations,
    generatePrompt,
    generateBasicPrompt,
    setCurrentStep,
    setPromptText,
    setPromptType,
    promptText,
    promptType,
  } = useBoltBuilderStore();

  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [promptAnalysis, setPromptAnalysis] = useState<PromptAnalysisResult | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(getDefaultTemplate());
  const [showPromptFeedback, setShowPromptFeedback] = useState(false);
  const [showEnhancement, setShowEnhancement] = useState(false);
  const [enhancement, setEnhancement] = useState<PromptEnhancementType | null>(null);

  const { enhancePrompt, isEnhancing, enhancementError } = useEnhancePrompt();

  const generatePromptType = (type: 'basic' | 'detailed') => {
    let prompt: string;

    if (type === 'basic') {
      prompt = generateBasicPrompt();
    } else {
      // Use template if selected, otherwise use default generator
      if (selectedTemplate.id === 'generic') {
        prompt = generatePrompt();
      } else {
        // Build state object for template rendering
        const builderState: Partial<BoltBuilderState> = {
          projectInfo,
          selectedLayout: selectedLayout || undefined,
          selectedSpecialLayouts,
          selectedDesignStyle: selectedDesignStyle || undefined,
          selectedColorTheme: selectedColorTheme || undefined,
          selectedTypography,
          selectedFunctionality,
          selectedVisuals,
          backgroundSelection: backgroundSelection || undefined,
          selectedComponents,
          selectedAnimations,
        };

        // Render template with current state
        prompt = renderTemplate({
          template: selectedTemplate,
          data: builderState,
        });
      }
    }

    setPromptText(prompt);
    setPromptType(type);

    // Analyze the generated prompt
    const analysis = analyzePrompt({
      prompt,
      projectInfo,
      selectedDesignStyle: selectedDesignStyle || undefined,
      selectedColorTheme: selectedColorTheme || undefined,
      selectedComponents,
      selectedAnimations,
    });
    setPromptAnalysis(analysis);

    // Track analytics event
    trackAIEvent('prompt_analyzed', {
      promptType: type,
      score: analysis.score,
      suggestionsCount: analysis.suggestions.length,
      strengthsCount: analysis.strengths.length,
      weaknessesCount: analysis.weaknesses.length,
      templateId: selectedTemplate.id,
    });

    // Show feedback prompt after a short delay
    setTimeout(() => {
      setShowPromptFeedback(true);
    }, 2000);
  };

  const handlePromptFeedback = (feedback: FeedbackData) => {
    saveFeedback(feedback);
    setShowPromptFeedback(false);
  };

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);

    // If prompt is already generated, regenerate with new template
    if (promptText && promptType === 'detailed') {
      generatePromptType('detailed');
    }
  };

  const handleEnhanceWithAI = async () => {
    if (!promptText) {
      // Generate prompt first if not already generated
      generatePromptType('detailed');
      return;
    }

    try {
      // Track analytics event
      trackAIEvent('prompt_enhancement_started', {
        promptLength: promptText.length,
        templateId: selectedTemplate.id,
      });

      // Call AI enhancement
      const result = await enhancePrompt(promptText);

      // Check if enhancement actually added anything
      if (result.improvements.length > 0) {
        setEnhancement(result);
        setShowEnhancement(true);

        // Track success
        trackAIEvent('prompt_enhancement_completed', {
          improvementsCount: result.improvements.length,
          addedSectionsCount: result.addedSections.length,
        });
      } else {
        // No improvements - AI might be disabled or failed
        console.warn('No improvements returned from AI enhancement');
      }
    } catch (error) {
      console.error('Failed to enhance prompt:', error);

      // Track error
      trackAIEvent('prompt_enhancement_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const handleAcceptEnhancement = () => {
    if (enhancement) {
      setPromptText(enhancement.enhancedPrompt);
      setShowEnhancement(false);

      // Re-analyze the enhanced prompt
      const analysis = analyzePrompt({
        prompt: enhancement.enhancedPrompt,
        projectInfo,
        selectedDesignStyle: selectedDesignStyle || undefined,
        selectedColorTheme: selectedColorTheme || undefined,
        selectedComponents,
        selectedAnimations,
      });
      setPromptAnalysis(analysis);

      // Track acceptance
      trackAIEvent('prompt_enhancement_accepted', {
        improvementsCount: enhancement.improvements.length,
      });
    }
  };

  const handleRejectEnhancement = () => {
    setShowEnhancement(false);

    // Track rejection
    if (enhancement) {
      trackAIEvent('prompt_enhancement_rejected', {
        improvementsCount: enhancement.improvements.length,
      });
    }
  };

  const handleEditEnhancement = (editedPrompt: string) => {
    setPromptText(editedPrompt);
    setShowEnhancement(false);

    // Re-analyze the edited prompt
    const analysis = analyzePrompt({
      prompt: editedPrompt,
      projectInfo,
      selectedDesignStyle: selectedDesignStyle || undefined,
      selectedColorTheme: selectedColorTheme || undefined,
      selectedComponents,
      selectedAnimations,
    });
    setPromptAnalysis(analysis);

    // Track edit
    if (enhancement) {
      trackAIEvent('prompt_enhancement_edited', {
        originalLength: enhancement.enhancedPrompt.length,
        editedLength: editedPrompt.length,
      });
    }
  };

  // Analyze prompt when it changes
  useEffect(() => {
    if (promptText) {
      const analysis = analyzePrompt({
        prompt: promptText,
        projectInfo,
        selectedDesignStyle: selectedDesignStyle || undefined,
        selectedColorTheme: selectedColorTheme || undefined,
        selectedComponents,
        selectedAnimations,
      });
      setPromptAnalysis(analysis);
    }
  }, [
    promptText,
    projectInfo,
    selectedDesignStyle,
    selectedColorTheme,
    selectedComponents,
    selectedAnimations,
  ]);

  const handleApplyFixes = () => {
    if (promptAnalysis?.optimizedPrompt) {
      setPromptText(promptAnalysis.optimizedPrompt);

      // Track analytics event
      trackAIEvent('prompt_fixes_applied', {
        originalScore: promptAnalysis.score,
        fixesApplied: promptAnalysis.suggestions.filter((s) => s.autoFixable).length,
      });

      // Re-analyze the optimized prompt
      const newAnalysis = analyzePrompt({
        prompt: promptAnalysis.optimizedPrompt,
        projectInfo,
        selectedDesignStyle: selectedDesignStyle || undefined,
        selectedColorTheme: selectedColorTheme || undefined,
        selectedComponents,
        selectedAnimations,
      });
      setPromptAnalysis(newAnalysis);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Review Your Selections</h2>
        <p className="text-gray-300">Review all your choices before generating the final prompt.</p>
      </div>

      {/* Review Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Project Info */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Project Information</h3>
          {projectInfo.name ? (
            <div className="space-y-2">
              <p className="text-white">
                <span className="font-semibold">Name:</span> {projectInfo.name}
              </p>
              <p className="text-white">
                <span className="font-semibold">Type:</span> {projectInfo.type}
              </p>
              <p className="text-white">
                <span className="font-semibold">Purpose:</span> {projectInfo.purpose}
              </p>
              <p className="text-gray-300 text-sm mt-3">{projectInfo.description}</p>
            </div>
          ) : (
            <p className="text-red-400">Project information missing</p>
          )}
          <Button onClick={() => setCurrentStep('project-setup')} className="mt-4" size="sm">
            Edit Project Info
          </Button>
        </div>

        {/* Layout */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Layout Structure</h3>
          {selectedLayout ? (
            <div>
              <p className="text-white font-semibold mb-2">{selectedLayout.title}</p>
              <p className="text-gray-300 text-sm">{selectedLayout.description}</p>
            </div>
          ) : (
            <p className="text-red-400">Layout not selected</p>
          )}
          <Button onClick={() => setCurrentStep('layout')} className="mt-4" size="sm">
            Edit Layout
          </Button>
        </div>

        {/* Design Style */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Design Style</h3>
          {selectedDesignStyle ? (
            <div>
              <p className="text-white font-semibold mb-2">{selectedDesignStyle.title}</p>
              <p className="text-gray-300 text-sm">{selectedDesignStyle.description}</p>
            </div>
          ) : (
            <p className="text-red-400">Design style not selected</p>
          )}
          <Button onClick={() => setCurrentStep('design-style')} className="mt-4" size="sm">
            Edit Design Style
          </Button>
        </div>

        {/* Color Theme */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Color Theme</h3>
          {selectedColorTheme ? (
            <div>
              <p className="text-white font-semibold mb-3">{selectedColorTheme.title}</p>
              <div className="flex gap-2 mb-2">
                {selectedColorTheme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full ring-1 ring-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm">{selectedColorTheme.description}</p>
            </div>
          ) : (
            <p className="text-red-400">Color theme not selected</p>
          )}
          <Button onClick={() => setCurrentStep('color-theme')} className="mt-4" size="sm">
            Edit Color Theme
          </Button>
        </div>

        {/* Typography */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Typography</h3>
          {selectedTypography ? (
            <div
              className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              style={{
                fontFamily: selectedTypography.fontFamily,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                textAlign: selectedTypography.textAlignment.toLowerCase() as any,
              }}
            >
              <p
                className="text-lg mb-1 text-white"
                style={{
                  fontWeight:
                    selectedTypography.headingWeight === 'Bold'
                      ? '700'
                      : selectedTypography.headingWeight === 'Light'
                        ? '300'
                        : '400',
                }}
              >
                {selectedTypography.fontFamily.split(',')[0]?.replace(/'/g, '')}
              </p>
              <p className="text-sm text-gray-300">Sample typography preview</p>
            </div>
          ) : (
            <p className="text-red-400">Typography not selected</p>
          )}
          <Button onClick={() => setCurrentStep('typography')} className="mt-4" size="sm">
            Edit Typography
          </Button>
        </div>

        {/* Functionality Summary */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Functionality & Features</h3>
          {selectedFunctionality.length > 0 ? (
            <ul className="space-y-1">
              {selectedFunctionality.map((func) => (
                <li key={func.id} className="text-gray-300 text-sm">
                  • {func.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No functionality selected</p>
          )}
          <Button onClick={() => setCurrentStep('functionality')} className="mt-4" size="sm">
            Edit Functionality
          </Button>
        </div>

        {/* Background Effect */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Background Effect</h3>
          {backgroundSelection ? (
            <div>
              {backgroundSelection.type === 'react-bits' &&
              backgroundSelection.reactBitsComponent ? (
                <>
                  <p className="text-white font-semibold mb-2">
                    {backgroundSelection.reactBitsComponent.title}
                  </p>
                  <p className="text-gray-300 text-sm mb-3">
                    {backgroundSelection.reactBitsComponent.description}
                  </p>
                  {backgroundSelection.reactBitsComponent.previewUrl && (
                    <div className="relative h-24 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={backgroundSelection.reactBitsComponent.previewUrl}
                        alt={`${backgroundSelection.reactBitsComponent.title} preview`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  <p className="text-white font-semibold capitalize">
                    {backgroundSelection.type} Background
                  </p>
                  {backgroundSelection.type === 'solid' && (
                    <div
                      className="w-full h-24 rounded-lg ring-1 ring-white/20"
                      style={{ backgroundColor: backgroundSelection.solidColor }}
                    />
                  )}
                  {backgroundSelection.type === 'gradient' && (
                    <div
                      className="w-full h-24 rounded-lg ring-1 ring-white/20"
                      style={{
                        background: `linear-gradient(${backgroundSelection.gradientDirection}, ${backgroundSelection.gradientColors?.join(', ')})`,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 italic">No background selected</p>
          )}
          <Button onClick={() => setCurrentStep('background')} className="mt-4" size="sm">
            Edit Background
          </Button>
        </div>

        {/* Components */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">UI Components</h3>
          {selectedComponents.length > 0 ? (
            <ul className="space-y-1">
              {selectedComponents.map((comp) => (
                <li key={comp.id} className="text-gray-300 text-sm">
                  • {comp.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No components selected</p>
          )}
          <Button onClick={() => setCurrentStep('components')} className="mt-4" size="sm">
            Edit Components
          </Button>
        </div>

        {/* Animations */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Animations & Effects</h3>
          {selectedAnimations.length > 0 ? (
            <ul className="space-y-1">
              {selectedAnimations.map((anim) => (
                <li key={anim.id} className="text-gray-300 text-sm">
                  • {anim.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No animations selected</p>
          )}
          <Button onClick={() => setCurrentStep('animations')} className="mt-4" size="sm">
            Edit Animations
          </Button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="mt-8">
        <TemplateSelector
          selectedTemplateId={selectedTemplate.id}
          onSelectTemplate={handleTemplateSelect}
        />
      </div>

      {/* AI Enhancement Section */}
      {isAIEnabled() && promptText && !showEnhancement && (
        <div className="mt-8">
          <div className="glass-card rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-teal-500/20 rounded-lg">
                  <Sparkles className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Enhance with AI</h3>
                  <p className="text-gray-300 text-sm mb-1">
                    Let AI add professional details and best practices to your prompt:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1 mt-2">
                    <li>• Accessibility requirements (WCAG 2.1 AA)</li>
                    <li>• Performance optimization guidelines</li>
                    <li>• SEO best practices</li>
                    <li>• Security considerations</li>
                    <li>• Testing recommendations</li>
                    <li>• Code quality standards</li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={handleEnhanceWithAI}
                disabled={isEnhancing}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isEnhancing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enhance with AI
                  </>
                )}
              </Button>
            </div>
            {enhancementError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{enhancementError.message}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhancement Error Feedback */}
      {enhancementError && showEnhancement && (
        <div className="mt-8">
          <AIErrorFeedback
            error={enhancementError}
            onRetry={handleEnhanceWithAI}
            isRetrying={isEnhancing}
          />
        </div>
      )}

      {/* Prompt Enhancement Display */}
      {showEnhancement && enhancement && !enhancementError && (
        <div className="mt-8">
          <PromptEnhancement
            enhancement={enhancement}
            isLoading={isEnhancing}
            onAccept={handleAcceptEnhancement}
            onReject={handleRejectEnhancement}
            onEdit={handleEditEnhancement}
          />
        </div>
      )}

      {/* Prompt Quality Analysis */}
      {promptAnalysis && !showEnhancement && (
        <div className="mt-8">
          <PromptQualityScore analysis={promptAnalysis} onApplyFixes={handleApplyFixes} />
        </div>
      )}

      {/* Prompt Generation Feedback */}
      {showPromptFeedback && promptText && (
        <div className="mt-8 animate-fade-in">
          <FeedbackPrompt
            feature="prompt_generated"
            onFeedback={handlePromptFeedback}
            onDismiss={() => setShowPromptFeedback(false)}
            showCommentField={true}
          />
        </div>
      )}

      {/* Generate Prompt */}
      <div className="flex justify-center pt-8">
        <Button
          onClick={() => {
            generatePromptType('detailed');
            setIsPromptModalOpen(true);
          }}
          className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
          size="lg"
        >
          Generate Your Prompt
        </Button>
      </div>

      {/* Prompt Modal */}
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onSelectType={generatePromptType}
        promptText={promptText}
        promptType={promptType}
      />
    </div>
  );
};

export default PreviewStep;
