import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useResponsive } from '@/hooks/useResponsive';

export default function HomeScreen() {
  const { signOut, user } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { fontSize, padding, margin, borderRadius, cardSize, buttonSize } = useResponsive();
  const insets = useSafeAreaInsets();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={[styles.content, { paddingHorizontal: padding.md }]}>
          <View style={styles.header}>
            <ThemedText type="title" style={[styles.title, { fontSize: fontSize.xxxl }]}>
              Home
            </ThemedText>
            <TouchableOpacity 
              style={[styles.signOutButton, { 
                backgroundColor: colors.tint,
                height: buttonSize.sm.height,
                paddingHorizontal: buttonSize.sm.paddingHorizontal,
                borderRadius: borderRadius.sm,
              }]}
              onPress={handleSignOut}
            >
              <ThemedText style={[styles.signOutText, { fontSize: fontSize.sm }]}>Sign Out</ThemedText>
            </TouchableOpacity>
          </View>
          
          <ThemedText style={[styles.subtitle, { fontSize: fontSize.md, marginBottom: margin.xl }]}>
            Welcome back, {user?.user_metadata?.name || user?.email || 'User'}!
          </ThemedText>
          
          <View style={[styles.card, { 
            padding: cardSize.md.padding,
            borderRadius: cardSize.md.borderRadius,
            marginBottom: margin.md,
          }]}>
            <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: fontSize.lg }]}>
              Your Recommendations
            </ThemedText>
            <ThemedText style={[styles.cardText, { fontSize: fontSize.md }]}>
              Discover personalized content tailored just for you.
            </ThemedText>
          </View>
          
          <View style={[styles.card, { 
            padding: cardSize.md.padding,
            borderRadius: cardSize.md.borderRadius,
            marginBottom: margin.md,
          }]}>
            <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: fontSize.lg }]}>
              Recent Activity
            </ThemedText>
            <ThemedText style={[styles.cardText, { fontSize: fontSize.md }]}>
              Track your latest interactions and preferences.
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  signOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: 'white',
    fontWeight: '500',
  },
  subtitle: {
    opacity: 0.7,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardText: {
    opacity: 0.8,
  },
});
