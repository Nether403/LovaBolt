import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6 max-h-[90vh] flex">
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden flex flex-col w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
          
          <div className="relative p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">How to Use LovaBolt</h3>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 pr-2">
              <div className="space-y-4 text-gray-300">
                <p>Follow these steps to generate a detailed prompt for your website design:</p>
                
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    <span className="text-white font-medium">Project Setup</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Enter your website's name and description</li>
                      <li>Choose the project type and purpose</li>
                      <li>Define your target audience</li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className="text-white font-medium">Layout Selection</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Choose a primary layout structure</li>
                      <li>Add special layout features as needed</li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className="text-white font-medium">Design Style</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Select from modern design approaches</li>
                      <li>Preview component styles</li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className="text-white font-medium">Color Theme</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Pick predefined palettes or create custom colors</li>
                      <li>See color distribution and accessibility</li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className="text-white font-medium">Typography</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Choose font families and weights</li>
                      <li>Set text alignment and sizing</li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className="text-white font-medium">Visual Elements</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Select icon and illustration styles</li>
                      <li>Choose image types and patterns</li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className="text-white font-medium">Functionality</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Choose a functionality tier</li>
                      <li>Add technical requirements</li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className="text-white font-medium">Preview & Generate</span>
                    <ul className="ml-6 mt-1 space-y-1 list-disc text-sm">
                      <li>Review all selections</li>
                      <li>Generate and copy your prompt</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm">
                    <span className="text-white font-medium">Pro Tip:</span> Use the preview panel 
                    to see your selections in real-time. This helps ensure your choices work well 
                    together before generating the final prompt.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end pt-4 border-t border-white/10">
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpModal;