import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false,
  variant = 'primary',
  size = 'md'
}) => {
  const baseClasses = `
    rounded-lg font-medium transition-all duration-300
    hover:scale-[1.03] active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-white/25
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center
  `;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;