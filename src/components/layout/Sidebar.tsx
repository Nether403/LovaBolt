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
  X,
  Undo2,
  Redo2,
} from 'lucide-react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentStep, setCurrentStep, canUndo, canRedo, undo, redo } = useBoltBuilder();

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    if (isOpen) onClose();
  };

  const navigationItems = [
    { id: 'project-setup', label: 'Project Setup', number: 1, icon: <Settings size={20} /> },
    { id: 'functionality', label: 'Functionality', number: 2, icon: <FunctionSquare size={20} /> },
    { id: 'layout', label: 'Layout', number: 3, icon: <LayoutGrid size={20} /> },
    { id: 'design-style', label: 'Design Style', number: 4, icon: <Palette size={20} /> },
    { id: 'color-theme', label: 'Color Theme', number: 5, icon: <Palette size={20} /> },
    { id: 'typography', label: 'Typography', number: 6, icon: <Type size={20} /> },
    { id: 'visuals', label: 'Visuals', number: 7, icon: <Image size={20} /> },
    { id: 'background', label: 'Background', number: 8, icon: <Image size={20} /> },
    { id: 'components', label: 'Components', number: 9, icon: <LayoutGrid size={20} /> },
    { id: 'animations', label: 'Animations', number: 10, icon: <Play size={20} /> },
    { id: 'preview', label: 'Preview', number: 11, icon: <Monitor size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-gray-800 bg-opacity-90 backdrop-blur-lg text-white w-64 flex-shrink-0 
          overflow-y-auto transition-all duration-300 ease-in-out
          ${
            isOpen
              ? 'fixed inset-y-0 left-0 z-50 md:relative md:z-0 md:translate-x-0'
              : 'fixed -translate-x-full md:relative md:translate-x-0'
          }
        `}
        aria-label="Wizard navigation sidebar"
        role="navigation"
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-bold text-xl">Navigation</h2>
          <button
            className="text-white hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-1"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Undo/Redo Controls */}
        <div className="p-4 border-b border-white/10">
          <div className="flex gap-2" role="group" aria-label="History controls">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`
                flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                transition-all duration-300 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800
                ${
                  canUndo
                    ? 'bg-teal-600/20 hover:bg-teal-600/30 border border-teal-500/30 text-white hover:shadow-[0_0_10px_rgba(20,184,166,0.3)]'
                    : 'bg-gray-700/20 border border-gray-600/20 text-gray-500 cursor-not-allowed'
                }
              `}
              aria-label="Undo last action (Ctrl+Z)"
              aria-disabled={!canUndo}
            >
              <Undo2 size={16} aria-hidden="true" />
              <span className="text-sm">Undo</span>
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`
                flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                transition-all duration-300 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800
                ${
                  canRedo
                    ? 'bg-teal-600/20 hover:bg-teal-600/30 border border-teal-500/30 text-white hover:shadow-[0_0_10px_rgba(20,184,166,0.3)]'
                    : 'bg-gray-700/20 border border-gray-600/20 text-gray-500 cursor-not-allowed'
                }
              `}
              aria-label="Redo last undone action (Ctrl+Shift+Z)"
              aria-disabled={!canRedo}
            >
              <Redo2 size={16} aria-hidden="true" />
              <span className="text-sm">Redo</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4" aria-label="Wizard steps">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <div className="relative group">
                  <button
                    className={`
                      w-full text-left px-4 py-3 rounded-lg flex items-center 
                      transition-all duration-300 backdrop-blur-sm
                      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800
                      ${
                        currentStep === item.id
                          ? 'bg-blue-500/20 border border-blue-300/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                          : 'text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                      }
                    `}
                    onClick={() => handleStepChange(item.id)}
                    aria-label={`Step ${item.number}: ${item.label}`}
                    aria-current={currentStep === item.id ? 'step' : undefined}
                  >
                    <span
                      className="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-semibold"
                      aria-hidden="true"
                    >
                      {item.number}
                    </span>
                    <span className="mr-3" aria-hidden="true">
                      {item.icon}
                    </span>
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
