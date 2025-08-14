import React from 'react';
import { ImageBackground, ImageSourcePropType, ViewStyle, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveBackgroundImageProps {
  source: ImageSourcePropType;
  children: React.ReactNode;
  style?: ViewStyle;
  overlayColor?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export const ResponsiveBackgroundImage: React.FC<ResponsiveBackgroundImageProps> = ({
  source,
  children,
  style,
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  resizeMode = 'cover',
}) => {
  const { screen } = useResponsive();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
    ...style,
  };

  const imageStyle: ViewStyle = {
    width: '100%',
    height: '100%',
  };

  const overlayStyle: ViewStyle = {
    flex: 1,
    backgroundColor: overlayColor,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  };

  return (
    <ImageBackground
      source={source}
      style={containerStyle}
      imageStyle={imageStyle}
      resizeMode={resizeMode}
    >
      <View style={overlayStyle}>
        {children}
      </View>
    </ImageBackground>
  );
}; 