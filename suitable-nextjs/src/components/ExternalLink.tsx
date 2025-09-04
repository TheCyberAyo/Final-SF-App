import Link from 'next/link';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      href={href}
    />
  );
}