import React, { useState } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { animationTypes } from '../../data/wizardData';
import Button from '../ui/Button';
import AnimationCard from '../cards/AnimationCard';

const AnimationsStep: React.FC = () => {
  const { selectedAnimations, setSelectedAnimations, setCurrentStep } = useBoltBuilder();
  const [hoveredAnimation, setHoveredAnimation] = useState<string | null>(null);

  const handleAnimationSelect = (animationId: string) => {
    setSelectedAnimations(prev => 
      prev.includes(animationId)
        ? prev.filter(id => id !== animationId)
        : [...prev, animationId]
    );
  };

  const handleContinue = () => {
    setCurrentStep('preview');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">UI/UX Animations</h2>
        <p className="text-gray-300">Select animations and micro-interactions to enhance user experience.</p>
      </div>

      {/* Animation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animationTypes.map((animation) => {
          const isSelected = selectedAnimations.includes(animation.id);
          const isHovered = hoveredAnimation === animation.id;
          
          return (
            <AnimationCard
              key={animation.id}
              animation={animation}
              selected={isSelected}
              isActive={isHovered || isSelected}
              onClick={() => handleAnimationSelect(animation.id)}
              onMouseEnter={() => setHoveredAnimation(animation.id)}
              onMouseLeave={() => setHoveredAnimation(null)}
            />
          );
        })}
      </div>

      {/* Selected Animations Summary */}
      {selectedAnimations.length > 0 && (
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Selected Animations</h3>
          <div className="flex flex-wrap gap-2">
            {selectedAnimations.map((animId) => {
              const animation = animationTypes.find(a => a.id === animId);
              return animation ? (
                <span 
                  key={animId}
                  className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm border border-teal-500/30"
                >
                  {animation.title}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button 
          onClick={() => setCurrentStep('functionality')}
          variant="outline"
        >
          Back to Functionality
        </Button>
        
        <Button 
          onClick={handleContinue}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Continue to Preview
        </Button>
      </div>
    </div>
  );
};

export default AnimationsStep;