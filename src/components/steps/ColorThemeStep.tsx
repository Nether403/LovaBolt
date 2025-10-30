import React, { useState } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { colorThemes } from '../../data/wizardData';
import { Button } from '../ui/button';
import ColorThemeCard from '../cards/ColorThemeCard';

const ColorThemeStep: React.FC = () => {
  const { selectedColorTheme, setSelectedColorTheme, setCurrentStep } = useBoltBuilder();
  const [customColors, setCustomColors] = useState(['#3B82F6', '#1E40AF', '#F59E0B']);
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | 'system'>('system');

  const handleThemeSelect = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme?.isCustom) {
      setSelectedColorTheme({ ...theme, colors: customColors, darkMode });
    } else {
      setSelectedColorTheme(theme ? { ...theme, darkMode } : null);
    }
  };

  const handleDarkModeChange = (mode: 'light' | 'dark' | 'system') => {
    setDarkMode(mode);
    if (selectedColorTheme) {
      setSelectedColorTheme({ ...selectedColorTheme, darkMode: mode });
    }
  };

  const handleCustomColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
    
    if (selectedColorTheme?.isCustom) {
      setSelectedColorTheme({ ...selectedColorTheme, colors: newColors });
    }
  };

  const handleContinue = () => {
    if (selectedColorTheme) {
      setCurrentStep('typography');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">Choose Your Color Theme</h2>
        <p className="text-gray-300">Select a color palette that reflects your brand and creates the right mood.</p>
      </div>

      {/* Dark Mode Selection */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Default Color Mode</h3>
        <p className="text-gray-300 text-sm mb-4">Choose the default color mode for your website</p>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleDarkModeChange('light')}
            className={`
              relative overflow-hidden rounded-xl p-4 transition-all duration-300
              ${darkMode === 'light' ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
            `}
          >
            <div className="absolute inset-0 glass-card" />
            <div className="relative text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <p className="text-white font-medium">Light Mode</p>
            </div>
          </button>
          
          <button
            onClick={() => handleDarkModeChange('dark')}
            className={`
              relative overflow-hidden rounded-xl p-4 transition-all duration-300
              ${darkMode === 'dark' ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
            `}
          >
            <div className="absolute inset-0 glass-card" />
            <div className="relative text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </div>
              <p className="text-white font-medium">Dark Mode</p>
            </div>
          </button>
          
          <button
            onClick={() => handleDarkModeChange('system')}
            className={`
              relative overflow-hidden rounded-xl p-4 transition-all duration-300
              ${darkMode === 'system' ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
            `}
          >
            <div className="absolute inset-0 glass-card" />
            <div className="relative text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-white to-gray-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <p className="text-white font-medium">System</p>
            </div>
          </button>
        </div>
      </div>

      {/* Color Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colorThemes.map((theme) => (
          <ColorThemeCard
            key={theme.id}
            theme={theme}
            selected={selectedColorTheme?.id === theme.id}
            onClick={() => handleThemeSelect(theme.id)}
            customColors={customColors}
            onCustomColorChange={handleCustomColorChange}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button 
          onClick={() => setCurrentStep('design-style')}
          variant="outline"
        >
          Back to Design Style
        </Button>
        
        <Button 
          onClick={handleContinue}
          disabled={!selectedColorTheme}
          className={selectedColorTheme ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
        >
          Continue to Typography
        </Button>
      </div>
    </div>
  );
};

export default ColorThemeStep;