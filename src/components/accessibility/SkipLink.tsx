import React from 'react';
import { cn } from '../../lib/utils';

export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SkipLink component provides keyboard navigation shortcuts for accessibility.
 * The link is visually hidden but becomes visible when focused via keyboard navigation.
 * This allows screen reader users and keyboard users to skip repetitive navigation.
 *
 * @param href - The target element ID to skip to (e.g., "#main-content")
 * @param children - The text content of the skip link
 * @param className - Optional additional CSS classes
 */
export const SkipLink: React.FC<SkipLinkProps> = ({ href, children, className }) => {
  return (
    <a
      href={href}
      className={cn(
        // Screen reader only by default
        'sr-only',
        // Visible when focused
        'focus:not-sr-only',
        'focus:absolute focus:top-4 focus:left-4 focus:z-[100]',
        'focus:px-4 focus:py-2',
        'focus:bg-teal-600 focus:text-white focus:rounded',
        'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900',
        'transition-all duration-200',
        'font-medium',
        className
      )}
    >
      {children}
    </a>
  );
};

export default SkipLink;
