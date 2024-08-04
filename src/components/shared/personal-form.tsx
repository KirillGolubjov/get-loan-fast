import React from 'react';

import { FormRow } from './form/form-row';
import { Input } from '../ui/input';
import { Controller, useForm } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { FormContainer } from './form/form-container';
import { useNavigate } from 'react-router-dom';
import { FormDataProps, useFormStore } from '@/store/formStore';
import { FormMaskInput } from './form/form-mask-input';

interface Props {
  className?: string;
}

export const PersonalForm: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
    },
  });

  const onSubmit = (data: FormDataProps) => {
    setFormData(data);
    navigate('/address');
  };

  return (
    <FormContainer className={className} formTitle='Личная информация'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormRow
            label='Телефон'
            error={errors.phone && errors.phone?.message}
          >
            <Controller
              name='phone'
              control={control}
              rules={{
                required: 'Телефон обязателен',
              }}
              render={({ field }) => (
                <FormMaskInput
                  props={field}
                  id='phone'
                  mask='0 XXX XXX XXX'
                  replacement={{ X: /\d/ }}
                  placeholder='Введите ваш телефон'
                />
              )}
            />
          </FormRow>
          <FormRow
            label='Имя'
            error={errors.firstName && errors.firstName?.message}
          >
            <Input
              type='text'
              placeholder='Введите ваше имя'
              {...register('firstName', {
                required: 'Имя обязательно',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать не менее 2 букв',
                },
                maxLength: {
                  value: 30,
                  message: 'Имя должно содержать не более 30 букв',
                },
              })}
            />
          </FormRow>
          <FormRow
            label='Фамилия'
            error={errors.lastName && errors.lastName?.message}
          >
            <Input
              type='text'
              placeholder='Введите вашу фамилию'
              {...register('lastName', {
                required: 'Фамилия обязательна',
                minLength: {
                  value: 2,
                  message: 'Фамилия должно содержать не менее 2 букв',
                },
                maxLength: {
                  value: 30,
                  message: 'Фамилия должно содержать не более 30 букв',
                },
              })}
            />
          </FormRow>
          <FormRow label='Пол' error={errors.gender && errors.gender?.message}>
            <Controller
              name='gender'
              control={control}
              defaultValue=''
              rules={{ required: 'Выберите пол' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите пол' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='male'>Мужской</SelectItem>
                    <SelectItem value='female'>Женский</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormRow>
        </div>

        <div className='flex justify-end'>
          <Button className='w-1/2'>Далее</Button>
        </div>
      </form>
    </FormContainer>
  );
};
