import { cn } from '@/lib/utils';

export type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  children,
  className,
  ...rest
}: ThemedTextProps & React.HTMLAttributes<HTMLSpanElement>) {
  const getTypeClasses = () => {
    switch (type) {
      case 'title':
        return 'text-3xl font-bold leading-8';
      case 'defaultSemiBold':
        return 'text-base font-semibold leading-6';
      case 'subtitle':
        return 'text-xl font-bold';
      case 'link':
        return 'text-base leading-7 text-blue-500';
      default:
        return 'text-base leading-6';
    }
  };

  return (
    <span
      className={cn(
        'text-foreground',
        getTypeClasses(),
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </span>
  );
}