import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
  onDismiss?: () => void;
}

export function CustomAlert({
  visible,
  title,
  message,
  buttons = [{ text: 'OK', onPress: () => {} }],
  onDismiss,
}: CustomAlertProps) {
  const { fontSize, padding, margin, borderRadius, buttonSize } = useResponsive();

  const handleBackdropPress = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleBackdropPress}
        accessibilityRole="button"
        accessibilityLabel="Close alert"
      >
        <View style={styles.alertContainer}>
          <View style={[styles.alertContent, { padding: padding.lg }]}>
            <Text style={[styles.title, { fontSize: fontSize.lg, marginBottom: margin.sm }]}>
              {title}
            </Text>
            <Text style={[styles.message, { fontSize: fontSize.md, marginBottom: margin.lg }]}>
              {message}
            </Text>
            <View style={styles.buttonContainer}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    button.style === 'destructive' && styles.destructiveButton,
                    button.style === 'cancel' && styles.cancelButton,
                    { 
                      height: buttonSize.md.height, 
                      borderRadius: borderRadius.md,
                      marginLeft: index > 0 ? margin.sm : 0,
                    }
                  ]}
                  onPress={button.onPress}
                  accessibilityRole="button"
                  accessibilityLabel={button.text}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontSize: fontSize.md },
                      button.style === 'destructive' && styles.destructiveButtonText,
                      button.style === 'cancel' && styles.cancelButtonText,
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 400,
  },
  alertContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  message: {
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  destructiveButton: {
    backgroundColor: '#FF6B6B',
  },
  destructiveButtonText: {
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666666',
  },
});
