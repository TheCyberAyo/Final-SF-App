import { cn } from '@/lib/utils';

export type ThemedViewProps = {
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  children,
  className,
  ...otherProps 
}: ThemedViewProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-background', className)}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  );
}