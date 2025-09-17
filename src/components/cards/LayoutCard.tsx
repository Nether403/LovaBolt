import React from 'react';

interface LayoutCardProps {
  title: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const LayoutCard: React.FC<LayoutCardProps> = ({
  title,
  description,
  selected = false,
  onClick,
  children
}) => {
  const getLayoutPreview = () => {
    switch (title) {
      case 'Single Column':
        return (
          <div className="w-16 h-16 flex items-center justify-center">
            <div className="w-6 h-16 bg-blue-500/80 rounded-md" />
          </div>
        );
      case 'Two Column':
        return (
          <div className="w-16 h-16 flex items-center justify-center gap-2">
            <div className="w-6 h-16 bg-purple-500/80 rounded-md" />
            <div className="w-6 h-16 bg-purple-500/80 rounded-md" />
          </div>
        );
      case 'Three Column':
        return (
          <div className="w-16 h-16 flex items-center justify-center gap-1">
            <div className="w-4 h-16 bg-teal-500/80 rounded-md" />
            <div className="w-4 h-16 bg-teal-500/80 rounded-md" />
            <div className="w-4 h-16 bg-teal-500/80 rounded-md" />
          </div>
        );
      case 'Grid Layout':
        return (
          <div className="w-16 h-16 grid grid-cols-2 gap-1">
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
          </div>
        );
      case 'Asymmetrical Layout':
        return (
          <div className="w-16 h-16 grid grid-cols-3 gap-1">
            <div className="col-span-2 bg-yellow-500/80 rounded-md" />
            <div className="bg-yellow-500/80 rounded-md" />
            <div className="bg-yellow-500/80 rounded-md" />
            <div className="col-span-2 bg-yellow-500/80 rounded-md" />
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg" />
        );
    }
  };

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
      onClick={onClick}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-6 flex flex-col items-center text-center z-10">
        {getLayoutPreview()}
        
        <h3 className="text-lg font-bold mt-4 mb-2 text-white">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        
        {children && (
          <div className="mt-4 w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutCard;