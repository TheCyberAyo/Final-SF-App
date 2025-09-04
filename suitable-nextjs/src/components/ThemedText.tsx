import { useThemeColor } from '@/hooks/useThemeColor';
import { cn } from '@/lib/utils';

export type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
  children: React.ReactNode;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
};

export function ThemedText({
  className,
  lightColor,
  darkColor,
  type = 'default',
  children,
  as: Component = 'p',
  ...rest
}: ThemedTextProps) {
  const baseClasses = 'transition-colors';
  
  const typeClasses = {
    default: 'text-base leading-6 text-theme-text',
    defaultSemiBold: 'text-base leading-6 font-semibold text-theme-text',
    title: 'text-3xl font-bold leading-8 text-theme-text',
    subtitle: 'text-xl font-bold text-theme-text',
    link: 'text-base leading-8 text-theme-tint hover:text-blue-800',
  };

  return (
    <Component
      className={cn(
        baseClasses,
        typeClasses[type],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

