import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useResponsive } from '@/hooks/useResponsive';
import { ResponsiveBackgroundImage } from '@/components/ResponsiveBackgroundImage';

export default function WelcomeScreen() {
  const { user, isLoading } = useAuth();
  const { fontSize, buttonSize, borderRadius, spacing } = useResponsive();

  const handleGetStarted = () => {
    if (user) {
      // User is authenticated, go to main app
      router.push('/(tabs)');
    } else {
      // User is not authenticated, go to sign in
      router.push('/auth/sign-in');
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText style={[styles.loadingText, { fontSize: fontSize.lg }]}>Loading...</ThemedText>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ResponsiveBackgroundImage
        source={require('@/assets/images/welcome-background.jpg')}
        overlayColor="rgba(0, 0, 0, 0.3)"
      >
        <View style={styles.overlay}>
          {/* Get Started button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, { 
                height: buttonSize.lg.height,
                paddingHorizontal: buttonSize.lg.paddingHorizontal,
                borderRadius: borderRadius.lg,
                marginBottom: spacing.xl,
                width: '80%',
                maxWidth: 300,
              }]}
              onPress={handleGetStarted}
            >
              <ThemedText style={[styles.buttonText, { fontSize: fontSize.lg }]}>
                {user ? 'Continue to App' : 'Get Started'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ResponsiveBackgroundImage>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#D4AF37',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    letterSpacing: 1,
  },
}); 