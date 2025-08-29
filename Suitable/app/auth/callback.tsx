import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    console.log('🔗 AuthCallback component mounted');
    
    // Handle when app is opened from a deep link
    const handleDeepLink = async () => {
      console.log('🔗 Setting up auth state change listener');
      
      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('🔗 Auth state change event:', event);
          console.log('🔗 Session:', session?.user?.email);
          
          switch (event) {
            case 'PASSWORD_RECOVERY':
              // User clicked password reset link
              console.log('🔗 Password recovery detected, navigating to reset-password');
              router.push('/auth/reset-password');
              break;
              
            case 'EMAIL_CONFIRMED':
              // User confirmed their email
              console.log('🔗 Email confirmed successfully');
              // Navigate to sign-in page with success message
              router.push('/auth/sign-in?emailConfirmed=true');
              break;
              
            case 'SIGNED_IN':
              // User signed in successfully
              if (session?.user) {
                console.log('🔗 User signed in:', session.user.email);
                router.push('/(tabs)');
              }
              break;
              
            case 'SIGNED_OUT':
              // User signed out
              console.log('🔗 User signed out, navigating to welcome');
              router.push('/welcome');
              break;
              
            case 'TOKEN_REFRESHED':
              console.log('🔗 Token refreshed');
              break;
              
            case 'USER_UPDATED':
              console.log('🔗 User updated');
              break;
              
            default:
              console.log('🔗 Unhandled auth event:', event);
              break;
          }
        }
      );

      // Also check the current URL for any auth parameters
      const url = window.location?.href;
      if (url) {
        console.log('🔗 Current URL:', url);
        
        // Check for email confirmation tokens
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        const type = urlParams.get('type');
        
        if (accessToken && refreshToken) {
          console.log('🔗 Found auth tokens in URL, type:', type);
          
          // Set the session manually if we have tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            console.error('🔗 Error setting session:', error);
          } else {
            console.log('🔗 Session set successfully');
          }
        }
      }

      return () => subscription.unsubscribe();
    };

    handleDeepLink();
  }, []);

  return null;
}