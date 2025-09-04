import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { useResponsive } from '@/hooks/useResponsive';

const { width, height } = Dimensions.get('window');

interface BuyTicketPopupProps {
  visible: boolean;
  onClose: () => void;
  eventTitle: string;
  eventPrice: string;
  eventDate?: string;
  eventTime?: string;
}

export default function BuyTicketPopup({
  visible,
  onClose,
  eventTitle,
  eventPrice,
  eventDate,
  eventTime,
}: BuyTicketPopupProps) {
  const { fontSize, spacing } = useResponsive();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirmPurchase = () => {
    // Basic validation
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Here you would typically send the ticket purchase data to your backend
    Alert.alert(
      'Ticket Purchase Confirmed!',
      `Thank you ${formData.fullName}! Your ticket for "${eventTitle}" has been confirmed. You will receive a confirmation email shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setFormData({ fullName: '', email: '', phone: '' });
            onClose();
          },
        },
      ]
    );
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({ fullName: '', email: '', phone: '' });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Header */}
              <View style={styles.header}>
                <ThemedText style={[styles.headerTitle, { fontSize: fontSize.lg }]}>
                  Buy Tickets
                </ThemedText>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <IconSymbol name="xmark" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <View style={styles.formContainer}>
                {/* Full Name */}
                <View style={styles.inputContainer}>
                  <ThemedText style={[styles.inputLabel, { fontSize: fontSize.sm }]}>
                    Full Name
                  </ThemedText>
                  <TextInput
                    style={[styles.textInput, { fontSize: fontSize.md }]}
                    placeholder="Enter your name"
                    placeholderTextColor="#666666"
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                    autoCapitalize="words"
                  />
                </View>

                {/* Email Address */}
                <View style={styles.inputContainer}>
                  <ThemedText style={[styles.inputLabel, { fontSize: fontSize.sm }]}>
                    Email Address
                  </ThemedText>
                  <TextInput
                    style={[styles.textInput, { fontSize: fontSize.md }]}
                    placeholder="Enter your email"
                    placeholderTextColor="#666666"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                {/* Phone Number */}
                <View style={styles.inputContainer}>
                  <ThemedText style={[styles.inputLabel, { fontSize: fontSize.sm }]}>
                    Phone Number
                  </ThemedText>
                  <TextInput
                    style={[styles.textInput, { fontSize: fontSize.md }]}
                    placeholder="+27 XX XXX XXXX"
                    placeholderTextColor="#666666"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Event Booking Summary */}
                <View style={styles.summaryContainer}>
                  <ThemedText style={[styles.summaryTitle, { fontSize: fontSize.md }]}>
                    Event Ticket Summary
                  </ThemedText>
                  <View style={styles.summaryRow}>
                    <ThemedText style={[styles.summaryLabel, { fontSize: fontSize.sm }]}>
                      Event:
                    </ThemedText>
                    <ThemedText style={[styles.summaryValue, { fontSize: fontSize.sm }]}>
                      {eventTitle}
                    </ThemedText>
                  </View>
                  {eventDate && (
                    <View style={styles.summaryRow}>
                      <ThemedText style={[styles.summaryLabel, { fontSize: fontSize.sm }]}>
                        Date:
                      </ThemedText>
                      <ThemedText style={[styles.summaryValue, { fontSize: fontSize.sm }]}>
                        {eventDate}
                      </ThemedText>
                    </View>
                  )}
                  {eventTime && (
                    <View style={styles.summaryRow}>
                      <ThemedText style={[styles.summaryLabel, { fontSize: fontSize.sm }]}>
                        Time:
                      </ThemedText>
                      <ThemedText style={[styles.summaryValue, { fontSize: fontSize.sm }]}>
                        {eventTime}
                      </ThemedText>
                    </View>
                  )}
                  <View style={styles.priceHighlightContainer}>
                    <ThemedText style={[styles.priceHighlightLabel, { fontSize: fontSize.md }]}>
                      Total Amount:
                    </ThemedText>
                    <ThemedText style={[styles.priceHighlightValue, { fontSize: fontSize.xl }]}>
                      {eventPrice}
                    </ThemedText>
                  </View>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmPurchase}
                  activeOpacity={0.8}
                >
                  <ThemedText style={[styles.confirmButtonText, { fontSize: fontSize.md }]}>
                    Confirm & Pay
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9,
    minHeight: height * 0.6,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  },
  summaryContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#CCCCCC',
    flex: 1,
  },
  summaryValue: {
    color: '#FFFFFF',
    flex: 2,
    textAlign: 'right',
  },
  summaryPrice: {
    color: '#D4AF37',
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  priceHighlightContainer: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B8941F',
  },
  priceHighlightLabel: {
    color: '#000000',
    fontWeight: '600',
    marginBottom: 8,
  },
  priceHighlightValue: {
    color: '#000000',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  confirmButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
