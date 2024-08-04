import { Input } from '@/components/ui/input';
import { InputMask } from '@react-input/mask';
import React from 'react';

const CustomInput = React.forwardRef<HTMLInputElement>(
  ({ ...props }, forwardedRef) => {
    return (
      <Input
        {...props}
        ref={forwardedRef}
      />
    );
  }
);

interface Props {
  props: React.InputHTMLAttributes<HTMLInputElement>;
  mask: string;
  replacement: { [key: string]: RegExp };
  id: string;
  placeholder: string;
}

export const FormMaskInput: React.FC<Props> = ({ props, mask, replacement, id, placeholder }) => {
  return (
    <InputMask
      component={CustomInput}
      mask={mask}
      replacement={replacement}
      id={id}
      placeholder={placeholder}
      {...props}
    />
  );
};
