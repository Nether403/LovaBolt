import React, { useState } from 'react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { colorThemes } from '../../data/wizardData';
import { Button } from '../ui/button';
import ColorThemeCard from '../cards/ColorThemeCard';

const ColorThemeStep: React.FC = () => {
  const { selectedColorTheme, setSelectedColorTheme, setCurrentStep } = useBoltBuilder();
  const [customColors, setCustomColors] = useState(['#3B82F6', '#1E40AF', '#F59E0B']);

  const handleThemeSelect = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme?.isCustom) {
      setSelectedColorTheme({ ...theme, colors: customColors });
    } else {
      setSelectedColorTheme(theme || null);
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