import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Carbon Design System Badge/Tag Component
 * 
 * Features:
 * - Default: Gray background with light text
 * - Primary: Blue tinted background with blue text
 * - Success: Green tinted background with green text
 * - Warning: Yellow tinted background with yellow text
 * - Error: Red tinted background with red text
 * 
 * Sizes:
 * - sm: Compact badge for dense layouts
 * - md: Default badge size
 * - lg: Larger badge for emphasis
 * 
 * Carbon Design Tags:
 * - Filterable tags with dismiss button
 * - Interactive tags for selection
 */
const badgeVariants = cva(
  // Base styles - Carbon tag design
  [
    'inline-flex items-center gap-carbon-01',
    'rounded-carbon',
    'font-sans font-normal',
    'transition-all duration-carbon-fast ease-carbon',
  ].join(' '),
  {
    variants: {
      variant: {
        // Default: Neutral gray tag
        default: 'bg-carbon-gray-80 text-carbon-gray-10',
        
        // Primary: Blue interactive tag
        primary: 'bg-carbon-blue-60/20 text-carbon-blue-30',
        
        // Secondary: Subtle gray tag
        secondary: 'bg-carbon-gray-70 text-carbon-gray-30',
        
        // Success: Green positive/valid tag
        success: 'bg-status-success/20 text-status-success',
        
        // Warning: Yellow caution tag
        warning: 'bg-status-warning/20 text-status-warning',
        
        // Error: Red error/invalid tag
        error: 'bg-status-error/20 text-status-error',
        
        // Outline: Bordered tag
        outline: 'bg-transparent border border-carbon-gray-50 text-carbon-gray-30',
        
        // Cyan accent (brand color)
        cyan: 'bg-accent-cyan-50/20 text-accent-cyan-30',
        
        // Purple accent
        purple: 'bg-accent-purple-50/20 text-accent-purple-30',
      },
      size: {
        sm: 'px-carbon-02 py-0.5 text-carbon-xs',
        md: 'px-carbon-03 py-carbon-01 text-carbon-xs',
        lg: 'px-carbon-04 py-carbon-02 text-carbon-sm',
      },
      interactive: {
        true: 'cursor-pointer hover:opacity-80 active:opacity-70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Whether the badge can be dismissed */
  dismissible?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, interactive, icon, dismissible, onDismiss, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, interactive }), className)}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-carbon-01 flex-shrink-0 rounded-full p-0.5 hover:bg-carbon-gray-60/50 transition-colors"
            aria-label="Remove"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Carbon Tag Component
 * Interactive tags for filtering and selection
 */
const tagVariants = cva(
  [
    'inline-flex items-center gap-carbon-02',
    'rounded-carbon',
    'font-sans font-normal text-carbon-xs',
    'px-carbon-03 py-carbon-01',
    'border',
    'transition-all duration-carbon-fast ease-carbon',
    'cursor-pointer',
  ].join(' '),
  {
    variants: {
      selected: {
        true: 'bg-carbon-blue-60 border-carbon-blue-60 text-white',
        false: 'bg-carbon-gray-90 border-carbon-gray-50 text-carbon-gray-30 hover:border-carbon-gray-30',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export interface TagProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tagVariants> {
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Whether the tag is selected */
  selected?: boolean;
  /** Callback when tag selection changes */
  onSelectionChange?: (selected: boolean) => void;
}

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ className, selected, icon, onSelectionChange, children, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onSelectionChange?.(!selected);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(tagVariants({ selected }), className)}
        onClick={handleClick}
        aria-pressed={selected}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Tag.displayName = 'Tag';

/**
 * Carbon Status Badge Component
 * For displaying status indicators with dot
 */
const statusVariants = cva(
  [
    'inline-flex items-center gap-carbon-02',
    'text-carbon-xs font-sans',
  ].join(' '),
  {
    variants: {
      status: {
        active: 'text-status-success',
        inactive: 'text-carbon-gray-50',
        pending: 'text-status-warning',
        error: 'text-status-error',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  }
);

export interface StatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {
  /** Label text */
  label?: string;
}

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, label, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusVariants({ status }), className)}
        {...props}
      >
        <span 
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            status === 'active' && 'bg-status-success',
            status === 'inactive' && 'bg-carbon-gray-50',
            status === 'pending' && 'bg-status-warning',
            status === 'error' && 'bg-status-error'
          )}
        />
        <span>{label || children}</span>
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

export { Badge, Tag, StatusBadge, badgeVariants, tagVariants, statusVariants };
