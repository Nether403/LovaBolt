import React from 'react';
import { 
  Settings, 
  LayoutGrid, 
  Palette, 
  Type, 
  Image, 
  FunctionSquare, 
  Play, 
  Monitor,
  X
} from 'lucide-react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentStep, setCurrentStep } = useBoltBuilder();

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    if (isOpen) onClose();
  };

  const navigationItems = [
    { id: 'project-setup', label: 'Project Setup', icon: <Settings size={20} /> },
    { id: 'layout', label: 'Layout', icon: <LayoutGrid size={20} /> },
    { id: 'design-style', label: 'Design Style', icon: <Palette size={20} /> },
    { id: 'color-theme', label: 'Color Theme', icon: <Palette size={20} /> },
    { id: 'typography', label: 'Typography', icon: <Type size={20} /> },
    { id: 'visuals', label: 'Visuals', icon: <Image size={20} /> },
    { id: 'functionality', label: 'Functionality', icon: <FunctionSquare size={20} /> },
    { id: 'animations', label: 'UI/UX Animations', icon: <Play size={20} /> },
    { id: 'preview', label: 'Preview', icon: <Monitor size={20} /> }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        bg-gray-800 bg-opacity-90 backdrop-blur-lg text-white w-64 flex-shrink-0 
        overflow-y-auto transition-all duration-300 ease-in-out
        ${isOpen 
          ? 'fixed inset-y-0 left-0 z-50 md:relative md:z-0 md:translate-x-0' 
          : 'fixed -translate-x-full md:relative md:translate-x-0'
        }
      `}>
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-bold text-xl">Navigation</h2>
          <button 
            className="text-white hover:text-teal-400 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <div className="relative group">
                  <button
                    className={`
                      w-full text-left px-4 py-3 rounded-lg flex items-center 
                      transition-all duration-300 backdrop-blur-sm
                      ${currentStep === item.id
                        ? 'bg-blue-500/20 border border-blue-300/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                        : 'text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                      }
                    `}
                    onClick={() => handleStepChange(item.id)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;