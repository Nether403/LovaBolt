import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
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
            
            <h3 className="text-xl font-semibold text-white mb-4">About LovaBolt</h3>
            
            <div className="space-y-4 text-gray-300">
              <p>
                LovaBolt is an advanced prompt generator designed specifically for AI development tools 
                like Bolt.new and Lovable.dev. Our intelligent wizard guides you through every aspect 
                of website design specification.
              </p>
              
              <p>
                From layout selection to visual styling, typography choices to functionality requirements, 
                LovaBolt ensures no detail is overlooked. The generated prompts are optimized for AI 
                understanding, leading to better results and faster development.
              </p>
              
              <p>
                Whether you're building a portfolio, business website, or complex web application, 
                LovaBolt helps you communicate your vision effectively, bridging the gap between 
                creative ideas and technical implementation.
              </p>
              
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400 italic">
                  LovaBolt is an independent platform designed to enhance your experience with 
                  AI-powered development tools.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
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

export default AboutModal;