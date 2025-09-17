import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface FunctionalityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  features: string[];
  tier?: string;
}

const FunctionalityModal: React.FC<FunctionalityModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  features,
  tier
}) => {
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
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {title}
                {tier && <span className="ml-2 text-sm text-teal-400">({tier} tier)</span>}
              </h3>
              <p className="text-gray-300">{description}</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-white">Features Include:</h4>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mr-3 mt-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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

export default FunctionalityModal;