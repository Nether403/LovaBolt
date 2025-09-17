import React from 'react';

interface Animation {
  id: string;
  title: string;
  description: string;
}

interface AnimationCardProps {
  animation: Animation;
  selected: boolean;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const AnimationCard: React.FC<AnimationCardProps> = ({
  animation,
  selected,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const renderAnimationPreview = () => {
    const baseClass = "w-12 h-12 bg-teal-500/50 rounded-lg transition-all duration-1000";
    
    switch (animation.id) {
      case 'fade-in':
        return (
          <div className={`${baseClass} ${isActive ? 'opacity-100' : 'opacity-30'}`} />
        );
      case 'slide-up':
        return (
          <div className={`${baseClass} ${isActive ? 'translate-y-0' : 'translate-y-8'}`} />
        );
      case 'scale-in':
        return (
          <div className={`${baseClass} ${isActive ? 'scale-100' : 'scale-50'}`} />
        );
      case 'hover-effects':
        return (
          <div className={`${baseClass} ${isActive ? 'scale-110 shadow-lg' : ''}`} />
        );
      case 'loading-states':
        return (
          <div className={`${baseClass} ${isActive ? 'animate-pulse' : ''}`} />
        );
      case 'parallax':
        return (
          <div className="relative w-16 h-16 overflow-hidden">
            <div className={`absolute inset-0 bg-teal-900/30 transition-transform duration-500 ${isActive ? 'translate-y-[-10%]' : ''}`} />
            <div className={`absolute inset-0 bg-teal-700/30 transition-transform duration-500 ${isActive ? 'translate-y-[-20%]' : ''}`} />
            <div className={`absolute inset-0 bg-teal-500/30 transition-transform duration-500 ${isActive ? 'translate-y-[-30%]' : ''}`} />
          </div>
        );
      case 'micro-interactions':
        return (
          <div className={`${baseClass} ${isActive ? 'rotate-12 scale-105' : ''}`} />
        );
      case 'page-transitions':
        return (
          <div className="flex gap-1">
            <div className={`w-6 h-12 bg-teal-500/50 rounded transition-all duration-500 ${isActive ? 'translate-x-6' : ''}`} />
            <div className={`w-6 h-12 bg-purple-500/50 rounded transition-all duration-500 ${isActive ? 'translate-x-[-6px]' : ''}`} />
          </div>
        );
      default:
        return <div className={baseClass} />;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6 text-teal-500/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <h3 className="text-lg font-bold text-white">{animation.title}</h3>
        </div>
        
        <p className="text-sm text-gray-300 mb-4">{animation.description}</p>
        
        <div className="aspect-video bg-black/20 rounded-lg overflow-hidden flex items-center justify-center">
          {renderAnimationPreview()}
        </div>
      </div>
    </div>
  );
};

export default AnimationCard;