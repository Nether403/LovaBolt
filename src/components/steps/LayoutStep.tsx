import React from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { layoutOptions } from '../../data/wizardData';
import Button from '../ui/Button';
import LayoutCard from '../cards/LayoutCard';

const LayoutStep: React.FC = () => {
  const {
    selectedLayout,
    setSelectedLayout,
    selectedSpecialLayouts,
    setSelectedSpecialLayouts,
    setCurrentStep
  } = useBoltBuilder();

  const handleLayoutSelect = (layoutId: string, isPrimary: boolean) => {
    const layout = layoutOptions.find(l => l.id === layoutId);
    if (!layout) return;

    if (isPrimary) {
      setSelectedLayout(layout);
    } else {
      setSelectedSpecialLayouts(prev => 
        prev.some(l => l.id === layout.id)
          ? prev.filter(l => l.id !== layout.id)
          : [...prev, layout]
      );
    }
  };

  const handleContinue = () => {
    if (selectedLayout) {
      setCurrentStep('design-style');
    }
  };

  const columnLayouts = layoutOptions.filter(layout => layout.category === 'column');
  const specialLayouts = layoutOptions.filter(layout => layout.category === 'special');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Select Your Layout</h2>
        <p className="text-gray-300">Choose a primary layout structure and add special features as needed.</p>
      </div>

      <div className="space-y-12">
        {/* Primary Layout Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white/90">
            Primary Layout <span className="text-sm font-normal text-red-400">(Choose One)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {columnLayouts.map((layout) => (
              <LayoutCard
                key={layout.id}
                title={layout.title}
                description={layout.description}
                selected={selectedLayout?.id === layout.id}
                onClick={() => handleLayoutSelect(layout.id, true)}
              />
            ))}
          </div>
        </div>

        {/* Special Layout Features */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white/90">
            Special Features <span className="text-sm font-normal text-white/60">(Select Multiple)</span>
          </h3>
          <p className="text-gray-300 text-sm mb-6">Add these layout components to enhance your website</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialLayouts.map((layout) => (
              <LayoutCard
                key={layout.id}
                title={layout.title}
                description={layout.description}
                selected={selectedSpecialLayouts.some(l => l.id === layout.id)}
                onClick={() => handleLayoutSelect(layout.id, false)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button 
          onClick={() => setCurrentStep('project-setup')}
          variant="outline"
        >
          Back to Project Setup
        </Button>
        
        <Button 
          onClick={handleContinue}
          disabled={!selectedLayout}
          className={selectedLayout ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
        >
          Continue to Design Style
        </Button>
      </div>
    </div>
  );
};

export default LayoutStep;