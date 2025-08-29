import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { useResponsive } from '@/hooks/useResponsive';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const { fontSize, buttonSize, borderRadius, spacing } = useResponsive();

  const handleServicesPress = () => {
    // Navigate to services page
    router.push('/services');
  };

  const handleBuyTicketPress = () => {
    // Navigate to ticket purchase page
    router.push('/tickets');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/SF-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <IconSymbol name="line.3.horizontal" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* First Section - Full Screen */}
      <View style={styles.firstSection}>
        {/* Branding/Title */}
        <View style={styles.brandingContainer}>
          <View style={styles.titleOutline}>
            <ThemedText style={[styles.title, { fontSize: fontSize.xxxl }]}>
              Suitable Focus
            </ThemedText>
          </View>
          
          {/* Event Description */}
          <ThemedText style={[styles.slogan, { fontSize: fontSize.lg, marginTop: spacing.md }]}>
            Helping you grow, build and elevate your empire
          </ThemedText>
          
          {/* Separator */}
          <View style={styles.separator} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.eventsButton]}
            onPress={handleServicesPress}
          >
            <IconSymbol name="calendar" size={20} color="#FFFFFF" />
            <ThemedText style={[styles.buttonText, { fontSize: fontSize.md }]}>
              Services
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.buyTicketButton]}
            onPress={handleBuyTicketPress}
          >
            <IconSymbol name="ticket" size={20} color="#FFFFFF" />
            <ThemedText style={[styles.buttonText, { fontSize: fontSize.md }]}>
              Buy Ticket
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Featured Event Card */}
        <View style={styles.featuredCard}>
          <Image 
            source={require('@/assets/images/BayHillExample.jpeg')} 
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <View style={styles.featuredContent}>
            <View style={styles.featuredHeader}>
              <ThemedText style={styles.featuredTitle}>
                Bayhill Premier Cup
              </ThemedText>
              <View style={styles.featuredTag}>
                <ThemedText style={styles.featuredTagText}>Featured</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.featuredDescription}>
              Biggest Youth Soccer Tournament in South Africa Held Annually
            </ThemedText>
            <View style={styles.featuredInfo}>
              <View style={styles.infoItem}>
                <IconSymbol name="calendar" size={16} color="#FFFFFF" />
                <ThemedText style={styles.infoText}>2025/12/15</ThemedText>
              </View>
              <View style={styles.infoItem}>
                <IconSymbol name="clock" size={16} color="#FFFFFF" />
                <ThemedText style={styles.infoText}>09:00 AM</ThemedText>
              </View>
            </View>
            <View style={styles.featuredFooter}>
              <ThemedText style={styles.featuredPrice}>R 450.00</ThemedText>
              <TouchableOpacity style={styles.bookNowButton}>
                <ThemedText style={styles.bookNowText}>Book Now</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Pure black background as shown in image
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#000000',
  },
  logoContainer: {
    width: 32,
    height: 32,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    padding: 8,
  },
  firstSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  brandingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  titleOutline: {
    borderWidth: 2,
    borderColor: '#D4AF37', // Yellow outline
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'transparent', // No background as shown in image
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  slogan: {
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 24,
    opacity: 0.9,
    fontWeight: '400',
  },
  separator: {
    width: 50,
    height: 2,
    backgroundColor: '#D4AF37', // Yellow line
    marginTop: 24,
    borderRadius: 1,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 16,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 12,
    minHeight: 56,
  },
  eventsButton: {
    backgroundColor: '#D4AF37', // Yellow background
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buyTicketButton: {
    backgroundColor: '#000000', // Black background
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  // Featured Card Styles
  featuredCard: {
    backgroundColor: '#333333',
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 40,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 20,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featuredTitle: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  featuredTag: {
    backgroundColor: '#8B6914',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featuredTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.9,
  },
  featuredInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredPrice: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
