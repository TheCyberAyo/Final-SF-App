import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
  safeArea?: boolean;
  scrollable?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  padding = true,
  safeArea = true,
  scrollable = false,
}) => {
  const { padding: responsivePadding } = useResponsive();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    ...(safeArea && { paddingTop: insets.top }),
    ...(padding && { paddingHorizontal: responsivePadding.md }),
    ...style,
  };

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

export const ResponsiveScrollContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  padding = true,
  safeArea = true,
}) => {
  const { padding: responsivePadding } = useResponsive();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    ...(safeArea && { paddingTop: insets.top }),
    ...(padding && { paddingHorizontal: responsivePadding.md }),
    ...style,
  };

  const contentContainerStyle: ViewStyle = {
    paddingBottom: insets.bottom + 20,
  };

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
}; 