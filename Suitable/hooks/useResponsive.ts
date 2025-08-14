import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
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
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
      setDimensions({ window, screen });
    });

    return () => subscription?.remove();
  }, []);

  return {
    // Device type detection
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
    
    // Screen dimensions
    screenWidth: dimensions.window.width,
    screenHeight: dimensions.window.height,
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
    getResponsiveWidth: (percentage: number) => (dimensions.window.width * percentage) / 100,
    getResponsiveHeight: (percentage: number) => (dimensions.window.height * percentage) / 100,
    
    // Responsive styles
    responsiveStyles: {
      container: {
        flex: 1,
        paddingHorizontal: padding.md,
      },
      safeContainer: {
        flex: 1,
        paddingHorizontal: padding.md,
        paddingTop: spacing.lg,
      },
      card: {
        padding: cardSize.md.padding,
        borderRadius: cardSize.md.borderRadius,
        marginBottom: margin.md,
      },
      button: {
        height: buttonSize.md.height,
        paddingHorizontal: buttonSize.md.paddingHorizontal,
        borderRadius: borderRadius.md,
      },
    },
  };
}; 