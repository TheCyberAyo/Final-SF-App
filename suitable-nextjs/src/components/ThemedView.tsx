import { useThemeColor } from '@/hooks/useThemeColor';
import { cn } from '@/lib/utils';

export type ThemedViewProps = {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  children?: React.ReactNode;
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
};

export function ThemedView({ 
  className, 
  lightColor, 
  darkColor, 
  children, 
  as: Component = 'div',
  ...otherProps 
}: ThemedViewProps) {
  return (
    <Component 
      className={cn(
        'transition-colors bg-theme-background',
        className
      )}
      {...otherProps}
    >
      {children}
    </Component>
  );
}
