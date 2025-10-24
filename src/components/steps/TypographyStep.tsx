import React from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { fonts, fontWeights, textAlignments, fontSizes, lineHeights } from '../../data/wizardData';
import { Button } from '../ui/button';
import FontCard from '../cards/FontCard';

const TypographyStep: React.FC = () => {
  const { selectedTypography, setSelectedTypography, setCurrentStep } = useBoltBuilder();

  const handleContinue = () => {
    setCurrentStep('visuals');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Choose Your Typography</h2>
        <p className="text-gray-300">Select fonts and styles that enhance readability and reflect your brand.</p>
      </div>

      {/* Font Family Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white/90">Font Family</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fonts.map((font) => (
            <FontCard
              key={font.id}
              font={font}
              selected={selectedTypography.fontFamily === font.family}
              onClick={() => setSelectedTypography({ ...selectedTypography, fontFamily: font.family })}
            />
          ))}
        </div>
      </div>

      {/* Typography Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Heading Weight</label>
          <select
            value={selectedTypography.headingWeight}
            onChange={(e) => setSelectedTypography({ ...selectedTypography, headingWeight: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border-white/20 text-white border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200"
          >
            {fontWeights.map((weight) => (
              <option key={weight} value={weight}>{weight}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Body Weight</label>
          <select
            value={selectedTypography.bodyWeight}
            onChange={(e) => setSelectedTypography({ ...selectedTypography, bodyWeight: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border-white/20 text-white border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200"
          >
            {fontWeights.map((weight) => (
              <option key={weight} value={weight}>{weight}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Heading Size</label>
          <select
            value={selectedTypography.headingSize}
            onChange={(e) => setSelectedTypography({ ...selectedTypography, headingSize: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border-white/20 text-white border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Text Alignment</label>
          <select
            value={selectedTypography.textAlignment}
            onChange={(e) => setSelectedTypography({ ...selectedTypography, textAlignment: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border-white/20 text-white border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200"
          >
            {textAlignments.map((alignment) => (
              <option key={alignment} value={alignment}>{alignment}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Typography Preview */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Typography Preview</h3>
        <div 
          style={{ 
            fontFamily: selectedTypography.fontFamily,
            textAlign: selectedTypography.textAlignment.toLowerCase() as any
          }}
        >
          <h1 
            style={{ 
              fontWeight: selectedTypography.headingWeight === 'Bold' ? '700' : 
                         selectedTypography.headingWeight === 'Light' ? '300' : '400',
              fontSize: selectedTypography.headingSize === 'Large' ? '2.5rem' : 
                        selectedTypography.headingSize === 'Medium' ? '2rem' : '1.5rem'
            }}
            className="mb-4 text-white"
          >
            Welcome to Your Website
          </h1>
          <p 
            style={{ 
              fontWeight: selectedTypography.bodyWeight === 'Bold' ? '700' : 
                         selectedTypography.bodyWeight === 'Light' ? '300' : '400'
            }}
            className="text-gray-300 leading-relaxed"
          >
            This is how your typography will look across your website. The quick brown fox jumps over the lazy dog. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button 
          onClick={() => setCurrentStep('color-theme')}
          variant="outline"
        >
          Back to Color Theme
        </Button>
        
        <Button 
          onClick={handleContinue}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Continue to Visuals
        </Button>
      </div>
    </div>
  );
};

export default TypographyStep;