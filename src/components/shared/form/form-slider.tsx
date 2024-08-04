import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onValueChange: (value: number) => void;
  unit: string;
}

export const FormSlider: React.FC<Props> = ({
  className,
  label,
  min,
  max,
  step,
  value,
  onValueChange,
  unit,
}) => {
  return (
    <div className={cn('mb-10 border-b-[1px]', className)}>
      <label>{label}</label>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(value) => onValueChange(value[0])}
        className='py-4'
      />
      <div className='flex justify-between'>
        <span>
          {unit} {value}
        </span>
        <span className='ml-2 text-gray-500'>
          {unit} {max}
        </span>
      </div>
    </div>
  );
};