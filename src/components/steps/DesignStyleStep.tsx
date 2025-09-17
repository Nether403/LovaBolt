import React from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { designStyles } from '../../data/wizardData';
import Button from '../ui/Button';
import DesignStyleCard from '../cards/DesignStyleCard';

const DesignStyleStep: React.FC = () => {
  const { selectedDesignStyle, setSelectedDesignStyle, setCurrentStep } = useBoltBuilder();

  const handleStyleSelect = (styleId: string) => {
    const style = designStyles.find(s => s.id === styleId);
    setSelectedDesignStyle(style || null);
  };

  const handleContinue = () => {
    if (selectedDesignStyle) {
      setCurrentStep('color-theme');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Choose Your Design Style</h2>
        <p className="text-gray-300">Select a design aesthetic that matches your vision and brand personality.</p>
      </div>

      {/* Design Styles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designStyles.map((style) => (
          <DesignStyleCard
            key={style.id}
            style={style}
            selected={selectedDesignStyle?.id === style.id}
            onClick={() => handleStyleSelect(style.id)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button 
          onClick={() => setCurrentStep('layout')}
          variant="outline"
        >
          Back to Layout
        </Button>
        
        <Button 
          onClick={handleContinue}
          disabled={!selectedDesignStyle}
          className={selectedDesignStyle ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
        >
          Continue to Color Theme
        </Button>
      </div>
    </div>
  );
};

export default DesignStyleStep;