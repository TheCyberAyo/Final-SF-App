import React, { useState } from 'react';
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
import { validateEmail } from '@/utils/validation';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('dylan@suitablefocus.com');
  const [emailError, setEmailError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', buttons: [] as any[] });
  const { resetPassword, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const { fontSize, padding, margin, borderRadius, buttonSize } = useResponsive();
  const insets = useSafeAreaInsets();

  // Email validation now handled by utility function
  // validateEmail() checks: empty, format (username@domain.tld), no spaces

  const handleResetPassword = async () => {
    // Clear previous errors
    setEmailError('');

    // Validate email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    const { error } = await resetPassword(email);
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
        message: 'Password reset email sent! Please check your email for further instructions.',
        buttons: [{ text: 'OK', onPress: () => { setAlertVisible(false); router.push('/auth/sign-in'); } }]
      });
      setAlertVisible(true);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

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
        >
          <View style={[styles.content, { paddingHorizontal: padding.md }]}>
            {/* Header with back button */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/welcome')}
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
                Recovery Password
              </Text>
              
              {/* Subtitle */}
              <Text style={[styles.subtitle, { fontSize: fontSize.md, marginTop: margin.sm }]}>
                Please Enter Your Email Address To Recieve a Verification Code
              </Text>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>
                  Email Address
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      height: buttonSize.md.height,
                      borderRadius: borderRadius.md,
                      fontSize: fontSize.md,
                      borderColor: emailError ? '#FF6B6B' : '#E0E0E0',
                    },
                  ]}
                  placeholder="Enter your email address"
                  placeholderTextColor="#999999"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {emailError ? (
                  <Text style={[styles.errorText, { fontSize: fontSize.sm, marginTop: margin.xs }]}>
                    {emailError}
                  </Text>
                ) : null}
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={[
                  styles.continueButton,
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
                <Text style={[styles.continueButtonText, { fontSize: fontSize.md }]}>
                  {isLoading ? 'Sending...' : 'Continue'}
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
    marginBottom: 32,
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
  continueButton: {
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
  continueButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
}); 