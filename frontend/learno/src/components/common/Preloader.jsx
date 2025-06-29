import React from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ 
  size = 'default', 
  text = 'Loading...', 
  variant = 'default',
  className = '',
  showDots = true 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base',
    xlarge: 'text-lg'
  };

  const variants = {
    default: {
      spinner: 'border-2 border-gray-200',
      spinnerColor: 'var(--primary-color)',
      bgColor: 'var(--primary-lightest)',
      textColor: 'text-gray-600'
    },
    light: {
      spinner: 'border-2 border-white/30',
      spinnerColor: 'white',
      bgColor: 'rgba(255, 255, 255, 0.1)',
      textColor: 'text-white'
    },
    dark: {
      spinner: 'border-2 border-gray-600',
      spinnerColor: 'var(--primary-color)',
      bgColor: 'var(--primary-lightest)',
      textColor: 'text-gray-800'
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Main Spinner */}
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} ${currentVariant.spinner} rounded-full`}
          style={{ borderTopColor: currentVariant.spinnerColor }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Pulse */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full`}
          style={{ backgroundColor: currentVariant.bgColor }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading Text */}
      {text && (
        <motion.div
          className={`font-medium ${textSizes[size]} ${currentVariant.textColor}`}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.div>
      )}

      {/* Dots Animation */}
      {showDots && (
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: currentVariant.spinnerColor }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Full Screen Preloader
export const FullScreenPreloader = ({ 
  text = 'Loading Learnovate...', 
  variant = 'default',
  showLogo = true 
}) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <Preloader 
          size="xlarge" 
          text={text} 
          variant={variant}
          className="mb-8"
        />
        
        {/* Logo Animation */}
        {showLogo && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
              Learnovate
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Empowering Learning Through Mentorship
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Inline Preloader
export const InlinePreloader = ({ 
  size = 'default', 
  text = 'Loading...', 
  variant = 'default',
  className = '',
  showDots = true 
}) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <Preloader 
        size={size} 
        text={text} 
        variant={variant}
        showDots={showDots}
      />
    </div>
  );
};

// Button Preloader
export const ButtonPreloader = ({ 
  size = 'small', 
  text = 'Loading...',
  variant = 'light' 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <motion.div
        className={`${size === 'small' ? 'w-3 h-3' : 'w-4 h-4'} border-2 border-white border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <span className="text-sm text-white">{text}</span>
    </div>
  );
};

// Page Preloader
export const PagePreloader = ({ 
  text = 'Loading page...',
  variant = 'default' 
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Preloader 
        size="large" 
        text={text} 
        variant={variant}
        className="space-y-4"
      />
    </div>
  );
};

// Table Preloader
export const TablePreloader = ({ 
  text = 'Loading data...',
  variant = 'default' 
}) => {
  return (
    <div className="py-12 flex items-center justify-center">
      <Preloader 
        size="default" 
        text={text} 
        variant={variant}
        showDots={false}
      />
    </div>
  );
};

export default Preloader; 