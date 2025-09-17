import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;