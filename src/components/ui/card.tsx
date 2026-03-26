import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Carbon Design System Card/Tile Component
 * 
 * Carbon uses "tiles" for card-like components with these variants:
 * - Default: Standard tile with Carbon gray background
 * - Selectable: Tile with selected state (blue border)
 * - Clickable: Interactive tile with hover effects
 * - Glass: Glassmorphism effect with backdrop blur
 * 
 * Features:
 * - Carbon gray-90 background with gray-70 border
 * - Hover states with border color change
 * - Selected state with blue-50 border
 * - Optional glassmorphism effect
 */
const cardVariants = cva(
  // Base styles - Carbon tile design
  'rounded-carbon-lg transition-all duration-carbon-fast ease-carbon',
  {
    variants: {
      variant: {
        // Default: Carbon gray background with subtle border
        default: [
          'bg-carbon-gray-90 border border-carbon-gray-70',
        ].join(' '),
        
        // Elevated: Slightly raised appearance
        elevated: [
          'bg-carbon-gray-90 border border-carbon-gray-70',
          'shadow-elevation-2',
        ].join(' '),
        
        // Outlined: Transparent background with border
        outlined: [
          'bg-transparent border border-carbon-gray-70',
        ].join(' '),
        
        // Glass: Glassmorphism effect
        glass: [
          'bg-carbon-gray-90/80 backdrop-blur-xl',
          'border border-carbon-gray-70/50',
        ].join(' '),
        
        // Selectable: Can be selected with blue border
        selectable: [
          'bg-carbon-gray-90 border border-carbon-gray-70',
          'cursor-pointer',
          'hover:border-carbon-gray-50',
        ].join(' '),
        
        // Clickable: Interactive tile with hover effects
        clickable: [
          'bg-carbon-gray-90 border border-carbon-gray-70',
          'cursor-pointer',
          'hover:bg-carbon-gray-80 hover:border-carbon-gray-50',
          'active:bg-carbon-gray-70',
        ].join(' '),
      },
      padding: {
        none: '',
        sm: 'p-carbon-03',    // 8px
        md: 'p-carbon-05',    // 16px
        lg: 'p-carbon-06',    // 24px
      },
      selected: {
        true: 'border-carbon-blue-50 border-2',
        false: '',
      },
      hover: {
        true: 'hover:border-carbon-gray-50 hover:shadow-elevation-1',
      },
    },
    compoundVariants: [
      // Selected state for selectable variant
      {
        variant: 'selectable',
        selected: true,
        className: 'border-carbon-blue-50 border-2',
      },
    ],
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      selected: false,
    },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, selected, interactive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ 
            variant, 
            padding, 
            hover: hover || interactive,
            selected,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card Header
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-carbon-03', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title - Carbon heading-05 style (20px, semibold)
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-carbon-xl font-semibold leading-tight text-carbon-gray-10',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description - Carbon body-02 style (14px)
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-carbon-sm text-carbon-gray-30', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

// Card Content
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

// Card Footer
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-carbon-03', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, cardVariants, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
