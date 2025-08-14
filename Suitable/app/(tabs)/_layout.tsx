import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useResponsive } from '@/hooks/useResponsive';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isSmallDevice } = useResponsive();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: isSmallDevice ? 80 : 90,
            paddingBottom: isSmallDevice ? 20 : 25,
            paddingTop: 10,
          },
          android: {
            height: isSmallDevice ? 70 : 80,
            paddingBottom: isSmallDevice ? 10 : 15,
            paddingTop: 8,
          },
          default: {
            height: isSmallDevice ? 70 : 80,
            paddingBottom: isSmallDevice ? 10 : 15,
            paddingTop: 8,
          },
        }),
        tabBarIconStyle: {
          marginTop: isSmallDevice ? 4 : 6,
        },
        tabBarLabelStyle: {
          fontSize: isSmallDevice ? 10 : 12,
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
