import React, { useState } from 'react';
import { Info, Sparkles, CheckCircle } from 'lucide-react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
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
    selectedBackground,
    setSelectedBackground,
    selectedComponents,
    setSelectedComponents,
    selectedAnimations,
    setSelectedAnimations,
  } = useBoltBuilder();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDescriptionHelp, setShowDescriptionHelp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [smartDefaultsApplied, setSmartDefaultsApplied] = useState(false);
  const [showSmartDefaultsNotification, setShowSmartDefaultsNotification] = useState(false);
  const [showNLPSection, setShowNLPSection] = useState(false);

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
      selectedBackground,
      selectedComponents,
      selectedAnimations,
    };

    const defaults = applySmartDefaults(projectInfo.type, projectInfo.purpose, currentState);
    const { reasoning } = getSmartDefaults(projectInfo.type, projectInfo.purpose);

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
      if (background) setSelectedBackground(background);
    }

    if (defaults.components) {
      const components = componentOptions.filter((c) => defaults.components?.includes(c.id));
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

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowSmartDefaultsNotification(false);
    }, 5000);
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
        error.errors.forEach((err) => {
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
            <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
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

        {/* Project Description */}
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
            <p className="text-gray-400 text-xs ml-auto">{projectInfo.description.length}/500</p>
          </div>
        </div>

        {/* NLP Input Section */}
        <div className="border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => setShowNLPSection(!showNLPSection)}
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                         bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700
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
