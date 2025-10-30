import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { functionalityOptions } from '../../data/wizardData';
import { FunctionalityOption } from '../../types';
import { Button } from '../ui/button';
import FunctionalityModal from '../modals/FunctionalityModal';

const FunctionalityStep: React.FC = () => {
  const { selectedFunctionality, setSelectedFunctionality, setCurrentStep } = useBoltBuilder();
  const [modalState, setModalState] = useState<{ isOpen: boolean; option: any }>({
    isOpen: false,
    option: null
  });

  const handleOptionSelect = (optionId: string) => {
    const option = functionalityOptions.find(o => o.id === optionId);
    if (!option) return;

    setSelectedFunctionality((prev: FunctionalityOption[]) => {
      if (option.category === 'functionality') {
        // Replace existing functionality tier
        return [...prev.filter((item: FunctionalityOption) => !item.tier), option];
      } else {
        // Toggle technical requirement
        return prev.some((item: FunctionalityOption) => item.id === optionId)
          ? prev.filter((item: FunctionalityOption) => item.id !== optionId)
          : [...prev, option];
      }
    });
  };

  const showDetails = (e: React.MouseEvent, option: any) => {
    e.stopPropagation();
    setModalState({ isOpen: true, option });
  };

  const handleContinue = () => {
    setCurrentStep('layout');
  };

  const tiers = ['basic', 'standard', 'advanced', 'enterprise'];
  const functionalityTiers = functionalityOptions.filter(o => o.category === 'functionality');
  const technicalOptions = functionalityOptions.filter(o => o.category === 'technical');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Functionality & Features</h2>
        <p className="text-gray-300">Select a functionality tier and additional technical requirements for your project.</p>
      </div>

      {/* Functionality Tiers */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white/90">Functionality Tiers</h3>
        <p className="text-sm text-gray-400 mb-6">Choose one tier that best fits your needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => {
            const option = functionalityTiers.find(o => o.tier === tier);
            if (!option) return null;
            
            const isSelected = selectedFunctionality.some(item => item.id === option.id);
            
            return (
              <div
                key={tier}
                onClick={() => handleOptionSelect(option.id)}
                className={`
                  relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group
                  ${isSelected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
                `}
              >
                <div className="absolute inset-0 glass-card" />
                <div className="relative p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">{option.title}</h4>
                    {isSelected && (
                      <div className="bg-teal-500/20 p-1 rounded-full">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 flex-grow">{option.description}</p>
                  
                  <button
                    onClick={(e) => showDetails(e, option)}
                    className="inline-flex items-center text-sm text-teal-400 hover:text-teal-300 transition-colors mt-auto"
                  >
                    View Features
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Requirements */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white/90">Technical Requirements</h3>
        <p className="text-sm text-gray-400 mb-6">Select additional technical features as needed</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalOptions.map((option) => {
            const isSelected = selectedFunctionality.some(item => item.id === option.id);
            
            return (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`
                  relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group
                  ${isSelected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
                `}
              >
                <div className="absolute inset-0 glass-card" />
                <div className="relative p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">{option.title}</h4>
                    {isSelected && (
                      <div className="bg-teal-500/20 p-1 rounded-full">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 flex-grow">{option.description}</p>
                  
                  <button
                    onClick={(e) => showDetails(e, option)}
                    className="inline-flex items-center text-sm text-teal-400 hover:text-teal-300 transition-colors mt-auto"
                  >
                    View Features
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
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
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Continue to Layout
        </Button>
      </div>

      {/* Functionality Modal */}
      <FunctionalityModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, option: null })}
        title={modalState.option?.title || ''}
        description={modalState.option?.description || ''}
        features={modalState.option?.features || []}
        tier={modalState.option?.tier}
      />
    </div>
  );
};

export default FunctionalityStep;