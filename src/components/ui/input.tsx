import { InputHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

/**
 * Carbon Design System Input Component
 * 
 * Features:
 * - Default: Carbon gray-100 background with gray-50 border
 * - Focus: Blue-50 border with ring effect
 * - Error: Red border with error message below
 * - Label: Carbon gray-30 text, small size
 * 
 * States:
 * - Default: Gray border, subtle appearance
 * - Focus: Blue border with focus ring
 * - Error: Red border with error message
 * - Disabled: Reduced opacity, not-allowed cursor
 */
const inputVariants = cva(
  // Base styles - Carbon input design
  [
    'w-full h-10 px-carbon-03 rounded-carbon',
    'bg-carbon-gray-100 border',
    'text-carbon-gray-10 text-carbon-sm',
    'placeholder:text-carbon-gray-50',
    'transition-all duration-carbon-fast ease-carbon',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-carbon-gray-90',
  ].join(' '),
  {
    variants: {
      variant: {
        // Default: Standard input with gray border
        default: [
          'border-carbon-gray-50',
          'focus:border-carbon-blue-50 focus:ring-1 focus:ring-carbon-blue-50',
        ].join(' '),
        
        // Error: Red border for validation errors
        error: [
          'border-status-error',
          'focus:ring-1 focus:ring-status-error/30',
        ].join(' '),
        
        // Success: Green border for valid input
        success: [
          'border-status-success',
          'focus:ring-1 focus:ring-status-success/30',
        ].join(' '),
      },
      inputSize: {
        sm: 'h-8 text-carbon-xs px-carbon-02',
        md: 'h-10 text-carbon-sm px-carbon-03',
        lg: 'h-12 text-carbon-base px-carbon-04',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps 
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftElement, rightElement, inputSize, type = 'text', ...props }, ref) => {
    const inputId = props.id || props.name;
    
    return (
      <div className="w-full">
        {/* Label - Carbon label-01 style (12px) */}
        {label && (
          <label 
            htmlFor={inputId}
            className="mb-carbon-02 block text-carbon-xs font-medium text-carbon-gray-30 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* Left icon/element */}
          {leftElement && (
            <div className="absolute left-carbon-03 top-1/2 -translate-y-1/2 text-carbon-gray-50">
              {leftElement}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            aria-label={props['aria-label'] || label}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            aria-invalid={error ? 'true' : 'false'}
            className={cn(
              inputVariants({ 
                variant: error ? 'error' : 'default',
                inputSize,
              }),
              leftElement && 'pl-carbon-07',
              rightElement && 'pr-carbon-07',
              className
            )}
            ref={ref}
            {...props}
          />
          {/* Right icon/element */}
          {rightElement && (
            <div className="absolute right-carbon-03 top-1/2 -translate-y-1/2 text-carbon-gray-50">
              {rightElement}
            </div>
          )}
        </div>
        {/* Error message */}
        {error && (
          <p 
            id={`${inputId}-error`}
            className="mt-carbon-02 text-carbon-xs text-status-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {/* Helper text */}
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className="mt-carbon-02 text-carbon-xs text-carbon-gray-50"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// SearchInput variant with search icon
export interface SearchInputProps extends Omit<InputProps, 'leftElement' | 'type'> {
  onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        leftElement={<Search className="h-4 w-4" />}
        className={cn('', className)}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

// Textarea component
export interface TextareaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    const textareaId = props.id || props.name;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId}
            className="mb-carbon-02 block text-carbon-xs font-medium text-carbon-gray-30 tracking-wide"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          aria-label={props['aria-label'] || label}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={cn(
            'w-full min-h-[80px] px-carbon-03 py-carbon-02 rounded-carbon',
            'bg-carbon-gray-100 border text-carbon-gray-10 text-carbon-sm',
            'placeholder:text-carbon-gray-50',
            'transition-all duration-carbon-fast ease-carbon',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-carbon-gray-90',
            error 
              ? 'border-status-error focus:ring-1 focus:ring-status-error/30' 
              : 'border-carbon-gray-50 focus:border-carbon-blue-50 focus:ring-1 focus:ring-carbon-blue-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p 
            id={`${textareaId}-error`}
            className="mt-carbon-02 text-carbon-xs text-status-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p 
            id={`${textareaId}-helper`}
            className="mt-carbon-02 text-carbon-xs text-carbon-gray-50"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, SearchInput, Textarea, inputVariants };
