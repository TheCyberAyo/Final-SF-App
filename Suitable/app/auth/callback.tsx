import { useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    // Handle when app is opened from a deep link
    const handleDeepLink = async () => {
      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'PASSWORD_RECOVERY') {
            // User clicked password reset link
            router.push('/auth/reset-password');
          }
        }
      );

      return () => subscription.unsubscribe();
    };

    handleDeepLink();
  }, []);

  return null;
}