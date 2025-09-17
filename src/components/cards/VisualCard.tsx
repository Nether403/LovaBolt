import React from 'react';

interface VisualOption {
  id: string;
  title: string;
  description: string;
}

interface VisualCardProps {
  type: string;
  option: VisualOption;
  selected: boolean;
  onClick: () => void;
}

const VisualCard: React.FC<VisualCardProps> = ({ type, option, selected, onClick }) => {
  const renderPreview = () => {
    switch (type) {
      case 'icons':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
        );
      case 'illustrations':
        return (
          <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg transform rotate-12" />
            <div className="w-8 h-8 bg-white/30 rounded-lg transform -rotate-12 ml-2" />
          </div>
        );
      case 'images':
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
        );
      case 'patterns':
        return (
          <div className="w-full h-full bg-black/20 p-2">
            <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-sm" />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-4">
        <div className="aspect-video mb-3 bg-black/20 rounded-lg overflow-hidden">
          {renderPreview()}
        </div>
        
        <h4 className="text-lg font-semibold mb-1 text-white">{option.title}</h4>
        <p className="text-sm text-gray-300">{option.description}</p>
      </div>
    </div>
  );
};

export default VisualCard;