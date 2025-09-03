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
import { useColorScheme } from '@/hooks/useColorScheme';
import { useResponsive } from '@/hooks/useResponsive';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CustomAlert } from '@/components/ui/CustomAlert';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', buttons: [] as any[] });
  const { signUp, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const { fontSize, padding, margin, borderRadius, buttonSize } = useResponsive();
  const insets = useSafeAreaInsets();

  const validateName = (name: string) => {
    if (!name) {
      return 'Please enter your brand name';
    }
    if (name.trim().length < 2) {
      return 'Brand name must be at least 2 characters long';
    }
    return '';
  };

  const handleSignUp = async () => {
    // Clear previous errors
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Validate name
    const nameValidationError = validateName(name);
    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }

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

    const { error } = await signUp(email, password, name);
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
        message: 'Account created successfully! Please check your email to verify your account.',
        buttons: [{ text: 'OK', onPress: () => { setAlertVisible(false); router.push('/auth/sign-in'); } }]
      });
      setAlertVisible(true);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    setNameError('');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError('');
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google Sign-In
    setAlertConfig({
      title: 'Coming Soon',
      message: 'Google Sign-In will be implemented soon!',
      buttons: [{ text: 'OK', onPress: () => setAlertVisible(false) }]
    });
    setAlertVisible(true);
  };

  const handleSignIn = () => {
    router.push('/auth/sign-in');
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
              <Text style={[styles.title, { fontSize: fontSize.xxxl }]}>Create Account</Text>
              <Text style={[styles.subtitle, { fontSize: fontSize.md, marginTop: margin.sm }]}>Let's Create Account Together</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Brand Name Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>Brand Name</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      fontSize: fontSize.md, 
                      height: buttonSize.md.height, 
                      borderRadius: borderRadius.md,
                      borderColor: nameError ? '#FF6B6B' : '#E0E0E0',
                    }
                  ]}
                  placeholder="Suitable Focus"
                  placeholderTextColor="#999999"
                  value={name}
                  onChangeText={handleNameChange}
                  autoCapitalize="words"
                  autoCorrect={false}
                  accessibilityLabel="Brand name"
                  accessibilityHint="Enter your brand name"
                />
                {nameError ? (
                  <Text style={[styles.errorText, { fontSize: fontSize.sm, marginTop: margin.xs }]}>
                    {nameError}
                  </Text>
                ) : null}
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>Email Address</Text>
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
                  accessibilityLabel="Email address"
                  accessibilityHint="Enter your email address to create an account"
                  inputMode="email"
                />
                {emailError ? (
                  <Text style={[styles.errorText, { fontSize: fontSize.sm, marginTop: margin.xs }]}>
                    {emailError}
                  </Text>
                ) : null}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { fontSize: fontSize.sm, marginBottom: margin.xs }]}>Password</Text>
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
                    accessibilityLabel="Password"
                    accessibilityHint="Create a secure password for your account"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                    accessibilityHint="Toggle password visibility"
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
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[styles.signUpButton, { height: buttonSize.lg.height, borderRadius: borderRadius.lg, marginTop: margin.lg }]}
                onPress={handleSignUp}
                disabled={isLoading}
                accessibilityLabel="Sign up"
                accessibilityHint="Create your account with the provided information"
              >
                <Text style={[styles.signUpButtonText, { fontSize: fontSize.lg }]}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

              {/* Google Sign Up Button */}
              <TouchableOpacity
                style={[styles.googleButton, { height: buttonSize.lg.height, borderRadius: borderRadius.lg, marginTop: margin.md }]}
                onPress={handleGoogleSignIn}
                accessibilityLabel="Sign up with Google"
                accessibilityHint="Create your account using Google"
              >
                <View style={styles.googleButtonContent}>
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={[styles.googleButtonText, { fontSize: fontSize.md }]}>Sign up with Google</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Bottom Sign In Link */}
            <View style={styles.bottomSection}>
              <TouchableOpacity 
                style={styles.signInButton} 
                onPress={handleSignIn}
                accessibilityLabel="Already have an account"
                accessibilityHint="Navigate to sign in screen"
              >
                <Text style={[styles.signInText, { fontSize: fontSize.md }]}>Already Have An Account?{' '}<Text style={styles.signInLink}>Sign In</Text></Text>
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
    // flex: 1, // Removed to prevent potential layout issues
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
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    color: '#333333',
  },
  passwordContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  signUpButton: {
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
  signUpButtonText: {
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
  signInButton: {
    alignItems: 'center',
  },
  signInText: {
    color: '#666666',
    textAlign: 'center',
  },
  signInLink: {
    color: '#333333',
    fontWeight: '600',
  },
  errorText: {
    color: '#FF6B6B',
    marginTop: 4,
  },
});