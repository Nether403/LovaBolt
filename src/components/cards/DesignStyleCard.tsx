import React from 'react';
import { DesignStyle } from '../../types';

interface DesignStyleCardProps {
  style: DesignStyle;
  selected: boolean;
  onClick: () => void;
}

const DesignStyleCard: React.FC<DesignStyleCardProps> = ({ style, selected, onClick }) => {
  const renderPreview = (styleId: string) => {
    switch (styleId) {
      case 'material-design':
        return (
          <div className="grid grid-cols-2 gap-1 h-full">
            <div className="bg-blue-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-purple-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-teal-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-pink-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
          </div>
        );
      case 'glassmorphism':
        return (
          <div className="grid grid-cols-3 gap-1 h-full">
            <div className="col-span-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20" />
            <div className="bg-white/20 backdrop-blur-lg rounded-lg border border-white/20" />
            <div className="bg-white/15 backdrop-blur-lg rounded-lg border border-white/20" />
            <div className="col-span-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20" />
          </div>
        );
      case 'organic-design':
        return (
          <div className="relative h-full">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-teal-500/20 rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-green-500/20 rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/3 bg-emerald-500/20 rounded-full" />
          </div>
        );
      case 'minimalist':
        return (
          <div className="grid grid-cols-6 gap-1 h-full">
            <div className="col-span-4 bg-white/5 rounded" />
            <div className="col-span-2 bg-white/10 rounded" />
            <div className="col-span-3 bg-white/5 rounded" />
            <div className="col-span-3 bg-white/10 rounded" />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-4 gap-1 h-full">
            <div className="col-span-2 bg-white/10 rounded-md" />
            <div className="bg-white/15 rounded-md" />
            <div className="bg-white/20 rounded-md" />
            <div className="bg-white/15 rounded-md" />
            <div className="col-span-3 bg-white/10 rounded-md" />
          </div>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-6">
        <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm p-2">
          {renderPreview(style.id)}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-white">{style.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{style.description}</p>
      </div>
    </div>
  );
};

export default DesignStyleCard;