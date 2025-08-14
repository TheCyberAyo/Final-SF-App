import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
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
import { validateEmail, validatePassword } from '@/utils/validation';

export default function SignInScreen() {
  const [email, setEmail] = useState('dylan@suitablefocus.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signIn, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const { fontSize, padding, margin, borderRadius, buttonSize } = useResponsive();
  const insets = useSafeAreaInsets();

  // Email and password validation now handled by utility functions
  // validateEmail() checks: empty, format (username@domain.tld), no spaces
  // validatePassword() checks: empty, no leading/trailing spaces, not common passwords

  const handleSignIn = async () => {
    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const { error } = await signIn(email, password);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      // Navigate to main app after successful sign in
      router.replace('/(tabs)');
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Clear error when user starts typing
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google Sign-In
    Alert.alert('Coming Soon', 'Google Sign-In will be implemented soon!');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/auth/sign-up');
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

            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={[styles.title, { fontSize: fontSize.xxxl }]}>
                Welcome Back!
              </Text>
              <Text style={[styles.subtitle, { fontSize: fontSize.md, marginTop: margin.sm }]}>
                How can we help you today?
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>
                  Email Address
                </Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      fontSize: fontSize.md,
                      height: buttonSize.md.height,
                      borderRadius: borderRadius.md,
                      borderColor: emailError ? '#FF6B6B' : '#E0E0E0',
                    }
                  ]}
                  placeholder="dylan@suitablefocus.com"
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

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>
                  Password
                </Text>
                <View style={[
                  styles.passwordContainer, 
                  { 
                    height: buttonSize.md.height,
                    borderRadius: borderRadius.md,
                    borderColor: passwordError ? '#FF6B6B' : '#E0E0E0',
                  }
                ]}>
                  <TextInput
                    style={[styles.passwordInput, { fontSize: fontSize.md }]}
                    placeholder="••••••••"
                    placeholderTextColor="#999999"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <IconSymbol 
                      size={20} 
                      name={showPassword ? "eye.slash" : "eye"} 
                      color="#D4AF37" 
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={[styles.errorText, { fontSize: fontSize.sm, marginTop: margin.xs }]}>
                    {passwordError}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.forgotPasswordButton}
                  onPress={handleForgotPassword}
                >
                  <Text style={[styles.forgotPasswordText, { fontSize: fontSize.sm }]}>
                    Recovery Password
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={[styles.signInButton, { 
                  height: buttonSize.lg.height,
                  borderRadius: borderRadius.lg,
                  marginTop: margin.lg,
                }]}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                <Text style={[styles.signInButtonText, { fontSize: fontSize.lg }]}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Google Sign In Button */}
              <TouchableOpacity
                style={[styles.googleButton, { 
                  height: buttonSize.lg.height,
                  borderRadius: borderRadius.lg,
                  marginTop: margin.md,
                }]}
                onPress={handleGoogleSignIn}
              >
                <View style={styles.googleButtonContent}>
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={[styles.googleButtonText, { fontSize: fontSize.md }]}>
                    Sign in with google
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Bottom Sign Up Link */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
              >
                <Text style={[styles.signUpText, { fontSize: fontSize.md }]}>
                  Don't Have An Account?{' '}
                  <Text style={styles.signUpLink}>Sign Up For Free</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  titleSection: {
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left',
  },
  subtitle: {
    color: '#666666',
    textAlign: 'left',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
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
  passwordContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    color: '#333333',
  },
  eyeButton: {
    padding: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#666666',
  },
  errorText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: 12,
  },
  googleButtonText: {
    color: '#333333',
    fontWeight: '500',
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  signUpButton: {
    alignItems: 'center',
  },
  signUpText: {
    color: '#666666',
    textAlign: 'center',
  },
  signUpLink: {
    color: '#333333',
    fontWeight: '600',
  },
}); 