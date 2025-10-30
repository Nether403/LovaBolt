import React, { useState } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { Button } from '../ui/button';
import PromptModal from '../modals/PromptModal';

const PreviewStep: React.FC = () => {
  const {
    projectInfo,
    selectedLayout,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedFunctionality,
    generatePrompt,
    generateBasicPrompt,
    setCurrentStep,
    setPromptText,
    setPromptType,
    promptText,
    promptType
  } = useBoltBuilder();
  
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const generatePromptType = (type: 'basic' | 'detailed') => {
    const prompt = type === 'basic' ? generateBasicPrompt() : generatePrompt();
    setPromptText(prompt);
    setPromptType(type);
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
              <p className="text-white"><span className="font-semibold">Name:</span> {projectInfo.name}</p>
              <p className="text-white"><span className="font-semibold">Type:</span> {projectInfo.type}</p>
              <p className="text-white"><span className="font-semibold">Purpose:</span> {projectInfo.purpose}</p>
              <p className="text-gray-300 text-sm mt-3">{projectInfo.description}</p>
            </div>
          ) : (
            <p className="text-red-400">Project information missing</p>
          )}
          <Button 
            onClick={() => setCurrentStep('project-setup')}
            className="mt-4"
            size="sm"
          >
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
          <Button 
            onClick={() => setCurrentStep('layout')}
            className="mt-4"
            size="sm"
          >
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
          <Button 
            onClick={() => setCurrentStep('design-style')}
            className="mt-4"
            size="sm"
          >
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
          <Button 
            onClick={() => setCurrentStep('color-theme')}
            className="mt-4"
            size="sm"
          >
            Edit Color Theme
          </Button>
        </div>

        {/* Typography */}
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 text-white">Typography</h3>
          <div 
            className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
            style={{ 
              fontFamily: selectedTypography.fontFamily,
              textAlign: selectedTypography.textAlignment.toLowerCase() as any
            }}
          >
            <p className="text-lg mb-1 text-white" style={{ 
              fontWeight: selectedTypography.headingWeight === 'Bold' ? '700' : 
                         selectedTypography.headingWeight === 'Light' ? '300' : '400'
            }}>
              {selectedTypography.fontFamily.split(',')[0].replace(/'/g, '')}
            </p>
            <p className="text-sm text-gray-300">Sample typography preview</p>
          </div>
          <Button 
            onClick={() => setCurrentStep('typography')}
            className="mt-4"
            size="sm"
          >
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
          <Button 
            onClick={() => setCurrentStep('functionality')}
            className="mt-4"
            size="sm"
          >
            Edit Functionality
          </Button>
        </div>
      </div>

      {/* Generate Prompt */}
      <div className="flex justify-center pt-8">
        <Button 
          onClick={() => {
            generatePromptType('detailed');
            setIsPromptModalOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
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