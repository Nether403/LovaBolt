import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6">
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
          
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-semibold text-white mb-4">Welcome to LovaBolt!</h3>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                Follow these simple steps to create your perfect website prompt:
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mt-2" />
                  <span>
                    <span className="text-white font-medium">Project Setup:</span> Define your website's name, type, and purpose
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mt-2" />
                  <span>
                    <span className="text-white font-medium">Layout:</span> Choose how your content will be structured
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mt-2" />
                  <span>
                    <span className="text-white font-medium">Design Style:</span> Select the visual theme for your site
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mt-2" />
                  <span>
                    <span className="text-white font-medium">Colors:</span> Pick a color scheme that matches your brand
                  </span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm">
                  Once you complete these steps, LovaBolt will generate a detailed prompt that perfectly captures your vision. 
                  Use this prompt with Bolt, Lovable, and other AI code generators to create your dream website!
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={onClose}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoModal;