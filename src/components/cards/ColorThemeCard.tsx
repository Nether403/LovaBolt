import React from 'react';
import { ColorTheme } from '../../types';

interface ColorThemeCardProps {
  theme: ColorTheme;
  selected: boolean;
  onClick: () => void;
  customColors?: string[];
  onCustomColorChange?: (index: number, color: string) => void;
}

const ColorThemeCard: React.FC<ColorThemeCardProps> = ({
  theme,
  selected,
  onClick,
  customColors = [],
  onCustomColorChange
}) => {
  const displayColors = theme.isCustom ? customColors : theme.colors;

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {displayColors.map((color, index) => (
              <div key={index} className="relative group">
                {theme.isCustom && onCustomColorChange ? (
                  <>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => onCustomColorChange(index, e.target.value)}
                      className="w-8 h-8 rounded-full ring-2 ring-white/20 cursor-pointer opacity-0 absolute inset-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div
                      className="w-8 h-8 rounded-full ring-2 ring-white/20 hover:ring-white/40 transition-all"
                      style={{ backgroundColor: color }}
                    />
                  </>
                ) : (
                  <div
                    className="w-8 h-8 rounded-full ring-2 ring-white/20"
                    style={{ backgroundColor: color }}
                  />
                )}
              </div>
            ))}
          </div>
          
          {selected && (
            <div className="bg-teal-500/20 p-1 rounded-full">
              <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-white">{theme.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{theme.description}</p>
        
        {theme.isCustom && (
          <p className="text-xs text-teal-400 mt-3">Click color dots to customize</p>
        )}
      </div>
    </div>
  );
};

export default ColorThemeCard;