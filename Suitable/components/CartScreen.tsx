import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';
import { useResponsive } from '@/hooks/useResponsive';
import { useCart } from '@/contexts/CartContext';

const { width, height } = Dimensions.get('window');

interface CartScreenProps {
  visible: boolean;
  onClose: () => void;
}

export default function CartScreen({ visible, onClose }: CartScreenProps) {
  const { fontSize, spacing } = useResponsive();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getItemCount } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items first.');
      return;
    }

    Alert.alert(
      'Checkout',
      `Total: R${getTotalPrice().toFixed(2)}\n\nProceed to checkout?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => {
            Alert.alert(
              'Order Confirmed!',
              'Thank you for your order. You will receive a confirmation email shortly.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    clearCart();
                    onClose();
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearCart,
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { fontSize: fontSize.xl }]}>
          Shopping Cart
        </ThemedText>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
          <IconSymbol name="trash" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyCart}>
            <IconSymbol name="cart" size={64} color="#666666" />
            <ThemedText style={[styles.emptyCartText, { fontSize: fontSize.lg }]}>
              Your cart is empty
            </ThemedText>
            <ThemedText style={[styles.emptyCartSubtext, { fontSize: fontSize.md }]}>
              Add some items to get started
            </ThemedText>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              {/* Item Image */}
              <View style={styles.itemImageContainer}>
                {item.image ? (
                  <Image
                    source={require('@/assets/images/EntrepreneurConsultation.jpg')}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <IconSymbol name="photo" size={32} color="#666666" />
                  </View>
                )}
              </View>

              {/* Item Details */}
              <View style={styles.itemDetails}>
                <ThemedText style={[styles.itemName, { fontSize: fontSize.md }]}>
                  {item.name}
                </ThemedText>
                <ThemedText style={[styles.itemPrice, { fontSize: fontSize.lg }]}>
                  R {item.price.toFixed(2)}
                </ThemedText>
                
                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <IconSymbol name="minus" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                  <ThemedText style={[styles.quantityText, { fontSize: fontSize.md }]}>
                    {item.quantity}
                  </ThemedText>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <IconSymbol name="plus" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <IconSymbol name="xmark.circle.fill" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <ThemedText style={[styles.totalLabel, { fontSize: fontSize.lg }]}>
              Total ({getItemCount()} items):
            </ThemedText>
            <ThemedText style={[styles.totalAmount, { fontSize: fontSize.xl }]}>
              R {getTotalPrice().toFixed(2)}
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <ThemedText style={styles.checkoutText}>Proceed to Checkout</ThemedText>
          </TouchableOpacity>
        </View>
      )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 480,
    maxHeight: height * 0.85,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  clearButton: {
    padding: 8,
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyCartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyCartSubtext: {
    color: '#CCCCCC',
    marginTop: 8,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  itemImageContainer: {
    marginRight: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#D4AF37',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#D4AF37',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
