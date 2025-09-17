import React from 'react';
import { Menu, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

interface HeaderProps {
  onGeneratePrompt: () => void;
  onToggleSidebar: () => void;
  onTogglePreview: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGeneratePrompt, onToggleSidebar, onTogglePreview }) => {
  const { progress } = useBoltBuilder();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md px-4 py-3 shadow-sm flex items-center justify-between border-b border-white/10">
      {/* Left Section */}
      <div className="flex items-center">
        <button
          className="mr-3 md:hidden text-white hover:text-white/80 transition-colors"
          onClick={onToggleSidebar}
        >
          <Menu size={24} />
        </button>
        <h1 
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-white cursor-pointer hover:text-white/80 transition-colors"
        >
          LovaBolt
        </h1>
      </div>

      {/* Center Section - Progress (Desktop) */}
      <div className="hidden md:block w-1/3 mx-4">
        <ProgressBar progress={progress} />
        <div className="text-center text-sm mt-1 text-gray-300">
          {progress}% Complete
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          className="mr-2 md:hidden text-white hover:text-white/80 transition-colors"
          onClick={onTogglePreview}
        >
          <Monitor size={24} />
        </button>
        
        <Button onClick={onGeneratePrompt}>
          Generate Prompt
        </Button>
      </div>
    </header>
  );
};

export default Header;