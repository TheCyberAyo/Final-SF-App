import { createClient } from '@supabase/supabase-js';

// Use environment variables for security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'suitable';

// Check if environment variables are configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please create a .env.local file with:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  console.error('NEXT_PUBLIC_APP_SCHEME=suitable');
  
  // For build-time, use placeholder values to prevent build failure
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Using placeholder values for build. Set proper environment variables in Vercel.');
  } else {
    throw new Error('Missing required Supabase environment variables');
  }
}

// Use actual values or placeholders for build
const finalSupabaseUrl = supabaseUrl || 'https://placeholder.supabase.co';
const finalSupabaseAnonKey = supabaseAnonKey || 'placeholder_key';

export const supabase = createClient(finalSupabaseUrl, finalSupabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Enhanced password reset function with proper typing and error handling
 */
export const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${appScheme}://auth/callback`,
    });

    return { error };
  } catch (error) {
    return { 
      error: error instanceof Error ? error : new Error('Failed to send reset email') 
    };
  }
};

/**
 * Additional utility functions for auth state management
 */
export const getCurrentSession = async () => {
  return await supabase.auth.getSession();
};

export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Type definitions for better TypeScript support
interface Session {
  user: User;
  access_token: string;
  refresh_token: string;
}

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
  };
}