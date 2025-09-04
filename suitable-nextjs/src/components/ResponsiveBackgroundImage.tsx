import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveBackgroundImageProps {
  source: string;
  children: React.ReactNode;
  className?: string;
  overlayColor?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export const ResponsiveBackgroundImage: React.FC<ResponsiveBackgroundImageProps> = ({
  source,
  children,
  className,
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  resizeMode = 'cover',
}) => {
  const backgroundStyle = {
    backgroundImage: `url(${source})`,
    backgroundSize: resizeMode === 'cover' ? 'cover' : 
                   resizeMode === 'contain' ? 'contain' : 
                   resizeMode === 'stretch' ? '100% 100%' : 
                   resizeMode === 'repeat' ? 'repeat' : 'center',
    backgroundPosition: resizeMode === 'center' ? 'center' : 'center',
    backgroundRepeat: resizeMode === 'repeat' ? 'repeat' : 'no-repeat',
  };

  return (
    <div 
      className={cn(
        'relative w-full h-full min-h-screen',
        className
      )}
      style={backgroundStyle}
    >
      <div 
        className="absolute inset-0 flex flex-col"
        style={{ backgroundColor: overlayColor }}
      >
        {children}
      </div>
    </div>
  );
}; 