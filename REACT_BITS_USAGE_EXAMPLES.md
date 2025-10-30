# React-Bits Usage Examples

Practical examples for implementing and using react-bits components in LovaBolt.

## Table of Contents

- [Step Component Examples](#step-component-examples)
- [Card Component Examples](#card-component-examples)
- [Modal Component Examples](#modal-component-examples)
- [Context Usage Examples](#context-usage-examples)
- [Prompt Generation Examples](#prompt-generation-examples)
- [Custom Implementations](#custom-implementations)

---

## Step Component Examples

### Example 1: Basic Background Step

```typescript
import React, { useState } from 'react';
import { useBoltBuilder } from '@/contexts/BoltBuilderContext';
import { backgroundOptions } from '@/data/reactBitsData';
import { BackgroundOption } from '@/types';
import { ReactBitsCard } from '@/components/cards/ReactBitsCard';
import { ReactBitsModal } from '@/components/modals/ReactBitsModal';

const BackgroundStep: React.FC = () => {
  const { selectedBackground, setSelectedBackground, setCurrentStep } = useBoltBuilder();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    option: BackgroundOption | null;
  }>({ isOpen: false, option: null });

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Background Effects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backgroundOptions.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedBackground?.id === option.id}
            onSelect={() => setSelectedBackground(option)}
            onViewDetails={(e) => {
              e.stopPropagation();
              setModalState({ isOpen: true, option });
            }}
          />
        ))}
      </div>

      {selectedBackground && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-2">
            Installation Command
          </h3>
          <code className="text-sm text-teal-400">
            {selectedBackground.cliCommand}
          </code>
        </div>
      )}

      <ReactBitsModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, option: null })}
        option={modalState.option}
      />
    </div>
  );
};
```

### Example 2: Components Step with Filtering

```typescript
import React, { useState, useMemo } from 'react';
import { useBoltBuilder } from '@/contexts/BoltBuilderContext';
import { componentOptions } from '@/data/reactBitsData';
import { ComponentOption } from '@/types';

const ComponentsStep: React.FC = () => {
  const { selectedComponents, setSelectedComponents } = useBoltBuilder();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDependency, setFilterDependency] = useState<string | null>(null);

  // Filter components based on search and dependency
  const filteredComponents = useMemo(() => {
    return componentOptions.filter(comp => {
      const matchesSearch = comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comp.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDependency = !filterDependency || 
                               comp.dependencies.includes(filterDependency);
      return matchesSearch && matchesDependency;
    });
  }, [searchTerm, filterDependency]);

  const handleToggle = (option: ComponentOption) => {
    setSelectedComponents(prev =>
      prev.some(item => item.id === option.id)
        ? prev.filter(item => item.id !== option.id)
        : [...prev, option]
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">UI Components</h2>
        <p className="text-gray-300">
          {selectedComponents.length} selected • {filteredComponents.length} shown
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 rounded-lg text-white"
        />
        <select
          value={filterDependency || ''}
          onChange={(e) => setFilterDependency(e.target.value || null)}
          className="px-4 py-2 bg-gray-800 rounded-lg text-white"
        >
          <option value="">All Dependencies</option>
          <option value="motion">Motion</option>
          <option value="gsap">GSAP</option>
        </select>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedComponents.some(item => item.id === option.id)}
            onSelect={() => handleToggle(option)}
            onViewDetails={(e) => {
              e.stopPropagation();
              // Open modal logic
            }}
          />
        ))}
      </div>
    </div>
  );
};
```

### Example 3: Animations Step with Categories

```typescript
import React, { useState } from 'react';
import { useBoltBuilder } from '@/contexts/BoltBuilderContext';
import { animationOptions } from '@/data/reactBitsData';
import { AnimationOption } from '@/types';

type AnimationCategory = 'cursor' | 'entrance' | 'scroll' | 'hover' | 'loading' | 'all';

const AnimationsStep: React.FC = () => {
  const { selectedAnimations, setSelectedAnimations } = useBoltBuilder();
  const [activeCategory, setActiveCategory] = useState<AnimationCategory>('all');

  const categories = {
    cursor: ['blob-cursor', 'following-pointer'],
    entrance: ['fade-in', 'slide-in', 'scale-in', 'rotate-in', 'bounce-in', 'blur-in'],
    scroll: ['scroll-reveal', 'parallax', 'text-reveal'],
    hover: ['hover-lift', 'hover-glow', 'hover-shine', 'magnetic-button'],
    loading: ['loading-spinner', 'skeleton-loader', 'pulse'],
  };

  const filteredAnimations = activeCategory === 'all'
    ? animationOptions
    : animationOptions.filter(anim => 
        categories[activeCategory]?.includes(anim.id)
      );

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">UI/UX Animations</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {(['all', 'cursor', 'entrance', 'scroll', 'hover', 'loading'] as AnimationCategory[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              activeCategory === cat
                ? 'bg-teal-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Animation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimations.map((option) => (
          <ReactBitsCard
            key={option.id}
            option={option}
            isSelected={selectedAnimations.some(item => item.id === option.id)}
            onSelect={() => {
              setSelectedAnimations(prev =>
                prev.some(item => item.id === option.id)
                  ? prev.filter(item => item.id !== option.id)
                  : [...prev, option]
              );
            }}
            onViewDetails={(e) => {
              e.stopPropagation();
              // Open modal logic
            }}
          />
        ))}
      </div>
    </div>
  );
};
```

---

## Card Component Examples

### Example 1: Custom Card with Preview

```typescript
import React from 'react';
import { ReactBitsComponent } from '@/types';
import { ChevronRight } from 'lucide-react';

interface CustomReactBitsCardProps {
  option: ReactBitsComponent;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: (e: React.MouseEvent) => void;
  showPreview?: boolean;
}

export const CustomReactBitsCard: React.FC<CustomReactBitsCardProps> = ({
  option,
  isSelected,
  onSelect,
  onViewDetails,
  showPreview = false,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-teal-500 scale-105' : 'hover:scale-102'
      }`}
    >
      {/* Preview Image */}
      {showPreview && option.previewUrl && (
        <div className="h-32 bg-gray-800 overflow-hidden">
          <img 
            src={option.previewUrl} 
            alt={option.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-bold text-white">{option.title}</h4>
          {isSelected && (
            <div className="bg-teal-500/20 p-1 rounded-full">
              <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-300 mb-4">{option.description}</p>

        {/* Dependencies */}
        {option.dependencies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {option.dependencies.map(dep => (
              <span key={dep} className="text-xs px-2 py-1 bg-gray-700/50 rounded text-gray-300">
                {dep}
              </span>
            ))}
          </div>
        )}

        {/* Customization Badge */}
        {option.hasCustomization && (
          <div className="mb-4">
            <span className="text-xs px-2 py-1 bg-purple-500/20 rounded text-purple-400">
              Customizable
            </span>
          </div>
        )}

        <button
          onClick={onViewDetails}
          className="inline-flex items-center text-sm text-teal-400 hover:text-teal-300"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
```

### Example 2: Compact Card for Mobile

```typescript
export const CompactReactBitsCard: React.FC<ReactBitsCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'bg-teal-500/20 border-2 border-teal-500' 
          : 'bg-gray-800/50 border-2 border-transparent hover:border-gray-700'
      }`}
    >
      {/* Selection Indicator */}
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isSelected ? 'border-teal-500 bg-teal-500' : 'border-gray-600'
      }`}>
        {isSelected && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">{option.title}</h4>
        <p className="text-xs text-gray-400 truncate">{option.description}</p>
      </div>

      {/* Dependencies Count */}
      {option.dependencies.length > 0 && (
        <div className="text-xs text-gray-500">
          {option.dependencies.length} dep{option.dependencies.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};
```

---

## Modal Component Examples

### Example 1: Enhanced Modal with Tabs

```typescript
import React, { useState } from 'react';
import { ReactBitsComponent } from '@/types';
import { X, Code, Package, Info } from 'lucide-react';

type ModalTab = 'info' | 'code' | 'dependencies';

export const EnhancedReactBitsModal: React.FC<ReactBitsModalProps> = ({
  isOpen,
  onClose,
  option,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('info');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !option) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="glass-card rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white">{option.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{option.category}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'info' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Info className="w-4 h-4" />
              Info
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'code' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              Code
            </button>
            <button
              onClick={() => setActiveTab('dependencies')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === 'dependencies' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              Dependencies
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'info' && (
            <div>
              <p className="text-gray-300 mb-6">{option.description}</p>
              {option.hasCustomization && (
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <p className="text-purple-400 text-sm">
                    ✨ This component supports customization through props
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Installation</h4>
                <div className="relative">
                  <code className="block p-4 bg-gray-900/50 rounded text-teal-400 text-sm">
                    {option.cliCommand}
                  </code>
                  <button
                    onClick={() => handleCopy(option.cliCommand)}
                    className="absolute top-2 right-2 px-3 py-1 bg-teal-600 hover:bg-teal-700 rounded text-white text-sm"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {option.codeSnippet && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Usage Example</h4>
                  <pre className="p-4 bg-gray-900/50 rounded text-gray-300 text-sm overflow-x-auto">
                    {option.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'dependencies' && (
            <div>
              {option.dependencies.length > 0 ? (
                <div className="space-y-3">
                  {option.dependencies.map(dep => (
                    <div key={dep} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-white font-medium">{dep}</span>
                      <button
                        onClick={() => handleCopy(`npm install ${dep}`)}
                        className="text-sm text-teal-400 hover:text-teal-300"
                      >
                        Copy install command
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No external dependencies required</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
```

---

## Context Usage Examples

### Example 1: Custom Hook for React-Bits

```typescript
import { useBoltBuilder } from '@/contexts/BoltBuilderContext';
import { ReactBitsComponent } from '@/types';

export const useReactBits = () => {
  const {
    selectedBackground,
    setSelectedBackground,
    selectedComponents,
    setSelectedComponents,
    selectedAnimations,
    setSelectedAnimations,
  } = useBoltBuilder();

  // Get all selected react-bits components
  const getAllSelected = (): ReactBitsComponent[] => {
    return [
      ...(selectedBackground ? [selectedBackground] : []),
      ...selectedComponents,
      ...selectedAnimations,
    ];
  };

  // Get unique dependencies
  const getAllDependencies = (): string[] => {
    const allComponents = getAllSelected();
    const deps = allComponents.flatMap(comp => comp.dependencies);
    return [...new Set(deps)];
  };

  // Get all CLI commands
  const getAllCliCommands = (): string[] => {
    return getAllSelected().map(comp => comp.cliCommand);
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedBackground(null);
    setSelectedComponents([]);
    setSelectedAnimations([]);
  };

  // Get selection count
  const getSelectionCount = () => {
    return (selectedBackground ? 1 : 0) + 
           selectedComponents.length + 
           selectedAnimations.length;
  };

  return {
    // State
    selectedBackground,
    selectedComponents,
    selectedAnimations,
    
    // Setters
    setSelectedBackground,
    setSelectedComponents,
    setSelectedAnimations,
    
    // Utilities
    getAllSelected,
    getAllDependencies,
    getAllCliCommands,
    clearAllSelections,
    getSelectionCount,
  };
};
```

### Example 2: Selection Summary Component

```typescript
import React from 'react';
import { useReactBits } from '@/hooks/useReactBits';

export const ReactBitsSelectionSummary: React.FC = () => {
  const {
    selectedBackground,
    selectedComponents,
    selectedAnimations,
    getAllDependencies,
    getSelectionCount,
  } = useReactBits();

  const totalCount = getSelectionCount();
  const dependencies = getAllDependencies();

  if (totalCount === 0) {
    return (
      <div className="glass-card p-6 rounded-xl text-center">
        <p className="text-gray-400">No react-bits components selected yet</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-xl space-y-4">
      <h3 className="text-xl font-bold text-white">Selection Summary</h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-400">
            {selectedBackground ? 1 : 0}
          </div>
          <div className="text-sm text-gray-400">Background</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-400">
            {selectedComponents.length}
          </div>
          <div className="text-sm text-gray-400">Components</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-400">
            {selectedAnimations.length}
          </div>
          <div className="text-sm text-gray-400">Animations</div>
        </div>
      </div>

      {dependencies.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">
            Required Dependencies ({dependencies.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {dependencies.map(dep => (
              <span key={dep} className="px-3 py-1 bg-gray-700/50 rounded text-gray-300 text-sm">
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## Prompt Generation Examples

### Example 1: Custom Prompt Section

```typescript
const generateReactBitsSection = (): string => {
  const { selectedBackground, selectedComponents, selectedAnimations } = useBoltBuilder();
  
  let prompt = '';

  // Background section
  if (selectedBackground) {
    prompt += `## Background Effect\n\n`;
    prompt += `**Selected**: ${selectedBackground.title}\n`;
    prompt += `**Description**: ${selectedBackground.description}\n`;
    prompt += `**Dependencies**: ${selectedBackground.dependencies.join(', ') || 'None'}\n`;
    prompt += `**Installation**:\n\`\`\`bash\n${selectedBackground.cliCommand}\n\`\`\`\n\n`;
  }

  // Components section
  if (selectedComponents.length > 0) {
    prompt += `## UI Components (${selectedComponents.length})\n\n`;
    selectedComponents.forEach((comp, index) => {
      prompt += `### ${index + 1}. ${comp.title}\n`;
      prompt += `${comp.description}\n\n`;
      prompt += `**Dependencies**: ${comp.dependencies.join(', ') || 'None'}\n`;
      prompt += `**Installation**:\n\`\`\`bash\n${comp.cliCommand}\n\`\`\`\n\n`;
      if (comp.codeSnippet) {
        prompt += `**Usage**:\n\`\`\`tsx\n${comp.codeSnippet}\n\`\`\`\n\n`;
      }
    });
  }

  // Animations section
  if (selectedAnimations.length > 0) {
    prompt += `## Animations (${selectedAnimations.length})\n\n`;
    selectedAnimations.forEach((anim, index) => {
      prompt += `${index + 1}. **${anim.title}**: ${anim.description}\n`;
    });
    prompt += `\n`;
  }

  return prompt;
};
```

---

## Custom Implementations

### Example 1: Bulk Selection

```typescript
export const BulkSelectionControls: React.FC = () => {
  const { setSelectedComponents, setSelectedAnimations } = useBoltBuilder();
  const { componentOptions, animationOptions } = useReactBitsData();

  const selectAllComponents = () => {
    setSelectedComponents(componentOptions);
  };

  const clearAllComponents = () => {
    setSelectedComponents([]);
  };

  const selectRecommended = () => {
    // Select commonly used components
    const recommended = componentOptions.filter(comp =>
      ['carousel', 'accordion', 'tabs', 'card'].includes(comp.id)
    );
    setSelectedComponents(recommended);
  };

  return (
    <div className="flex gap-2">
      <button onClick={selectAllComponents} className="btn-secondary">
        Select All
      </button>
      <button onClick={clearAllComponents} className="btn-secondary">
        Clear All
      </button>
      <button onClick={selectRecommended} className="btn-primary">
        Select Recommended
      </button>
    </div>
  );
};
```

### Example 2: Dependency Checker

```typescript
export const DependencyChecker: React.FC = () => {
  const { getAllDependencies, getAllCliCommands } = useReactBits();
  const [installed, setInstalled] = useState<string[]>([]);

  const dependencies = getAllDependencies();
  const cliCommands = getAllCliCommands();

  const checkInstalled = async () => {
    // Check which dependencies are installed
    // This would require a backend API or package.json check
    // For demo purposes, we'll simulate
    setInstalled(['motion', 'gsap']);
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="text-lg font-bold text-white mb-4">Dependency Status</h3>
      
      <div className="space-y-2 mb-4">
        {dependencies.map(dep => (
          <div key={dep} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
            <span className="text-white">{dep}</span>
            <span className={`text-sm ${
              installed.includes(dep) ? 'text-green-400' : 'text-gray-400'
            }`}>
              {installed.includes(dep) ? '✓ Installed' : 'Not installed'}
            </span>
          </div>
        ))}
      </div>

      <button onClick={checkInstalled} className="btn-primary w-full">
        Check Installation Status
      </button>
    </div>
  );
};
```

---

**Last Updated**: 2025-01-30
