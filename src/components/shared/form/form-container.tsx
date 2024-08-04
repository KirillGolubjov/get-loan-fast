import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from '../title';

interface Props {
  className?: string;
  children: React.ReactNode;
  formTitle: string;
}

export const FormContainer: React.FC<Props> = ({ className, children, formTitle }) => {
  return (
    <div className={cn('border-[2px] shadow-md p-6 rounded-md', className)}>
      <Title text={formTitle} size='sm' className='mb-6'/>
      {children}
    </div>
  );
};
