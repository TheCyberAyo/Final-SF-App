import { createClient } from '@supabase/supabase-js';

// Use environment variables for security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pgjobxocgnbseaphcsyp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnam9ieG9jZ25ic2VhcGhjc3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3ODc1MTQsImV4cCI6MjA2OTM2MzUxNH0.p12RKXGqBMdNDL94QyRMmSetGACkzEISTPYWKkH9NIU';
const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'suitable';

// Warning if using placeholder values
if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder_key') {
  console.warn('⚠️  Supabase is using placeholder values. Please configure your environment variables.');
  console.warn('Create a .env.local file with:');
  console.warn('NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  console.warn('NEXT_PUBLIC_APP_SCHEME=suitable');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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