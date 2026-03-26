import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Carbon Design System Button Component
 * 
 * Variants:
 * - Primary: Main CTAs with Carbon blue (#0f62fe)
 * - Secondary: Secondary actions with gray background
 * - Tertiary: Outlined buttons for tertiary actions
 * - Ghost: Transparent buttons for subtle actions
 * - Danger: Destructive actions with red
 * 
 * Sizes:
 * - sm: 32px height, 12px font
 * - md: 40px height, 14px font
 * - lg: 48px height, 14px font
 */
const buttonVariants = cva(
  // Base styles - Carbon Design principles
  'inline-flex items-center justify-center gap-2 font-sans font-normal rounded-carbon transition-all duration-carbon-fast ease-carbon focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // Primary: Carbon blue background, white text
        primary: [
          'bg-carbon-blue-60 text-white',
          'hover:bg-carbon-blue-70',
          'active:bg-carbon-blue-80',
          'focus-visible:ring-2 focus-visible:ring-carbon-blue-50 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-gray-100',
        ].join(' '),
        
        // Secondary: Gray background, white text
        secondary: [
          'bg-carbon-gray-80 text-carbon-gray-10',
          'hover:bg-carbon-gray-70',
          'active:bg-carbon-gray-60',
          'focus-visible:ring-2 focus-visible:ring-carbon-blue-50 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-gray-100',
        ].join(' '),
        
        // Tertiary: Transparent with border
        tertiary: [
          'bg-transparent text-carbon-gray-10 border border-carbon-gray-50',
          'hover:bg-carbon-gray-80 hover:border-carbon-gray-40',
          'active:bg-carbon-gray-70',
          'focus-visible:ring-2 focus-visible:ring-carbon-blue-50 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-gray-100',
        ].join(' '),
        
        // Ghost: Transparent, subtle hover
        ghost: [
          'bg-transparent text-carbon-blue-40',
          'hover:bg-carbon-gray-80 hover:text-carbon-blue-30',
          'active:bg-carbon-gray-70',
          'focus-visible:ring-2 focus-visible:ring-carbon-blue-50 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-gray-100',
        ].join(' '),
        
        // Danger: Red for destructive actions
        danger: [
          'bg-status-error text-white',
          'hover:bg-red-700',
          'active:bg-red-800',
          'focus-visible:ring-2 focus-visible:ring-red-50 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-gray-100',
        ].join(' '),
        
        // Outline: Alias for tertiary (backward compatibility)
        outline: [
          'bg-transparent text-carbon-gray-10 border border-carbon-gray-50',
          'hover:bg-carbon-gray-80 hover:border-carbon-gray-40',
          'active:bg-carbon-gray-70',
          'focus-visible:ring-2 focus-visible:ring-carbon-blue-50 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-gray-100',
        ].join(' '),
      },
      size: {
        // sm: 32px height, 12px font, 8px 16px padding
        sm: 'h-8 px-carbon-03 text-carbon-xs',
        // md: 40px height, 14px font, 12px 20px padding
        md: 'h-10 px-carbon-04 text-carbon-sm',
        // lg: 48px height, 14px font, 16px 24px padding
        lg: 'h-12 px-carbon-05 text-carbon-sm',
        // Icon button sizes
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
