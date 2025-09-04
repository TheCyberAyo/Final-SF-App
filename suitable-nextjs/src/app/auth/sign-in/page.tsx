'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/EnhancedAuthContext';
import AuthWrapper from '@/components/AuthWrapper';
import DiagnosticInfo from '@/components/DiagnosticInfo';

function SignInContent() {
  const [email, setEmail] = useState('dylan@suitablefocus.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message);
        return;
      }
      
      // Navigate to dashboard
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in
    console.log('Google sign-in clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Back Button */}
      <div className="px-4 py-2">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-base">
            How can we help you today?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-800 font-bold text-base mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="dylan@suitablefocus.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-800 font-bold text-base mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="text-right mt-2">
              <Link href="/auth/forgot-password" className="text-gray-400 text-sm hover:text-gray-600">
                Recovery Password
              </Link>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-white font-bold py-4 px-6 rounded-full transition-colors text-lg"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-full transition-colors text-lg flex items-center justify-center space-x-3"
          >
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              G
            </div>
            <span>Sign in with google</span>
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-base">
            Don't Have An Account?{' '}
            <Link href="/auth/sign-up" className="text-gray-800 font-bold">
              Sign Up For Free
            </Link>
          </p>
        </div>
      </div>
      
      {/* Diagnostic Info - only show in development or when needed */}
      {process.env.NODE_ENV === 'development' && <DiagnosticInfo />}
    </div>
  );
}

export default function SignInPage() {
  return (
    <AuthWrapper requireAuth={false}>
      <SignInContent />
    </AuthWrapper>
  );
}
