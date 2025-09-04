'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordSuccessScreen() {
  const router = useRouter();

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
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Check Your Email
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            We've sent a verification code to<br />
            <span className="text-blue-600 font-semibold">your email address</span>
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/auth/forgot-password')}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 px-6 rounded-full transition-colors text-lg"
          >
            Resend Code
          </button>
          
          <Link 
            href="/auth/sign-in"
            className="inline-flex items-center justify-center w-full text-blue-600 hover:text-blue-800 font-semibold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
