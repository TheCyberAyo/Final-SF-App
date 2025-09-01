import React, { useState } from 'react';
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
import { useCart } from '@/contexts/CartContext';
import { useResponsive } from '@/hooks/useResponsive';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import BuyTicketPopup from '@/components/BookingPopup';
import EntrepreneurConsultationPopup from '@/components/EntrepreneurConsultationPopup';
import CartScreen from '@/components/CartScreen';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const { user } = useAuth();
  const { getItemCount } = useCart();
  const colorScheme = useColorScheme();
  const { fontSize, buttonSize, borderRadius, spacing } = useResponsive();
  const [activeSection, setActiveSection] = useState('main'); // 'main', 'services', 'tickets'
  const [buyTicketPopup, setBuyTicketPopup] = useState({
    visible: false,
    eventTitle: '',
    eventPrice: '',
    eventDate: '',
    eventTime: '',
  });
  const [entrepreneurConsultationPopup, setEntrepreneurConsultationPopup] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuDropdownVisible, setMenuDropdownVisible] = useState(false);

  const handleServicesPress = () => {
    setActiveSection('services');
  };

  const handleBuyTicketSectionPress = () => {
    setActiveSection('tickets');
  };

  const handleBackToMain = () => {
    setActiveSection('main');
  };

  const handleBuyTicketPress = (eventTitle: string, eventPrice: string, eventDate?: string, eventTime?: string) => {
    setBuyTicketPopup({
      visible: true,
      eventTitle,
      eventPrice,
      eventDate: eventDate || '',
      eventTime: eventTime || '',
    });
  };

  const handleCloseBuyTicket = () => {
    setBuyTicketPopup({
      visible: false,
      eventTitle: '',
      eventPrice: '',
      eventDate: '',
      eventTime: '',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.mainScrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/SF-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.cartButton} 
              onPress={() => setCartVisible(true)}
            >
              <IconSymbol name="cart" size={24} color="#FFFFFF" />
              {getItemCount() > 0 && (
                <View style={styles.cartBadge}>
                  <ThemedText style={styles.cartBadgeText}>{getItemCount()}</ThemedText>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setMenuDropdownVisible(!menuDropdownVisible)}
            >
              <IconSymbol name="line.3.horizontal" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Dropdown */}
        {menuDropdownVisible && (
          <>
            <TouchableOpacity 
              style={styles.dropdownOverlay}
              onPress={() => setMenuDropdownVisible(false)}
              activeOpacity={1}
            />
            <View style={styles.menuDropdown}>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuDropdownVisible(false);
                  // TODO: Navigate to Profile
                }}
              >
                <IconSymbol name="person.2.fill" size={20} color="#FFFFFF" />
                <ThemedText style={styles.dropdownItemText}>Profile</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuDropdownVisible(false);
                  // TODO: Navigate to Settings
                }}
              >
                <IconSymbol name="gearshape.fill" size={20} color="#FFFFFF" />
                <ThemedText style={styles.dropdownItemText}>Settings</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuDropdownVisible(false);
                  // TODO: Navigate to Refer a Friend
                }}
              >
                <IconSymbol name="person.badge.plus" size={20} color="#FFFFFF" />
                <ThemedText style={styles.dropdownItemText}>Refer a Friend</ThemedText>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Main Section - Always Visible */}
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
              style={[
                styles.actionButton, 
                activeSection === 'services' ? styles.activeButton : styles.inactiveButton
              ]}
              onPress={handleServicesPress}
            >
              <IconSymbol name="calendar" size={20} color="#FFFFFF" />
              <ThemedText style={[styles.buttonText, { fontSize: fontSize.md }]}>
                Services
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton, 
                activeSection === 'tickets' ? styles.activeButton : styles.inactiveButton
              ]}
              onPress={handleBuyTicketSectionPress}
            >
              <IconSymbol name="ticket" size={20} color="#FFFFFF" />
              <ThemedText style={[styles.buttonText, { fontSize: fontSize.md }]}>
                Buy Ticket
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Section - Always Visible, Hidden by Default */}
        <View style={[
          styles.contentSection, 
          activeSection === 'services' ? styles.visibleSection : styles.hiddenSection
        ]}>
          <ThemedText style={styles.mainServicesTitle}>OUR SERVICES</ThemedText>
          
          {/* Entrepreneur Consultation Card */}
          <View style={styles.entrepreneurCardsContainer}>
            
            {/* Single Entrepreneur Card */}
            <View style={styles.entrepreneurCard}>
              <Image
                source={require('@/assets/images/EntrepreneurConsultation.jpg')}
                style={styles.entrepreneurCardImage}
                resizeMode="cover"
              />
              <View style={styles.entrepreneurCardContent}>
                <ThemedText style={styles.entrepreneurCardTitle}>Entrepreneurs and SMEs Consultations</ThemedText>
                <ThemedText style={styles.entrepreneurCardDescription}>
                  Get expert guidance from experienced entrepreneurs. Choose between in-person (R600) or online (R350) consultation.
                </ThemedText>
                <View style={styles.entrepreneurCardPriceContainer}>
                  <ThemedText style={styles.entrepreneurCardPrice}>From R 350.00</ThemedText>
                </View>
                <TouchableOpacity 
                  style={styles.entrepreneurCardButton}
                  onPress={() => setEntrepreneurConsultationPopup(true)}
                >
                  <ThemedText style={styles.entrepreneurCardButtonText}>Book Now</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Individual Consultation Card */}
          <View style={styles.entrepreneurCardsContainer}>
            
            {/* Single Individual Consultation Card */}
            <View style={styles.entrepreneurCard}>
                              <Image
                  source={require('@/assets/images/IndividualConsultation.jpg')}
                  style={styles.entrepreneurCardImage}
                  resizeMode="cover"
                />
              <View style={styles.entrepreneurCardContent}>
                <ThemedText style={styles.entrepreneurCardTitle}>Individual Brands Consultation</ThemedText>
                <ThemedText style={styles.entrepreneurCardDescription}>
                  Get expert guidance from experienced entrepreneurs. Choose between in-person (R600) or online (R350) consultation.
                </ThemedText>
                <View style={styles.entrepreneurCardPriceContainer}>
                  <ThemedText style={styles.entrepreneurCardPrice}>From R 350.00</ThemedText>
                </View>
                <TouchableOpacity 
                  style={styles.entrepreneurCardButton}
                  onPress={() => setEntrepreneurConsultationPopup(true)}
                >
                  <ThemedText style={styles.entrepreneurCardButtonText}>Book Now</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ThemedText style={styles.sectionTitle}>Additional Services</ThemedText>
          
          {/* Service Cards */}
          <View style={styles.serviceCardsContainer}>
            {/* First Row */}
            <View style={styles.serviceRow}>
              {/* Media Card */}
              <View style={styles.serviceCard}>
                <View style={styles.serviceIconContainer}>
                  <IconSymbol name="camera.fill" size={24} color="#D4AF37" />
                </View>
                <View style={styles.serviceContent}>
                  <ThemedText style={styles.serviceTitle}>Media</ThemedText>
                  <ThemedText style={styles.serviceDescription}>
                    Photography and videography services
                  </ThemedText>
                  <TouchableOpacity style={styles.serviceButton}>
                    <ThemedText style={styles.serviceButtonText}>Book Now</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Graphic Design Card */}
              <View style={styles.serviceCard}>
                <View style={styles.serviceIconContainer}>
                  <IconSymbol name="paintbrush.fill" size={24} color="#D4AF37" />
                </View>
                <View style={styles.serviceContent}>
                  <ThemedText style={styles.serviceTitle}>Graphic Design</ThemedText>
                  <ThemedText style={styles.serviceDescription}>
                    Professional graphic design services
                  </ThemedText>
                  <TouchableOpacity style={styles.serviceButton}>
                    <ThemedText style={styles.serviceButtonText}>Book Now</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Second Row */}
            <View style={styles.serviceRow}>
              {/* Social Media and Marketing Card */}
              <View style={styles.serviceCard}>
                <View style={styles.serviceIconContainer}>
                  <IconSymbol name="megaphone.fill" size={24} color="#D4AF37" />
                </View>
                <View style={styles.serviceContent}>
                  <ThemedText style={styles.serviceTitle}>Social Media & Marketing</ThemedText>
                  <ThemedText style={styles.serviceDescription}>
                    Social media and marketing services
                  </ThemedText>
                  <TouchableOpacity style={styles.serviceButton}>
                    <ThemedText style={styles.serviceButtonText}>Book Now</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Email Marketing Card */}
              <View style={styles.serviceCard}>
                <View style={styles.serviceIconContainer}>
                  <IconSymbol name="envelope.fill" size={24} color="#D4AF37" />
                </View>
                <View style={styles.serviceContent}>
                  <ThemedText style={styles.serviceTitle}>Email Marketing</ThemedText>
                  <ThemedText style={styles.serviceDescription}>
                    Professional email marketing campaigns
                  </ThemedText>
                  <TouchableOpacity style={styles.serviceButton}>
                    <ThemedText style={styles.serviceButtonText}>Book Now</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Third Row */}
            <View style={styles.serviceRow}>
              {/* Website Development Card */}
              <View style={styles.serviceCard}>
                <View style={styles.serviceIconContainer}>
                  <IconSymbol name="laptopcomputer" size={24} color="#D4AF37" />
                </View>
                <View style={styles.serviceContent}>
                  <ThemedText style={styles.serviceTitle}>Website Development</ThemedText>
                  <ThemedText style={styles.serviceDescription}>
                    Custom website development solutions
                  </ThemedText>
                  <TouchableOpacity style={styles.serviceButton}>
                    <ThemedText style={styles.serviceButtonText}>Book Now</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Tickets Section - Always Visible, Hidden by Default */}
        <View style={[
          styles.contentSection, 
          activeSection === 'tickets' ? styles.visibleSection : styles.hiddenSection
        ]}>
          <ThemedText style={styles.eventsTitle}>EVENTS</ThemedText>
          
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
                  <TouchableOpacity 
                    style={styles.bookNowButton}
                    onPress={() => handleBuyTicketPress('Bayhill Premier Cup', 'R 450.00', '2025/12/15', '09:00 AM')}
                  >
                    <ThemedText style={styles.bookNowText}>Buy Ticket</ThemedText>
                  </TouchableOpacity>
                </View>
            </View>
          </View>

          {/* Upcoming Events Section */}
          <View style={styles.upcomingEventsContainer}>
            <ThemedText style={styles.upcomingEventsTitle}>Upcoming Events</ThemedText>
            
            {/* Event Card */}
            <View style={styles.elevateEventCard}>
              <View style={styles.elevateEventContent}>
                <ThemedText style={styles.elevateEventTitle}>
                  CUSTOMER RELATIONSHIPS, MARKETING & PROJECT WORKFLOWS
                </ThemedText>
                <View style={styles.elevateEventInfo}>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="calendar" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>2025/09/17</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="clock" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>Online Event</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="location" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>Virtual Platform</ThemedText>
                  </View>
                </View>
                <View style={styles.elevateEventFooter}>
                  <ThemedText style={styles.elevateEventPrice}>R 300.00</ThemedText>
                  <TouchableOpacity 
                    style={styles.elevateBookButton}
                    onPress={() => handleBuyTicketPress('CUSTOMER RELATIONSHIPS, MARKETING & PROJECT WORKFLOWS', 'R 300.00', '2025/09/17', 'Online')}
                  >
                    <ThemedText style={styles.elevateBookButtonText}>Buy Ticket</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Let's Elevate Events Section */}
          <View style={styles.elevateEventsContainer}>
            <ThemedText style={styles.elevateEventsTitle}>Let's Elevate Events</ThemedText>
            
            {/* Cape Town Event Card */}
            <View style={styles.elevateEventCard}>
              <Image 
                source={require('@/assets/images/Cape-Town.png')} 
                style={styles.elevateEventImage}
                resizeMode="cover"
              />
              <View style={styles.elevateEventContent}>
                <ThemedText style={styles.elevateEventTitle}>Let's Elevate, Cape Town</ThemedText>
                <View style={styles.elevateEventInfo}>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="calendar" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>2025/11/06</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="clock" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>10:00 AM</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="location" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>Workshop 17 Kloof Street</ThemedText>
                  </View>
                </View>
                <View style={styles.elevateEventFooter}>
                  <ThemedText style={styles.elevateEventPrice}>R 90.00</ThemedText>
                  <TouchableOpacity 
                    style={styles.elevateBookButton}
                    onPress={() => handleBuyTicketPress('Let\'s Elevate, Cape Town', 'R 90.00', '2025/11/06', '10:00 AM')}
                  >
                    <ThemedText style={styles.elevateBookButtonText}>Buy Ticket</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Johannesburg Event Card */}
            <View style={styles.elevateEventCard}>
              <Image 
                source={require('@/assets/images/Johannesburg.png')} 
                style={styles.elevateEventImage}
                resizeMode="cover"
              />
              <View style={styles.elevateEventContent}>
                <ThemedText style={styles.elevateEventTitle}>Let's Elevate, Johannesburg</ThemedText>
                <View style={styles.elevateEventInfo}>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="calendar" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>2025/11/13</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="clock" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>10:00 AM</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="location" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>Workshop 17, Hyde Park</ThemedText>
                  </View>
                </View>
                <View style={styles.elevateEventFooter}>
                  <ThemedText style={styles.elevateEventPrice}>R 90.00</ThemedText>
                  <TouchableOpacity 
                    style={styles.elevateBookButton}
                    onPress={() => handleBuyTicketPress('Let\'s Elevate, Johannesburg', 'R 90.00', '2025/11/13', '10:00 AM')}
                  >
                    <ThemedText style={styles.elevateBookButtonText}>Buy Ticket</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Durban Event Card */}
            <View style={styles.elevateEventCard}>
              <Image 
                source={require('@/assets/images/Durban.png')} 
                style={styles.elevateEventImage}
                resizeMode="cover"
              />
              <View style={styles.elevateEventContent}>
                <ThemedText style={styles.elevateEventTitle}>Let's Elevate, Durban</ThemedText>
                <View style={styles.elevateEventInfo}>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="calendar" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>2025/11/19</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="clock" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>10:00 AM</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="location" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>Workshop 17, Ballito</ThemedText>
                  </View>
                </View>
                <View style={styles.elevateEventFooter}>
                  <ThemedText style={styles.elevateEventPrice}>R 90.00</ThemedText>
                  <TouchableOpacity 
                    style={styles.elevateBookButton}
                    onPress={() => handleBuyTicketPress('Let\'s Elevate, Durban', 'R 90.00', '2025/11/19', '10:00 AM')}
                  >
                    <ThemedText style={styles.elevateBookButtonText}>Buy Ticket</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Gqeberha Event Card */}
            <View style={styles.elevateEventCard}>
              <Image 
                source={require('@/assets/images/Gqebhera.png')} 
                style={styles.elevateEventImage}
                resizeMode="cover"
              />
              <View style={styles.elevateEventContent}>
                <ThemedText style={styles.elevateEventTitle}>Let's Elevate, Gqeberha</ThemedText>
                <View style={styles.elevateEventInfo}>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="calendar" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>2025/11/26</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="clock" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>10:00 AM</ThemedText>
                  </View>
                  <View style={styles.elevateInfoItem}>
                    <IconSymbol name="location" size={16} color="#FFFFFF" />
                    <ThemedText style={styles.elevateInfoText}>TBC</ThemedText>
                  </View>
                </View>
                <View style={styles.elevateEventFooter}>
                  <ThemedText style={styles.elevateEventPrice}>R 90.00</ThemedText>
                  <TouchableOpacity 
                    style={styles.elevateBookButton}
                    onPress={() => handleBuyTicketPress('Let\'s Elevate, Gqeberha', 'R 90.00', '2025/11/26', '10:00 AM')}
                  >
                    <ThemedText style={styles.elevateBookButtonText}>Buy Ticket</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Final Section */}
          <View style={styles.finalSectionContainer}>
            <View style={styles.pricingCard}>
              <ThemedText style={styles.finalTitle}>Suitable Focus</ThemedText>
              <ThemedText style={styles.copyrightText}>© Copyright 2025</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Buy Ticket Popup */}
      <BuyTicketPopup
        visible={buyTicketPopup.visible}
        onClose={handleCloseBuyTicket}
        eventTitle={buyTicketPopup.eventTitle}
        eventPrice={buyTicketPopup.eventPrice}
        eventDate={buyTicketPopup.eventDate}
        eventTime={buyTicketPopup.eventTime}
      />

      {/* Entrepreneur Consultation Popup */}
      <EntrepreneurConsultationPopup
        visible={entrepreneurConsultationPopup}
        onClose={() => setEntrepreneurConsultationPopup(false)}
        onOpenCart={() => setCartVisible(true)}
      />

      {/* Cart Screen */}
      <CartScreen
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
      />
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
    backgroundColor: '#333333',
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  firstSection: {
    minHeight: height - 100, // Account for header height
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,
  },
  mainScrollView: {
    flex: 1,
  },
  brandingContainer: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
    width: '100%',
    backgroundColor: '#333333',
    borderRadius: 12,
    marginHorizontal: 20,
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
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  // Service Cards Styles
  serviceCardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#333333',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceContent: {
    alignItems: 'center',
    width: '100%',
  },
  serviceTitle: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  serviceDescription: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
    opacity: 0.9,
    textAlign: 'center',
  },
  serviceButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  serviceButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  // Entrepreneur Cards Styles
  entrepreneurCardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  entrepreneurCard: {
    backgroundColor: '#333333',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  entrepreneurCardImage: {
    width: '100%',
    height: 150,
  },
  entrepreneurCardContent: {
    padding: 20,
  },
  entrepreneurCardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  entrepreneurCardDescription: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  entrepreneurCardPriceContainer: {
    marginBottom: 16,
  },
  entrepreneurCardPrice: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
  },
  entrepreneurCardButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  entrepreneurCardButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  // Let's Elevate Events Styles
  elevateEventsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  elevateEventsTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  elevateEventCard: {
    backgroundColor: '#333333',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  elevateEventImage: {
    width: '100%',
    height: 180,
  },
  elevateEventContent: {
    padding: 20,
  },
  elevateEventTitle: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  elevateEventInfo: {
    marginBottom: 16,
  },
  elevateInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  elevateInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  elevateEventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  elevateEventPrice: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  elevateBookButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  elevateBookButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  // Upcoming Events Styles
  upcomingEventsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  upcomingEventsTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#333333',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  eventIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 20,
  },
  eventDateTime: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 4,
  },
  eventPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  // Final Pricing Section Styles
  finalSectionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  pricingCard: {
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  priceContainer: {
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  priceText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalTitle: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  copyrightText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  // Section Container Styles
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  mainServicesTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  eventsTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 2,
  },
  // Active Button and Section Visibility Styles
  activeButton: {
    backgroundColor: '#D4AF37', // Gold background for active button
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  inactiveButton: {
    backgroundColor: '#444444', // Dark grey background for inactive button
    borderWidth: 1,
    borderColor: '#555555',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  visibleSection: {
    display: 'flex',
  },
  hiddenSection: {
    display: 'none',
  },
  // Menu Dropdown Styles
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  menuDropdown: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 180,
    zIndex: 1000,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  dropdownItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
