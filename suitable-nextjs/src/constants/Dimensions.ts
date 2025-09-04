// Web-compatible responsive dimensions
const getScreenDimensions = () => {
  if (typeof window !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  return { width: 1920, height: 1080 }; // Default fallback
};

const { width: screenWidth, height: screenHeight } = getScreenDimensions();

// Device type detection
export const isSmallDevice = screenWidth < 768; // Mobile
export const isMediumDevice = screenWidth >= 768 && screenWidth < 1024; // Tablet
export const isLargeDevice = screenWidth >= 1024; // Desktop
export const isTablet = screenWidth >= 768;

// Responsive dimensions
export const getResponsiveWidth = (percentage: number) => (screenWidth * percentage) / 100;
export const getResponsiveHeight = (percentage: number) => (screenHeight * percentage) / 100;

// Safe area calculations (web equivalent)
export const getStatusBarHeight = () => 0; // Web doesn't have status bar

// Responsive spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Responsive font sizes
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Responsive padding
export const padding = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

// Responsive margins
export const margin = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Screen dimensions
export const screen = {
  width: screenWidth,
  height: screenHeight,
  aspectRatio: screenWidth / screenHeight,
};

// Responsive border radius
export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
};

// Responsive button sizes
export const buttonSize = {
  sm: {
    height: 36,
    paddingHorizontal: 12,
  },
  md: {
    height: 44,
    paddingHorizontal: 16,
  },
  lg: {
    height: 52,
    paddingHorizontal: 20,
  },
};

// Responsive card dimensions
export const cardSize = {
  sm: {
    padding: 12,
    borderRadius: 8,
  },
  md: {
    padding: 16,
    borderRadius: 12,
  },
  lg: {
    padding: 20,
    borderRadius: 16,
  },
}; 