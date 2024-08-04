import React, { useEffect } from 'react';
import { FormContainer } from './form/form-container';

import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { FormDataProps, useFormStore } from '@/store/formStore';
import { useForm } from 'react-hook-form';
import { useApplicationApi } from '@/hooks/api/useApplicationApi';
import { Title } from './title';
import { FormSlider } from './form/form-slider';
import Modal, { useModal } from './modal';

interface Props {
  className?: string;
}

export const LoanForm: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { onCreateNew } = useApplicationApi();
  const { openName, open } = useModal();
  const { formData, setFormData, resetFormData } = useFormStore();
  const { handleSubmit, watch, setValue, reset } = useForm<FormDataProps>({
    defaultValues: {
      loanAmount: formData.loanAmount,
      loanTerm: formData.loanTerm,
    },
  });

  const watchLoanAmount = watch('loanAmount');
  const watchLoanTerm = watch('loanTerm');

  useEffect(() => {
    setFormData({ loanAmount: watchLoanAmount, loanTerm: watchLoanTerm });
  }, [watchLoanAmount, watchLoanTerm, setFormData]);

  const onSubmit = async () => {
    const success = await onCreateNew(formData);
    if (success) open('application');
  };

  const resetForm = () => {
    reset();
    resetFormData();
    navigate('/');
  };

  return (
    <>
      <FormContainer className={className} formTitle='Параметры займа'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormSlider
              label='Сумма займа ($200 - $1000)'
              min={200}
              max={1000}
              step={100}
              value={watchLoanAmount}
              onValueChange={(value) => setValue('loanAmount', value)}
              unit='$'
            />
            <FormSlider
              label='Срок займа (10 - 30 дней)'
              min={10}
              max={30}
              step={1}
              value={watchLoanTerm}
              onValueChange={(value) => setValue('loanTerm', value)}
              unit=''
            />
          </div>

          <div className='flex gap-3 justify-end'>
            <Button
              variant='secondary'
              className='mt-6 w-1/3 border'
              onClick={() => navigate('/address')}
            >
              Назад
            </Button>

            <Button type='submit' className='mt-6 w-1/2'>
              Подать заявку
            </Button>
          </div>
        </form>

        {openName === 'application' && (
          <Modal.Window name='application' onCloseCallback={resetForm}>
            <div className='h-[300px] w-[300px] flex items-center justify-center text-gray-50'>
              <Title
                text={`Поздравляем, ${formData.firstName} ${formData.lastName}! Вам одобрено $${formData.loanAmount} на ${formData.loanTerm} дней.`}
                size='md'
              />
            </div>
          </Modal.Window>
        )}
      </FormContainer>
    </>
  );
};
