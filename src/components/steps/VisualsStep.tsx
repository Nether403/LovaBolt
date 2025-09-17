import React from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { visualTypes } from '../../data/wizardData';
import Button from '../ui/Button';
import VisualCard from '../cards/VisualCard';

const VisualsStep: React.FC = () => {
  const { selectedVisuals, setSelectedVisuals, setCurrentStep } = useBoltBuilder();

  const handleVisualSelect = (typeId: string, optionId: string) => {
    setSelectedVisuals(prev => [
      ...prev.filter(v => v.id !== typeId),
      { id: typeId, type: typeId, style: optionId }
    ]);
  };

  const isSelected = (typeId: string, optionId: string): boolean => {
    return selectedVisuals.some(v => v.id === typeId && v.style === optionId);
  };

  const handleContinue = () => {
    setCurrentStep('functionality');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Choose Your Visuals</h2>
        <p className="text-gray-300">Select visual elements that will enhance your website's appearance and user experience.</p>
      </div>

      {/* Visual Types */}
      <div className="space-y-12">
        {visualTypes.map((type) => (
          <div key={type.id} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 text-white/80">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{type.title}</h3>
                <p className="text-sm text-gray-300">{type.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {type.options.map((option) => (
                <VisualCard
                  key={option.id}
                  type={type.id}
                  option={option}
                  selected={isSelected(type.id, option.id)}
                  onClick={() => handleVisualSelect(type.id, option.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button 
          onClick={() => setCurrentStep('typography')}
          variant="outline"
        >
          Back to Typography
        </Button>
        
        <Button 
          onClick={handleContinue}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Continue to Functionality
        </Button>
      </div>
    </div>
  );
};

export default VisualsStep;