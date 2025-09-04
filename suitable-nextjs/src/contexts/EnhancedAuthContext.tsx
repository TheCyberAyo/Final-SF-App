'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitializing: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: { name?: string; avatar_url?: string }) => Promise<{ error: Error | null }>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null }>;
  clearError: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Session timeout handling (30 minutes)
  const SESSION_TIMEOUT = 30 * 60 * 1000;

  const clearError = () => setError(null);

  const resetSessionTimeout = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
    if (session?.user) {
      sessionTimeoutRef.current = setTimeout(() => {
        signOut();
      }, SESSION_TIMEOUT);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setError('Failed to initialize authentication');
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            resetSessionTimeout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError('Failed to initialize authentication');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setError(null);
        
        switch (event) {
          case 'SIGNED_IN':
            if (session?.user) {
              resetSessionTimeout();
            }
            break;
          case 'SIGNED_OUT':
            if (sessionTimeoutRef.current) {
              clearTimeout(sessionTimeoutRef.current);
            }
            break;
          case 'TOKEN_REFRESHED':
            if (session?.user) {
              resetSessionTimeout();
            }
            break;
          case 'USER_UPDATED':
            setUser(session?.user ?? null);
            break;
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔐 Attempting sign in for:', email);
      console.log('🌐 Environment check:', {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        urlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 50) + '...',
        isProduction: process.env.NODE_ENV === 'production'
      });
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('❌ Sign in error:', error);
        let errorMessage = error.message;
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many failed attempts. Please try again later.';
        } else if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Connection failed. Please check if the app is properly configured and try again.';
          console.error('🚨 Network/Configuration issue detected:', {
            error: error.message,
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasValidUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('https://'),
            hasValidKey: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0) > 100
          });
        }
        
        setError(errorMessage);
        return { error: new Error(errorMessage) };
      }
      
      console.log('✅ Sign in successful for:', email);
      return { error: null };
    } catch (error) {
      console.error('💥 Sign in exception:', error);
      console.error('🔍 Exception details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'Unknown',
        isNetworkError: error instanceof Error && error.message.includes('fetch')
      });
      
      let errorMessage = 'Network error. Please check your connection and try again.';
      if (error instanceof Error && error.message.includes('fetch')) {
        errorMessage = 'Failed to connect to authentication service. Please check if the app is properly deployed with correct environment variables.';
      }
      
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { name },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_SCHEME}://auth/callback`
        }
      });
      
      if (error) {
        let errorMessage = error.message;
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists.';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        setError(errorMessage);
        return { error: new Error(errorMessage) };
      }
      
      return { error: null };
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_SCHEME}://auth/reset-password`
      });
      
      if (error) {
        let errorMessage = error.message;
        if (error.message.includes('User not found')) {
          errorMessage = 'No account found with this email address.';
        }
        setError(errorMessage);
        return { error: new Error(errorMessage) };
      }
      
      return { error: null };
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      const errorMessage = 'Failed to update password. Please try again.';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: { name?: string; avatar_url?: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates
      });
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      const errorMessage = 'Failed to update profile. Please try again.';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_SCHEME}://auth/callback`
        }
      });
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      const errorMessage = 'Failed to resend verification email. Please try again.';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isInitializing,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    resendVerificationEmail,
    clearError,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 