import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'border-primary-600 border-t-transparent';
      case 'white':
        return 'border-white border-t-transparent';
      case 'gray':
        return 'border-gray-400 border-t-transparent';
    }
  };

  return (
    <div
      className={`
        animate-spin rounded-full border-2
        ${getSizeClasses()}
        ${getColorClasses()}
        ${className}
      `}
    />
  );
};

export default LoadingSpinner;
