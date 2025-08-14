import { Dimensions, Platform, StatusBar } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device type detection
export const isSmallDevice = screenWidth < 375;
export const isMediumDevice = screenWidth >= 375 && screenWidth < 414;
export const isLargeDevice = screenWidth >= 414;
export const isTablet = screenWidth >= 768;

// Responsive dimensions
export const getResponsiveWidth = (percentage: number) => (screenWidth * percentage) / 100;
export const getResponsiveHeight = (percentage: number) => (screenHeight * percentage) / 100;

// Safe area calculations
export const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return StatusBar.currentHeight || 0;
  }
  return StatusBar.currentHeight || 0;
};

// Responsive spacing
export const spacing = {
  xs: isSmallDevice ? 4 : isMediumDevice ? 6 : 8,
  sm: isSmallDevice ? 8 : isMediumDevice ? 12 : 16,
  md: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
  lg: isSmallDevice ? 24 : isMediumDevice ? 32 : 40,
  xl: isSmallDevice ? 32 : isMediumDevice ? 40 : 48,
  xxl: isSmallDevice ? 48 : isMediumDevice ? 56 : 64,
};

// Responsive font sizes
export const fontSize = {
  xs: isSmallDevice ? 10 : isMediumDevice ? 12 : 14,
  sm: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
  md: isSmallDevice ? 14 : isMediumDevice ? 16 : 18,
  lg: isSmallDevice ? 16 : isMediumDevice ? 18 : 20,
  xl: isSmallDevice ? 18 : isMediumDevice ? 20 : 22,
  xxl: isSmallDevice ? 20 : isMediumDevice ? 24 : 28,
  xxxl: isSmallDevice ? 24 : isMediumDevice ? 28 : 32,
};

// Responsive padding
export const padding = {
  xs: isSmallDevice ? 8 : isMediumDevice ? 12 : 16,
  sm: isSmallDevice ? 12 : isMediumDevice ? 16 : 20,
  md: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
  lg: isSmallDevice ? 20 : isMediumDevice ? 24 : 32,
  xl: isSmallDevice ? 24 : isMediumDevice ? 32 : 40,
};

// Responsive margins
export const margin = {
  xs: isSmallDevice ? 4 : isMediumDevice ? 6 : 8,
  sm: isSmallDevice ? 8 : isMediumDevice ? 12 : 16,
  md: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
  lg: isSmallDevice ? 24 : isMediumDevice ? 32 : 40,
  xl: isSmallDevice ? 32 : isMediumDevice ? 40 : 48,
};

// Screen dimensions
export const screen = {
  width: screenWidth,
  height: screenHeight,
  aspectRatio: screenWidth / screenHeight,
};

// Responsive border radius
export const borderRadius = {
  sm: isSmallDevice ? 6 : isMediumDevice ? 8 : 10,
  md: isSmallDevice ? 8 : isMediumDevice ? 12 : 16,
  lg: isSmallDevice ? 12 : isMediumDevice ? 16 : 20,
  xl: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
};

// Responsive button sizes
export const buttonSize = {
  sm: {
    height: isSmallDevice ? 36 : isMediumDevice ? 40 : 44,
    paddingHorizontal: isSmallDevice ? 12 : isMediumDevice ? 16 : 20,
  },
  md: {
    height: isSmallDevice ? 44 : isMediumDevice ? 48 : 52,
    paddingHorizontal: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
  },
  lg: {
    height: isSmallDevice ? 52 : isMediumDevice ? 56 : 60,
    paddingHorizontal: isSmallDevice ? 20 : isMediumDevice ? 24 : 28,
  },
};

// Responsive card dimensions
export const cardSize = {
  sm: {
    padding: isSmallDevice ? 12 : isMediumDevice ? 16 : 20,
    borderRadius: isSmallDevice ? 8 : isMediumDevice ? 12 : 16,
  },
  md: {
    padding: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
    borderRadius: isSmallDevice ? 12 : isMediumDevice ? 16 : 20,
  },
  lg: {
    padding: isSmallDevice ? 20 : isMediumDevice ? 24 : 32,
    borderRadius: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
  },
}; 