import React, { useState, useEffect, useCallback } from 'react';
import { Info, Sparkles, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useBoltBuilderStore } from '../../stores/boltBuilderStore';
import { Button } from '../ui/button';
import InfoModal from '../modals/InfoModal';
import DescriptionHelpModal from '../modals/DescriptionHelpModal';
import { projectInfoSchema } from '../../types/validation';
import { z } from 'zod';
import { getSmartDefaults, applySmartDefaults } from '../../utils/smartDefaults';
import {
  layoutOptions,
  designStyles,
  colorThemes,
  functionalityOptions,
} from '../../data/wizardData';
import { backgroundOptions, componentOptions, animationOptions } from '../../data/reactBitsData';
import { NLPInput } from '../ai/NLPInput';
import { applyNLPResults, NLPParseResult } from '../../utils/nlpParser';
import { FeedbackPrompt, FeedbackData } from '../ai/FeedbackPrompt';
import { saveFeedback } from '../../utils/feedbackStorage';
import { trackAIEvent } from '../../utils/analyticsTracking';
import { toast } from '../../hooks/use-toast';
import { useAnalyzeProject } from '../../hooks/ai/useAiMutations';
import type { ProjectAnalysis } from '../../types/gemini';
import { AIErrorFeedback } from '../ai/AIErrorFeedback';

const ProjectSetupStep: React.FC = () => {
  const {
    projectInfo,
    setProjectInfo,
    setCurrentStep,
    selectedLayout,
    setSelectedLayout,
    selectedDesignStyle,
    setSelectedDesignStyle,
    selectedColorTheme,
    setSelectedColorTheme,
    selectedTypography,
    setSelectedTypography,
    selectedFunctionality,
    setSelectedFunctionality,
    backgroundSelection,
    setBackgroundSelection,
    selectedComponents,
    setSelectedComponents,
    selectedAnimations,
    setSelectedAnimations,
  } = useBoltBuilderStore();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDescriptionHelp, setShowDescriptionHelp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [smartDefaultsApplied, setSmartDefaultsApplied] = useState(false);
  const [showSmartDefaultsNotification, setShowSmartDefaultsNotification] = useState(false);
  const [showNLPSection, setShowNLPSection] = useState(false);
  const [showSmartDefaultsFeedback, setShowSmartDefaultsFeedback] = useState(false);
  const [nlpDescription, setNlpDescription] = useState('');

  // AI Analysis state
  const [aiAnalysis, setAiAnalysis] = useState<ProjectAnalysis | null>(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  const { analyzeProject, isAnalyzing, analysisError, isUsingFallback } = useAnalyzeProject();

  /**
   * Trigger AI analysis when description reaches 20 characters
   * Debounced to avoid excessive API calls
   */
  const triggerAiAnalysis = useCallback(
    async (description: string) => {
      if (description.length < 20) {
        setAiAnalysis(null);
        setShowAiSuggestions(false);
        return;
      }

      try {
        console.log(
          '[ProjectSetupStep] Triggering AI analysis for description:',
          description.substring(0, 50) + '...'
        );
        const analysis = await analyzeProject(description);

        console.log('[ProjectSetupStep] AI analysis complete:', {
          projectType: analysis.projectType,
          designStyle: analysis.designStyle,
          colorTheme: analysis.colorTheme,
          confidence: analysis.confidence,
          isUsingFallback,
        });

        setAiAnalysis(analysis);

        // Show suggestions if confidence is high enough (>0.8)
        if (analysis.confidence > 0.8) {
          setShowAiSuggestions(true);
        }

        // Track analytics
        trackAIEvent('ai_analysis_completed', {
          confidence: analysis.confidence,
          projectType: analysis.projectType,
          isUsingFallback,
        });
      } catch (error) {
        console.error('[ProjectSetupStep] AI analysis failed:', error);
        // Error is already handled by useGemini hook
        // Just log it here for debugging
      }
    },
    [analyzeProject, isUsingFallback]
  );

  /**
   * Effect to trigger analysis when description changes
   * Debounced to avoid excessive API calls
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (projectInfo.description.length >= 20) {
        triggerAiAnalysis(projectInfo.description);
      } else {
        setAiAnalysis(null);
        setShowAiSuggestions(false);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [projectInfo.description, triggerAiAnalysis]);

  /**
   * Apply AI-recommended values to wizard state
   * Updates project type, design style, and color theme
   */
  const handleApplyAiSuggestions = useCallback(() => {
    if (!aiAnalysis) return;

    console.log('[ProjectSetupStep] Applying AI suggestions:', aiAnalysis);

    // Update project type if different
    if (aiAnalysis.projectType !== projectInfo.type) {
      setProjectInfo({ ...projectInfo, type: aiAnalysis.projectType });
    }

    // Find and apply design style
    const designStyle = designStyles.find((s) => s.id === aiAnalysis.designStyle);
    if (designStyle) {
      setSelectedDesignStyle(designStyle);
      console.log('[ProjectSetupStep] Applied design style:', designStyle.title);
    }

    // Find and apply color theme
    const colorTheme = colorThemes.find((t) => t.id === aiAnalysis.colorTheme);
    if (colorTheme) {
      setSelectedColorTheme(colorTheme);
      console.log('[ProjectSetupStep] Applied color theme:', colorTheme.title);
    }

    // Apply suggested components if available
    if (aiAnalysis.suggestedComponents && aiAnalysis.suggestedComponents.length > 0) {
      const components = componentOptions.filter((c) =>
        aiAnalysis.suggestedComponents?.includes(c.id)
      );
      if (components.length > 0) {
        setSelectedComponents(components);
        console.log(
          '[ProjectSetupStep] Applied suggested components:',
          components.map((c) => c.title)
        );

        // Store auto-selected component IDs for visual indicators
        sessionStorage.setItem(
          'autoSelectedComponents',
          JSON.stringify(components.map((c) => c.id))
        );
      }
    }

    // Apply suggested animations if available
    if (aiAnalysis.suggestedAnimations && aiAnalysis.suggestedAnimations.length > 0) {
      const animations = animationOptions.filter((a) =>
        aiAnalysis.suggestedAnimations?.includes(a.id)
      );
      if (animations.length > 0) {
        setSelectedAnimations(animations);
        console.log(
          '[ProjectSetupStep] Applied suggested animations:',
          animations.map((a) => a.title)
        );
      }
    }

    // Show success notification with reasoning
    toast({
      title: 'AI Suggestions Applied!',
      description: aiAnalysis.reasoning,
      duration: 5000,
    });

    // Track analytics
    trackAIEvent('ai_suggestions_applied', {
      confidence: aiAnalysis.confidence,
      projectType: aiAnalysis.projectType,
      designStyle: aiAnalysis.designStyle,
      colorTheme: aiAnalysis.colorTheme,
      componentsCount: aiAnalysis.suggestedComponents?.length || 0,
      animationsCount: aiAnalysis.suggestedAnimations?.length || 0,
    });

    // Hide the suggestions panel after applying
    setShowAiSuggestions(false);
  }, [
    aiAnalysis,
    projectInfo,
    setProjectInfo,
    setSelectedDesignStyle,
    setSelectedColorTheme,
    setSelectedComponents,
    setSelectedAnimations,
  ]);

  const handleToggleNLPSection = () => {
    if (!showNLPSection) {
      // Opening NLP section - transfer description to NLP input
      setNlpDescription(projectInfo.description);
    } else {
      // Closing NLP section - transfer NLP description back to project description
      setProjectInfo({ ...projectInfo, description: nlpDescription });
    }
    setShowNLPSection(!showNLPSection);
  };

  const handleApplyNLPDetections = (parseResult: NLPParseResult) => {
    const updates = applyNLPResults(
      parseResult,
      projectInfo,
      selectedDesignStyle || undefined,
      selectedColorTheme || undefined
    );

    // Apply detected project info
    if (updates.projectInfo) {
      setProjectInfo({ ...projectInfo, ...updates.projectInfo });
    }

    // Apply detected design style
    if (updates.designStyle) {
      setSelectedDesignStyle(updates.designStyle);
    }

    // Apply detected color theme
    if (updates.colorTheme) {
      setSelectedColorTheme(updates.colorTheme);
    }

    // Transfer NLP description to project description
    setProjectInfo({ ...projectInfo, description: nlpDescription });

    // Show notification
    setShowSmartDefaultsNotification(true);
    sessionStorage.setItem(
      'smartDefaultsReasoning',
      'We detected your preferences from your description and applied them automatically.'
    );

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowSmartDefaultsNotification(false);
    }, 5000);
  };

  const handleApplySmartDefaults = () => {
    const currentState = {
      selectedLayout,
      selectedDesignStyle,
      selectedColorTheme,
      selectedTypography,
      selectedFunctionality,
      backgroundSelection,
      selectedComponents,
      selectedAnimations,
    };

    const defaults = applySmartDefaults(projectInfo.type, projectInfo.purpose, currentState);
    const { reasoning, confidence } = getSmartDefaults(projectInfo.type, projectInfo.purpose);

    // Track analytics event
    trackAIEvent('smart_defaults_applied', {
      projectType: projectInfo.type,
      purpose: projectInfo.purpose,
      confidence,
      defaultsApplied: Object.keys(defaults).length,
    });

    // Apply defaults to context
    if (defaults.layout) {
      const layout = layoutOptions.find((l) => l.id === defaults.layout);
      if (layout) setSelectedLayout(layout);
    }

    if (defaults.designStyle) {
      const style = designStyles.find((s) => s.id === defaults.designStyle);
      if (style) setSelectedDesignStyle(style);
    }

    if (defaults.colorTheme) {
      const theme = colorThemes.find((t) => t.id === defaults.colorTheme);
      if (theme) setSelectedColorTheme(theme);
    }

    if (defaults.typography) {
      setSelectedTypography({ ...selectedTypography, ...defaults.typography });
    }

    if (defaults.functionality) {
      const functionality = functionalityOptions.filter((f) =>
        defaults.functionality?.includes(f.id)
      );
      setSelectedFunctionality(functionality);
    }

    if (defaults.background) {
      const background = backgroundOptions.find((b) => b.id === defaults.background);
      if (background) {
        setBackgroundSelection({
          type: 'react-bits',
          reactBitsComponent: background,
        });
      }
    }

    if (defaults.components) {
      const components = componentOptions.filter((c) => defaults.components?.includes(c.id));

      // Log component auto-selection
      if (components.length > 0) {
        console.log('[Smart Defaults] Auto-selecting components:', {
          components: components.map((c) => c.title),
          reason: `Recommended for ${projectInfo.type} projects`,
          timestamp: new Date().toISOString(),
        });

        // Store auto-selected component IDs for visual indicators
        sessionStorage.setItem(
          'autoSelectedComponents',
          JSON.stringify(components.map((c) => c.id))
        );

        // Show notification about auto-selected components
        toast({
          title: 'Components Auto-Selected',
          description: `${components.length} component${components.length > 1 ? 's' : ''} selected: ${components.map((c) => c.title).join(', ')}. You can review and modify these in the Components step.`,
          duration: 5000,
        });
      }

      setSelectedComponents(components);
    }

    if (defaults.animations) {
      const animations = animationOptions.filter((a) => defaults.animations?.includes(a.id));
      setSelectedAnimations(animations);
    }

    // Show notification
    setSmartDefaultsApplied(true);
    setShowSmartDefaultsNotification(true);

    // Store reasoning for display
    sessionStorage.setItem('smartDefaultsReasoning', reasoning);

    // Show feedback prompt after a short delay
    setTimeout(() => {
      setShowSmartDefaultsFeedback(true);
    }, 2000);

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowSmartDefaultsNotification(false);
    }, 5000);
  };

  const handleSmartDefaultsFeedback = (feedback: FeedbackData) => {
    saveFeedback(feedback);
    setShowSmartDefaultsFeedback(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate with Zod schema
      projectInfoSchema.parse(projectInfo);

      // Clear errors and proceed
      setValidationErrors({});
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentStep('layout');
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract errors from Zod validation
        const newErrors: Record<string, string[]> = {};
        error.issues.forEach((err) => {
          const path = err.path.join('.');
          if (!newErrors[path]) {
            newErrors[path] = [];
          }
          newErrors[path].push(err.message);
        });
        setValidationErrors(newErrors);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-white">Project Setup</h2>
        <button
          onClick={() => setShowInfoModal(true)}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
        >
          <Info
            size={18}
            className="text-purple-400 group-hover:text-purple-300 transition-colors"
          />
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-white/10 border-l-4 border-white/40 text-white p-4 mb-6 rounded animate-fade-in backdrop-blur-sm">
          <p>Project saved successfully!</p>
        </div>
      )}

      {/* Smart Defaults Notification */}
      {showSmartDefaultsNotification && (
        <div className="glass-card border-l-4 border-teal-500 text-white p-4 mb-6 rounded-lg animate-fade-in backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-teal-400 mb-1">Smart Defaults Applied!</p>
              <p className="text-sm text-gray-300">
                {sessionStorage.getItem('smartDefaultsReasoning')}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                You can override any of these selections as you progress through the wizard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Smart Defaults Feedback */}
      {showSmartDefaultsFeedback && (
        <div className="mb-6 animate-fade-in">
          <FeedbackPrompt
            feature="smart_defaults"
            onFeedback={handleSmartDefaultsFeedback}
            onDismiss={() => setShowSmartDefaultsFeedback(false)}
            showCommentField={true}
          />
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-lg shadow p-6 space-y-6">
        {/* Project Name */}
        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-300 mb-1">
            Project/Website Name *
          </label>
          <input
            id="project-name"
            type="text"
            value={projectInfo.name}
            onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
            className={`
              w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-gray-400
              focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
              transition-all duration-200
              ${validationErrors['name'] ? 'border-red-500/50' : 'border-white/20'}
            `}
            placeholder="e.g. The Photography Co"
          />
          {validationErrors['name'] && (
            <div className="mt-1 space-y-1">
              {validationErrors['name'].map((error, index) => (
                <p key={index} className="text-red-400 text-sm">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Project Description - Hidden when NLP section is shown */}
        {!showNLPSection && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor="project-description"
                className="block text-sm font-medium text-gray-300"
              >
                Project Description *
              </label>
              <button
                type="button"
                onClick={() => setShowDescriptionHelp(true)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
              >
                <Info
                  size={16}
                  className="text-purple-400 group-hover:text-purple-300 transition-colors"
                />
              </button>
            </div>
            <textarea
              id="project-description"
              value={projectInfo.description}
              onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
              rows={4}
              className={`
                w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-gray-400
                focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                transition-all duration-200 resize-none
                ${validationErrors['description'] ? 'border-red-500/50' : 'border-white/20'}
              `}
              placeholder="A modern portfolio website to showcase my photography work and attract potential clients..."
            />
            <div className="flex justify-between items-start mt-1">
              {validationErrors['description'] && (
                <div className="space-y-1 flex-1">
                  {validationErrors['description'].map((error, index) => (
                    <p key={index} className="text-red-400 text-sm">
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <p className="text-gray-400 text-xs ml-auto">{projectInfo.description.length}/2000</p>
            </div>
          </div>
        )}

        {/* AI Analysis Loading Indicator */}
        {isAnalyzing && (
          <div className="glass-card rounded-lg p-4 border border-teal-500/30 animate-fade-in">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">
                  AI is analyzing your description...
                </p>
                <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Indicator - AI temporarily unavailable */}
        {isUsingFallback && aiAnalysis && !isAnalyzing && (
          <div className="glass-card rounded-lg p-4 border border-yellow-500/30 animate-fade-in bg-yellow-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">AI temporarily unavailable</p>
                <p className="text-xs text-gray-400 mt-1">
                  Using standard rule-based analysis. The wizard remains fully functional with
                  intelligent defaults.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Error (when no fallback result) */}
        {analysisError && !isAnalyzing && !aiAnalysis && (
          <div className="glass-card rounded-lg p-4 border border-yellow-500/30 animate-fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">AI analysis unavailable</p>
                <p className="text-xs text-gray-400 mt-1">
                  {analysisError.message || 'Using standard analysis instead'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions Display */}
        {aiAnalysis && !isAnalyzing && (
          <div className="glass-card rounded-lg p-4 border border-teal-500/30 animate-fade-in">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-white font-semibold">AI Suggestions</p>
                  <div className="flex items-center gap-2">
                    {isUsingFallback && (
                      <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded">
                        Standard Analysis
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      Confidence: {Math.round(aiAnalysis.confidence * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mb-3">{aiAnalysis.reasoning}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Project Type:</span>
                    <span className="text-white font-medium">{aiAnalysis.projectType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Design Style:</span>
                    <span className="text-white font-medium">
                      {designStyles.find((s) => s.id === aiAnalysis.designStyle)?.title ||
                        aiAnalysis.designStyle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Color Theme:</span>
                    <span className="text-white font-medium">
                      {colorThemes.find((t) => t.id === aiAnalysis.colorTheme)?.title ||
                        aiAnalysis.colorTheme}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply AI Suggestions Button - Show when confidence > 0.8 */}
            {showAiSuggestions && aiAnalysis.confidence > 0.8 && (
              <button
                type="button"
                onClick={handleApplyAiSuggestions}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                         bg-linear-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700
                         text-white font-medium transition-all duration-200
                         hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Apply AI Suggestions</span>
              </button>
            )}
          </div>
        )}

        {/* AI Error Feedback - Show when there's an error */}
        {analysisError && (
          <div className="mb-6">
            <AIErrorFeedback
              error={analysisError}
              onRetry={() => triggerAiAnalysis(projectInfo.description)}
              isRetrying={isAnalyzing}
            />
          </div>
        )}

        {/* Fallback Indicator - Show when using fallback */}
        {isUsingFallback && !analysisError && aiAnalysis && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Using Standard Analysis</h3>
                <p className="text-sm text-gray-300">
                  AI features are temporarily unavailable. We've applied our standard analysis based
                  on your description. The recommendations are still accurate and helpful!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* NLP Input Section */}
        <div className={showNLPSection ? '' : 'border-t border-white/10 pt-6'}>
          <button
            type="button"
            onClick={handleToggleNLPSection}
            className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">
              {showNLPSection ? 'Hide' : 'Try'} AI-Powered Quick Setup
            </span>
          </button>

          {showNLPSection && (
            <div className="animate-fade-in">
              <NLPInput
                onApplyDetections={handleApplyNLPDetections}
                currentProjectInfo={projectInfo}
                currentDesignStyle={selectedDesignStyle || undefined}
                currentColorTheme={selectedColorTheme || undefined}
                initialDescription={nlpDescription}
                onDescriptionChange={setNlpDescription}
              />
            </div>
          )}
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="project-type" className="block text-sm font-medium text-gray-300 mb-1">
            Type of Project
          </label>
          <select
            id="project-type"
            value={projectInfo.type}
            onChange={(e) => {
              setProjectInfo({ ...projectInfo, type: e.target.value as any });
              setSmartDefaultsApplied(false); // Reset when type changes
            }}
            className={`
              w-full px-4 py-3 rounded-lg bg-white/5 border text-white
              focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
              transition-all duration-200
              [&>option]:bg-gray-800 [&>option]:text-white
              ${validationErrors['type'] ? 'border-red-500/50' : 'border-white/20'}
            `}
          >
            <option value="Website">Website</option>
            <option value="Web App">Web App</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Dashboard">Dashboard</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Portfolio">Portfolio</option>
          </select>
          {validationErrors['type'] && (
            <div className="mt-1 space-y-1">
              {validationErrors['type'].map((error, index) => (
                <p key={index} className="text-red-400 text-sm">
                  {error}
                </p>
              ))}
            </div>
          )}

          {/* Smart Defaults Button */}
          {projectInfo.type && projectInfo.purpose && !smartDefaultsApplied && (
            <div className="mt-3">
              <button
                type="button"
                onClick={handleApplySmartDefaults}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                         bg-linear-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700
                         text-white font-medium transition-all duration-200
                         hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5" />
                <span>Use Smart Defaults</span>
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Let AI suggest optimal settings for your {projectInfo.type.toLowerCase()}
              </p>
            </div>
          )}

          {smartDefaultsApplied && (
            <div className="mt-3 flex items-center gap-2 text-sm text-teal-400">
              <CheckCircle className="w-4 h-4" />
              <span>Smart defaults applied</span>
            </div>
          )}
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="website-purpose" className="block text-sm font-medium text-gray-300 mb-1">
            Primary Purpose
          </label>
          <select
            id="website-purpose"
            value={projectInfo.purpose}
            onChange={(e) => setProjectInfo({ ...projectInfo, purpose: e.target.value })}
            className={`
              w-full px-4 py-3 rounded-lg bg-white/5 border text-white
              focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
              transition-all duration-200
              [&>option]:bg-gray-800 [&>option]:text-white
              ${validationErrors['purpose'] ? 'border-red-500/50' : 'border-white/20'}
            `}
          >
            <option value="Portfolio">Portfolio</option>
            <option value="Business">Business</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Personal">Personal</option>
            <option value="Blog">Blog</option>
            <option value="Social Media">Social Media</option>
            <option value="Education">Education</option>
            <option value="News and Entertainment">News and Entertainment</option>
            <option value="Events">Events</option>
            <option value="Non-profit">Non-profit</option>
          </select>
          {validationErrors['purpose'] && (
            <div className="mt-1 space-y-1">
              {validationErrors['purpose'].map((error, index) => (
                <p key={index} className="text-red-400 text-sm">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Target Audience (Optional) */}
        <div>
          <label htmlFor="target-audience" className="block text-sm font-medium text-gray-300 mb-1">
            Target Audience <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            id="target-audience"
            type="text"
            value={projectInfo.targetAudience || ''}
            onChange={(e) => setProjectInfo({ ...projectInfo, targetAudience: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/20 text-white placeholder-gray-400 border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200"
            placeholder="e.g. Small business owners, creative professionals..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>

      {/* Modals */}
      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
      <DescriptionHelpModal
        isOpen={showDescriptionHelp}
        onClose={() => setShowDescriptionHelp(false)}
      />
    </div>
  );
};

export default ProjectSetupStep;
