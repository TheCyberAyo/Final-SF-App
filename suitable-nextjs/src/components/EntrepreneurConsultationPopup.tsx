import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { useResponsive } from '@/hooks/useResponsive';
import { useCart } from '@/contexts/CartContext';

const { width, height } = Dimensions.get('window');

interface EntrepreneurConsultationPopupProps {
  visible: boolean;
  onClose: () => void;
  onOpenCart?: () => void;
}

export default function EntrepreneurConsultationPopup({
  visible,
  onClose,
  onOpenCart,
}: EntrepreneurConsultationPopupProps) {
  const { fontSize, spacing } = useResponsive();
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState<'in-person' | 'online' | null>(null);

  const handleOptionSelect = (option: 'in-person' | 'online') => {
    setSelectedOption(option);
  };

  const handleAddToCart = () => {
    if (!selectedOption) {
      Alert.alert('Error', 'Please select a consultation type');
      return;
    }

    const price = selectedOption === 'in-person' ? 600 : 350;
    const name = `Entrepreneurs and SMEs Consultations (${selectedOption === 'in-person' ? 'In-Person' : 'Online'})`;

    addToCart({
      id: `entrepreneur-consultation-${selectedOption}`,
      name,
      price,
      type: selectedOption,
      image: 'EntrepreneurConsultation.jpg',
    });

    // Open cart immediately after adding
    setSelectedOption(null);
    onClose();
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.popupContainer, { borderRadius: spacing.md }]}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={[styles.title, { fontSize: fontSize.xl }]}>
              Entrepreneurs and SMEs Consultations
            </ThemedText>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <IconSymbol name="xmark" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/images/EntrepreneurConsultation.jpg')}
              style={styles.serviceImage}
              resizeMode="cover"
            />
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <ThemedText style={[styles.description, { fontSize: fontSize.md }]}>
              Get expert guidance from our experienced entrepreneurs to help grow your business and overcome challenges.
            </ThemedText>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            <ThemedText style={[styles.optionsTitle, { fontSize: fontSize.lg }]}>
              Choose Consultation Type:
            </ThemedText>

            {/* In-Person Option */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === 'in-person' && styles.selectedOption,
                { marginBottom: spacing.sm }
              ]}
              onPress={() => handleOptionSelect('in-person')}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <IconSymbol name="person.2.fill" size={24} color="#D4AF37" />
                  <ThemedText style={[styles.optionTitle, { fontSize: fontSize.md }]}>
                    In-Person Consultation
                  </ThemedText>
                </View>
                <ThemedText style={[styles.optionDescription, { fontSize: fontSize.sm }]}>
                  Face-to-face meeting with personalized attention
                </ThemedText>
                <ThemedText style={[styles.optionPrice, { fontSize: fontSize.lg }]}>
                  R 600.00
                </ThemedText>
              </View>
              {selectedOption === 'in-person' && (
                <View style={styles.checkmark}>
                  <IconSymbol name="checkmark.circle.fill" size={24} color="#D4AF37" />
                </View>
              )}
            </TouchableOpacity>

            {/* Online Option */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === 'online' && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect('online')}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionHeader}>
                  <IconSymbol name="video.fill" size={24} color="#D4AF37" />
                  <ThemedText style={[styles.optionTitle, { fontSize: fontSize.md }]}>
                    Online Consultation
                  </ThemedText>
                </View>
                <ThemedText style={[styles.optionDescription, { fontSize: fontSize.sm }]}>
                  Virtual meeting from anywhere in the world
                </ThemedText>
                <ThemedText style={[styles.optionPrice, { fontSize: fontSize.lg }]}>
                  R 350.00
                </ThemedText>
              </View>
              {selectedOption === 'online' && (
                <View style={styles.checkmark}>
                  <IconSymbol name="checkmark.circle.fill" size={24} color="#D4AF37" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.addToCartButton, !selectedOption && styles.disabledButton]}
              onPress={handleAddToCart}
              disabled={!selectedOption}
            >
              <ThemedText style={styles.addToCartText}>Add to Cart</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popupContainer: {
    backgroundColor: '#1a1a1a',
    width: '100%',
    maxWidth: 400,
    maxHeight: height * 0.8,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    color: '#CCCCCC',
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#D4AF37',
    backgroundColor: '#3a3a3a',
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  optionDescription: {
    color: '#CCCCCC',
    marginBottom: 8,
  },
  optionPrice: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  checkmark: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  addToCartButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#666666',
  },
  addToCartText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
