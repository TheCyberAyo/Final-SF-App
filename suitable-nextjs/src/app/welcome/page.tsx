'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ThemedText } from '@/components/ThemedText';
import { useResponsive } from '@/hooks/useResponsive';
import { ResponsiveBackgroundImage } from '@/components/ResponsiveBackgroundImage';
import { cn } from '@/lib/utils';

export default function WelcomeScreen() {
  const { responsiveClasses } = useResponsive();
  const router = useRouter();

  const handleGetStarted = () => {
    // Go directly to sign in for now
    router.push('/auth/sign-in');
  };

  return (
    <ResponsiveBackgroundImage
      source="/assets/images/welcome-background.jpg"
      overlayColor="rgba(0, 0, 0, 0.3)"
    >
      <div className="flex-1 flex justify-center">
        {/* Get Started button */}
        <div className="flex flex-col items-center px-5 w-full">
          <button 
            className={cn(
              'bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105',
              'w-4/5 max-w-xs',
              responsiveClasses.button
            )}
            onClick={handleGetStarted}
          >
            <ThemedText 
              type="defaultSemiBold"
              className="text-black font-bold tracking-wide"
            >
              Get Started
            </ThemedText>
          </button>
        </div>
      </div>
    </ResponsiveBackgroundImage>
  );
}
