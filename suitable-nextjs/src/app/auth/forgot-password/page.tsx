'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/EnhancedAuthContext';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('dylan@suitablefocus.com');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        setError(resetError.message);
        return;
      }
      
      // Navigate to success page
      router.push('/auth/forgot-password/success');
      
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Recovery Password
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Please Enter Your Email Address To<br />
            Recieve a Verification Code
          </p>
        </div>

        <form onSubmit={handleContinue} className="space-y-6">
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
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-white font-bold py-4 px-6 rounded-full transition-colors text-lg"
          >
            {isSubmitting ? 'Sending...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}

