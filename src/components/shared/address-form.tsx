import React, { useEffect } from 'react';
import { FormContainer } from './form/form-container';
import { FormRow } from './form/form-row';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '../ui/select';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { FormDataProps, useFormStore } from '@/store/formStore';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { useCategoryApi } from '@/hooks/api/useCategoryApi';

interface Props {
  className?: string;
}

export const AddressForm: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormStore();
  const { findAllCategories, categories } = useCategoryApi();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      job: formData.job,
      address: formData.address,
    },
  });

  useEffect(() => {
    findAllCategories();
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data: FormDataProps) => {
    setFormData(data);
    navigate('/loan');
  };

  return (
    <FormContainer className={className} formTitle='Адрес и место работы'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormRow
            label='Место работы'
            error={errors.job && errors.job?.message}
          >
            <Controller
              name='job'
              control={control}
              defaultValue=''
              rules={{ required: 'Место работы нужно указать обязательно' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите место работы' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormRow>

          <FormRow
            label='Адрес проживания'
            error={errors.address && errors.address?.message}
          >
            <Input
              placeholder='Введите ваш адрес проживания'
              type='text'
              {...register('address', {
                required: 'Ваш адрес проживания нужно указать обязательно',
                minLength: {
                  value: 2,
                  message: 'Адрес должен содержать не менее 2 букв',
                },
                maxLength: {
                  value: 30,
                  message: 'Адрес должен содержать не более 30 букв',
                },
              })}
            />
          </FormRow>
        </div>

        <div className='flex gap-3 justify-end'>
          <Button
            variant='secondary'
            className='w-1/3 border'
            onClick={() => navigate('/')}
          >
            Назад
          </Button>

          <Button className='w-1/2'>Далее</Button>
        </div>
      </form>
    </FormContainer>
  );
};
