import React from 'react';
import { X } from 'lucide-react';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { Button } from '../ui/button';

interface PreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ isOpen, onClose }) => {
  const {
    projectInfo,
    selectedLayout,
    selectedDesignStyle,
    selectedColorTheme,
    selectedTypography,
    selectedVisuals,
    selectedFunctionality,
    selectedAnimations,
    setCurrentStep
  } = useBoltBuilder();

  const getLayoutIcon = () => {
    const iconClass = "w-8 h-8 text-blue-500/80";
    
    switch (selectedLayout?.title) {
      case 'Single Column':
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-4 h-12 bg-blue-500/80 rounded-md" />
          </div>
        );
      case 'Two Column':
        return (
          <div className="w-12 h-12 flex items-center justify-center gap-2">
            <div className="w-4 h-12 bg-purple-500/80 rounded-md" />
            <div className="w-4 h-12 bg-purple-500/80 rounded-md" />
          </div>
        );
      case 'Three Column':
        return (
          <div className="w-12 h-12 flex items-center justify-center gap-1">
            <div className="w-3 h-12 bg-teal-500/80 rounded-md" />
            <div className="w-3 h-12 bg-teal-500/80 rounded-md" />
            <div className="w-3 h-12 bg-teal-500/80 rounded-md" />
          </div>
        );
      case 'Grid Layout':
        return (
          <div className="w-12 h-12 grid grid-cols-2 gap-1">
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
          </div>
        );
      case 'Asymmetrical Layout':
        return (
          <div className="w-12 h-12 grid grid-cols-3 gap-1">
            <div className="col-span-2 bg-yellow-500/80 rounded-md" />
            <div className="bg-yellow-500/80 rounded-md" />
            <div className="bg-yellow-500/80 rounded-md" />
            <div className="col-span-2 bg-yellow-500/80 rounded-md" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-4 h-12 bg-blue-500/80 rounded-md" />
          </div>
        );
    }
  };

  const renderDesignPreview = (type: string) => {
    switch (type) {
      case 'material-design':
        return (
          <div className="grid grid-cols-2 gap-1 h-full">
            <div className="bg-blue-500/30 rounded-md shadow-lg" />
            <div className="bg-purple-500/30 rounded-md shadow-lg" />
            <div className="bg-teal-500/30 rounded-md shadow-lg" />
            <div className="bg-pink-500/30 rounded-md shadow-lg" />
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
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Preview Panel */}
      <aside className={`
        bg-black bg-opacity-90 backdrop-blur-lg w-80 p-4 overflow-y-auto 
        transition-all duration-300 ease-in-out relative
        ${isOpen 
          ? 'fixed inset-y-0 right-0 z-50 md:relative md:z-0' 
          : 'hidden md:block'
        }
      `}>
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10">
          {/* Mobile Header */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="font-bold text-xl text-white">Preview</h2>
            <button 
              className="text-white hover:text-white/80 transition-colors"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Preview Content */}
          <div className="space-y-6">
            {/* Project Overview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-2 text-white">Project Overview</h3>
              {projectInfo.name ? (
                <>
                  <p className="font-semibold text-white">{projectInfo.name}</p>
                  <p className="text-sm text-gray-300 mt-1">{projectInfo.purpose}</p>
                  {projectInfo.description && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{projectInfo.description}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-400 italic">No project info provided yet</p>
              )}
            </div>

            {/* Layout Preview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3 text-white">Layout</h3>
              {selectedLayout ? (
                <div className="flex items-center gap-4">
                  {getLayoutIcon()}
                  <h4 className="text-lg font-semibold text-white">{selectedLayout.title}</h4>
                </div>
              ) : (
                <p className="text-red-400">Layout not selected</p>
              )}
            </div>

            {/* Design Style Preview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3 text-white">Design Style</h3>
              {selectedDesignStyle ? (
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">{selectedDesignStyle.title}</h4>
                  <div className="h-20">
                    <div className="w-full h-full overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm p-2">
                      {renderDesignPreview(selectedDesignStyle.id)}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-red-400">Design style not selected</p>
              )}
            </div>

            {/* Color Theme Preview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3 text-white">Color Theme</h3>
              {selectedColorTheme ? (
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">{selectedColorTheme.title}</h4>
                  <div className="flex gap-2">
                    {selectedColorTheme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full ring-2 ring-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-red-400">Color theme not selected</p>
              )}
            </div>

            {/* Typography Preview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3 text-white">Typography</h3>
              <div 
                className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                style={{
                  fontWeight: selectedTypography.headingWeight === 'Bold' ? 'bold' : 
                             selectedTypography.headingWeight === 'Light' ? '300' : 'normal',
                  textAlign: selectedTypography.textAlignment.toLowerCase() as any,
                  fontFamily: selectedTypography.fontFamily
                }}
              >
                <p className="text-xl mb-1 text-white">Sample Text</p>
                <p className="text-sm text-gray-300">This is how your typography will look.</p>
              </div>
            </div>

            {/* Visual Elements Preview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3 text-white">Visual Elements</h3>
              {selectedVisuals.length > 0 ? (
                <div className="space-y-3">
                  {selectedVisuals.slice(0, 3).map((visual, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <p className="font-semibold text-white mb-2">
                        {visual.type}: {visual.style}
                      </p>
                      <div className="aspect-video bg-black/20 rounded-lg" />
                    </div>
                  ))}
                  {selectedVisuals.length > 3 && (
                    <p className="text-sm text-gray-400">
                      +{selectedVisuals.length - 3} more...
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 italic">No visual elements selected yet</p>
              )}
            </div>

            {/* Functionality Preview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3 text-white">Functionality</h3>
              {selectedFunctionality.length > 0 ? (
                <ul className="space-y-1">
                  {selectedFunctionality.slice(0, 5).map((func) => (
                    <li key={func.id} className="text-gray-300 text-sm">
                      • {func.title}
                    </li>
                  ))}
                  {selectedFunctionality.length > 5 && (
                    <li className="text-gray-400 text-sm">
                      +{selectedFunctionality.length - 5} more features...
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-400 italic">No functionality selected yet</p>
              )}
            </div>

            {/* Animations Preview */}
            <div className="glass-card rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-3 text-white">Animations</h3>
              {selectedAnimations.length > 0 ? (
                <ul className="space-y-1">
                  {selectedAnimations.slice(0, 4).map((anim) => (
                    <li key={anim} className="text-gray-300 text-sm">
                      • {anim}
                    </li>
                  ))}
                  {selectedAnimations.length > 4 && (
                    <li className="text-gray-400 text-sm">
                      +{selectedAnimations.length - 4} more animations...
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-400 italic">No animations selected yet</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PreviewPanel;