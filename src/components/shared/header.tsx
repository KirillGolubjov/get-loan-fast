import { cn } from '@/lib/utils';
import React from 'react';
import { HandCoins } from 'lucide-react';
import { Title } from './title';


interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b-2 p-4', className)}>
      <div className='flex items-center gap-2'>
        <Title text='Get Loan Fast' size='md' className='font-semibold' />
        <HandCoins />
      </div>
    </header>
  );
};