'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/EnhancedAuthContext';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthWrapper({ 
  children, 
  requireAuth = false, 
  redirectTo = '/auth/sign-in' 
}: AuthWrapperProps) {
  const { user, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing) {
      if (requireAuth && !user) {
        // User is not authenticated but auth is required
        router.push(redirectTo);
      } else if (!requireAuth && user && redirectTo === '/auth/sign-in') {
        // User is authenticated but trying to access auth pages
        router.push('/dashboard');
      }
    }
  }, [user, isInitializing, requireAuth, redirectTo, router]);

  // Show loading during initial auth check
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user && redirectTo === '/auth/sign-in') {
    return null;
  }

  return <>{children}</>;
}
