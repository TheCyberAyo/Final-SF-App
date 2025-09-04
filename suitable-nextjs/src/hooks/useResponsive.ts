import { useState, useEffect } from 'react';
import { 
  spacing, 
  fontSize, 
  padding, 
  margin, 
  borderRadius, 
  buttonSize, 
  cardSize,
  screen,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isTablet
} from '@/constants/Dimensions';

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Determine device type based on screen width
  const isSmallDeviceWeb = dimensions.width < 640;
  const isMediumDeviceWeb = dimensions.width >= 640 && dimensions.width < 1024;
  const isLargeDeviceWeb = dimensions.width >= 1024;
  const isTabletWeb = dimensions.width >= 768 && dimensions.width < 1024;

  return {
    // Device type detection
    isSmallDevice: isSmallDeviceWeb,
    isMediumDevice: isMediumDeviceWeb,
    isLargeDevice: isLargeDeviceWeb,
    isTablet: isTabletWeb,
    
    // Screen dimensions
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
    screen,
    
    // Responsive utilities
    spacing,
    fontSize,
    padding,
    margin,
    borderRadius,
    buttonSize,
    cardSize,
    
    // Helper functions
    getResponsiveWidth: (percentage: number) => (dimensions.width * percentage) / 100,
    getResponsiveHeight: (percentage: number) => (dimensions.height * percentage) / 100,
    
    // Responsive styles (converted to Tailwind classes)
    responsiveClasses: {
      container: 'flex-1 px-4 md:px-6 lg:px-8',
      safeContainer: 'flex-1 px-4 md:px-6 lg:px-8 pt-6 md:pt-8',
      card: 'p-4 md:p-6 rounded-lg md:rounded-xl mb-4 md:mb-6',
      button: 'h-12 md:h-14 px-6 md:px-8 rounded-lg md:rounded-xl',
    },
  };
}; 