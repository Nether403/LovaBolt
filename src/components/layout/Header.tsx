import React from 'react';
import { Menu, Monitor, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBoltBuilderStore, selectProgress } from '../../stores/boltBuilderStore';
import { AccountControl } from '../auth/AccountControl';
import { Button } from '../ui/button';
import ProgressBar from '../ui/ProgressBar';

interface HeaderProps {
  onGeneratePrompt: () => void;
  onToggleSidebar: () => void;
  onTogglePreview: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGeneratePrompt, onToggleSidebar, onTogglePreview }) => {
  const progress = useBoltBuilderStore(selectProgress);
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
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Wand2 className="w-8 h-8 text-blue-500 rotate-12 transform-gpu hover:rotate-45 transition-transform duration-500" />
          <h1 className="text-2xl font-bold text-white">WebKnot</h1>
        </div>
      </div>

      {/* Center Section - Progress (Desktop) */}
      <div className="hidden md:block w-1/3 mx-4">
        <ProgressBar progress={progress} />
        <div className="text-center text-sm mt-1 text-gray-300">{progress}% Complete</div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          className="mr-2 md:hidden text-white hover:text-white/80 transition-colors"
          onClick={onTogglePreview}
        >
          <Monitor size={24} />
        </button>

        {/* Auth affordance: sign-in button or account menu (shared component) */}
        <AccountControl />

        <Button onClick={onGeneratePrompt}>Generate Prompt</Button>
      </div>
    </header>
  );
};

export default Header;
