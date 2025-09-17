import React from 'react';
import { Font } from '../../types';

interface FontCardProps {
  font: Font;
  selected: boolean;
  onClick: () => void;
}

const FontCard: React.FC<FontCardProps> = ({ font, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-4 flex flex-col">
        <h3 
          className="text-xl mb-2 text-white" 
          style={{ fontFamily: font.family }}
        >
          {font.name}
        </h3>
        <p 
          className="text-sm text-gray-300 line-clamp-2" 
          style={{ fontFamily: font.family }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
        <span className="text-xs text-teal-400 mt-2 capitalize">{font.style}</span>
      </div>
    </div>
  );
};

export default FontCard;