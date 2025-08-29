import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useResponsive } from '@/hooks/useResponsive';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CustomAlert } from '@/components/ui/CustomAlert';
import { supabase } from '@/lib/supabase';
import { validatePassword } from '@/utils/validation';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', buttons: [] as any[] });
  const { updatePassword, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const { fontSize, padding, margin, borderRadius, buttonSize } = useResponsive();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Check if we have a valid session for password recovery
    const checkRecoverySession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        setAlertConfig({
          title: 'Invalid Link',
          message: 'This password reset link is invalid or has expired. Please request a new one.',
          buttons: [{ text: 'OK', onPress: () => { setAlertVisible(false); router.push('/auth/forgot-password'); } }]
        });
        setAlertVisible(true);
      } else {
        setIsTokenValid(true);
      }
    };

    checkRecoverySession();
  }, []);

  // Password validation now handled by utility function
  // validatePassword() checks: empty, no leading/trailing spaces, not common passwords

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleResetPassword = async () => {
    // Clear previous errors
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate new password
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    // Validate confirm password
    const confirmPasswordValidationError = validateConfirmPassword(confirmPassword, newPassword);
    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
      return;
    }

    const { error } = await updatePassword(newPassword);
    if (error) {
      setAlertConfig({
        title: 'Error',
        message: error.message,
        buttons: [{ text: 'OK', onPress: () => setAlertVisible(false) }]
      });
      setAlertVisible(true);
    } else {
      setAlertConfig({
        title: 'Success', 
        message: 'Your password has been updated successfully!',
        buttons: [{ text: 'OK', onPress: () => { setAlertVisible(false); router.push('/auth/sign-in'); } }]
      });
      setAlertVisible(true);
    }
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    // Clear error when user starts typing
    if (passwordError) {
      setPasswordError('');
    }
    // Clear confirm password error if passwords now match
    if (confirmPasswordError && text === confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    // Clear error when user starts typing
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  if (!isTokenValid) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ textAlign: 'center', color: '#666666', fontSize: 16 }}>Verifying reset link...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <KeyboardAvoidingView
        style={[styles.container, { paddingTop: insets.top }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.content, { paddingHorizontal: padding.md }]}>
            {/* Header with back button */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/auth/forgot-password')}
              >
                <IconSymbol 
                  size={24} 
                  name="chevron.left" 
                  color="#333333" 
                />
              </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              {/* Title */}
              <Text style={[styles.title, { fontSize: fontSize.xxxl }]}>
                Reset Your Password
              </Text>
              
              {/* Subtitle */}
              <Text style={[styles.subtitle, { fontSize: fontSize.md, marginTop: margin.sm }]}>
                Please enter your new password below
              </Text>

              {/* Password Inputs */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>
                  New Password
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      height: buttonSize.md.height,
                      borderRadius: borderRadius.md,
                      fontSize: fontSize.md,
                      borderColor: passwordError ? '#FF6B6B' : '#E0E0E0',
                    },
                  ]}
                  placeholder="Enter your new password"
                  placeholderTextColor="#999999"
                  value={newPassword}
                  onChangeText={handleNewPasswordChange}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                />
                {passwordError ? (
                  <Text style={[styles.errorText, { fontSize: fontSize.sm, marginTop: margin.xs }]}>
                    {passwordError}
                  </Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>
                  Confirm New Password
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      height: buttonSize.md.height,
                      borderRadius: borderRadius.md,
                      fontSize: fontSize.md,
                      borderColor: confirmPasswordError ? '#FF6B6B' : '#E0E0E0',
                    },
                  ]}
                  placeholder="Confirm your new password"
                  placeholderTextColor="#999999"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="newPassword"
                />
                {confirmPasswordError ? (
                  <Text style={[styles.errorText, { fontSize: fontSize.sm, marginTop: margin.xs }]}>
                    {confirmPasswordError}
                  </Text>
                ) : null}
              </View>

              {/* Update Password Button */}
              <TouchableOpacity
                style={[
                  styles.updateButton,
                  {
                    height: buttonSize.lg.height,
                    borderRadius: borderRadius.lg,
                    opacity: isLoading ? 0.7 : 1,
                  },
                ]}
                onPress={handleResetPassword}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text style={[styles.updateButtonText, { fontSize: fontSize.md }]}>
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onDismiss={() => setAlertVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputLabel: {
    fontWeight: '600',
    color: '#333333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 16,
    color: '#333333',
  },
  errorText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});