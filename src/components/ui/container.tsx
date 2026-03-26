import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Carbon Design System Container Component
 * 
 * Carbon Grid System:
 * - Max width: 1312px (carbon-xl)
 * - Padding: 16px mobile, 32px desktop
 * - Centered with mx-auto
 * 
 * Container Sizes (based on Carbon breakpoints):
 * - sm: 672px (carbon-sm)
 * - md: 864px (carbon-md)
 * - lg: 1056px (carbon-lg)
 * - xl: 1312px (carbon-xl) - default
 * - full: 1584px (carbon-max)
 * - fluid: 100%
 */
const containerVariants = cva(
  [
    'mx-auto w-full',
    'transition-all duration-carbon-fast ease-carbon',
  ].join(' '),
  {
    variants: {
      size: {
        // Small: 672px - for narrow content
        sm: 'max-w-carbon-sm',
        
        // Medium: 864px - for medium content
        md: 'max-w-carbon-md',
        
        // Large: 1056px - for wide content
        lg: 'max-w-carbon-lg',
        
        // Extra Large: 1312px - default Carbon grid
        xl: 'max-w-carbon-xl',
        
        // Max: 1584px - for full-width layouts
        full: 'max-w-carbon-max',
        
        // Fluid: 100% - no max width
        fluid: 'max-w-full',
      },
      padding: {
        // None: No padding
        none: '',
        
        // Mobile: 16px padding
        mobile: 'px-carbon-04',
        
        // Desktop: 32px padding
        desktop: 'px-carbon-06',
        
        // Responsive: 16px mobile, 32px desktop
        responsive: 'px-carbon-04 md:px-carbon-06',
      },
    },
    defaultVariants: {
      size: 'xl',
      padding: 'responsive',
    },
  }
);

export interface ContainerProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

/**
 * Carbon Grid Component
 * For creating grid layouts with Carbon spacing
 */
const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
        6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
        12: 'grid-cols-12',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-carbon-01',
        sm: 'gap-carbon-02',
        md: 'gap-carbon-03',
        lg: 'gap-carbon-04',
        xl: 'gap-carbon-06',
        '2xl': 'gap-carbon-08',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 'md',
    },
  }
);

export interface GridProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

/**
 * Carbon Grid Column Component
 * For controlling column spans within a grid
 */
const columnVariants = cva(
  '',
  {
    variants: {
      span: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
        full: 'col-span-full',
      },
      start: {
        1: 'col-start-1',
        2: 'col-start-2',
        3: 'col-start-3',
        4: 'col-start-4',
        5: 'col-start-5',
        6: 'col-start-6',
        7: 'col-start-7',
        8: 'col-start-8',
        9: 'col-start-9',
        10: 'col-start-10',
        11: 'col-start-11',
        12: 'col-start-12',
        13: 'col-start-13',
      },
    },
    defaultVariants: {
      span: 1,
    },
  }
);

export interface ColumnProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof columnVariants> {}

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, span, start, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(columnVariants({ span, start }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Column.displayName = 'Column';

/**
 * Carbon Stack Component
 * For vertical layouts with consistent spacing
 */
const stackVariants = cva(
  'flex flex-col',
  {
    variants: {
      gap: {
        none: 'gap-0',
        xs: 'gap-carbon-01',
        sm: 'gap-carbon-02',
        md: 'gap-carbon-03',
        lg: 'gap-carbon-04',
        xl: 'gap-carbon-06',
        '2xl': 'gap-carbon-08',
        '3xl': 'gap-carbon-10',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      },
    },
    defaultVariants: {
      gap: 'md',
      align: 'stretch',
      justify: 'start',
    },
  }
);

export interface StackProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap, align, justify, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stackVariants({ gap, align, justify }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

/**
 * Carbon Inline Component
 * For horizontal layouts with consistent spacing
 */
const inlineVariants = cva(
  'flex flex-row flex-wrap',
  {
    variants: {
      gap: {
        none: 'gap-0',
        xs: 'gap-carbon-01',
        sm: 'gap-carbon-02',
        md: 'gap-carbon-03',
        lg: 'gap-carbon-04',
        xl: 'gap-carbon-06',
        '2xl': 'gap-carbon-08',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      },
    },
    defaultVariants: {
      gap: 'sm',
      align: 'center',
      justify: 'start',
    },
  }
);

export interface InlineProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineVariants> {}

const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({ className, gap, align, justify, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inlineVariants({ gap, align, justify }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Inline.displayName = 'Inline';

/**
 * Section Component
 * For page sections with consistent vertical spacing
 */
const sectionVariants = cva(
  'w-full',
  {
    variants: {
      spacing: {
        none: 'py-0',
        sm: 'py-carbon-04',
        md: 'py-carbon-06',
        lg: 'py-carbon-08',
        xl: 'py-carbon-10',
        '2xl': 'py-carbon-12',
      },
    },
    defaultVariants: {
      spacing: 'lg',
    },
  }
);

export interface SectionProps 
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing }), className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { 
  Container, 
  Grid, 
  Column, 
  Stack, 
  Inline, 
  Section,
  containerVariants, 
  gridVariants, 
  columnVariants, 
  stackVariants, 
  inlineVariants, 
  sectionVariants 
};
