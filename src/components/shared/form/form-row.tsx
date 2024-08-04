import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactElement;
}

export const FormRow: React.FC<Props> = ({
  className,
  label,
  error,
  helperText,
  children,
}) => {
  return (
    <div className={cn('flex flex-col gap-1 mb-6 relative', className)}>
      {label && (
        <label
          className='text-sm'
          htmlFor={children?.props.id}
        >
          {label}
        </label>
      )}
      {children}
      {helperText && (
        <span>{helperText}</span>
      )}
      {error && <span className='text-red-500 text-xs ml-1 absolute top-16'>{error}</span>}
    </div>
  );
};
