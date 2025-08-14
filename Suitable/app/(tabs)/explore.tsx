import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useResponsive } from '@/hooks/useResponsive';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ExploreScreen() {
  const { fontSize, padding, margin, borderRadius, cardSize } = useResponsive();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          <View style={[styles.content, { paddingHorizontal: padding.md }]}>
            <ThemedText type="title" style={[styles.title, { fontSize: fontSize.xxxl }]}>
              Explore
            </ThemedText>
            
            <ThemedText style={[styles.subtitle, { fontSize: fontSize.md, marginBottom: margin.xl }]}>
              Discover new possibilities and find what suits you best
            </ThemedText>
            
            <View style={[styles.section, { marginBottom: margin.xl }]}>
              <ThemedText type="subtitle" style={[styles.sectionTitle, { fontSize: fontSize.lg, marginBottom: margin.md }]}>
                Categories
              </ThemedText>
              <View style={styles.categoryGrid}>
                <View style={[styles.categoryCard, { 
                  padding: cardSize.sm.padding,
                  borderRadius: cardSize.sm.borderRadius,
                }]}>
                  <ThemedText style={[styles.categoryEmoji, { fontSize: fontSize.xxl }]}>🎨</ThemedText>
                  <ThemedText style={[styles.categoryTitle, { fontSize: fontSize.sm }]}>Art & Design</ThemedText>
                </View>
                <View style={[styles.categoryCard, { 
                  padding: cardSize.sm.padding,
                  borderRadius: cardSize.sm.borderRadius,
                }]}>
                  <ThemedText style={[styles.categoryEmoji, { fontSize: fontSize.xxl }]}>💻</ThemedText>
                  <ThemedText style={[styles.categoryTitle, { fontSize: fontSize.sm }]}>Technology</ThemedText>
                </View>
                <View style={[styles.categoryCard, { 
                  padding: cardSize.sm.padding,
                  borderRadius: cardSize.sm.borderRadius,
                }]}>
                  <ThemedText style={[styles.categoryEmoji, { fontSize: fontSize.xxl }]}>🍳</ThemedText>
                  <ThemedText style={[styles.categoryTitle, { fontSize: fontSize.sm }]}>Food & Cooking</ThemedText>
                </View>
                <View style={[styles.categoryCard, { 
                  padding: cardSize.sm.padding,
                  borderRadius: cardSize.sm.borderRadius,
                }]}>
                  <ThemedText style={[styles.categoryEmoji, { fontSize: fontSize.xxl }]}>🏃‍♂️</ThemedText>
                  <ThemedText style={[styles.categoryTitle, { fontSize: fontSize.sm }]}>Fitness</ThemedText>
                </View>
              </View>
            </View>
            
            <View style={[styles.section, { marginBottom: margin.xl }]}>
              <ThemedText type="subtitle" style={[styles.sectionTitle, { fontSize: fontSize.lg, marginBottom: margin.md }]}>
                Trending
              </ThemedText>
              <View style={[styles.trendingCard, { 
                padding: cardSize.md.padding,
                borderRadius: cardSize.md.borderRadius,
              }]}>
                <ThemedText style={[styles.trendingTitle, { fontSize: fontSize.lg, marginBottom: margin.sm }]}>
                  Popular This Week
                </ThemedText>
                <ThemedText style={[styles.trendingText, { fontSize: fontSize.md }]}>
                  See what others are discovering and loving right now.
                </ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  section: {
  },
  sectionTitle: {
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    width: '48%',
  },
  categoryEmoji: {
    marginBottom: 8,
  },
  categoryTitle: {
    fontWeight: '500',
    textAlign: 'center',
  },
  trendingCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  trendingTitle: {
    fontWeight: '600',
  },
  trendingText: {
    opacity: 0.8,
  },
});
