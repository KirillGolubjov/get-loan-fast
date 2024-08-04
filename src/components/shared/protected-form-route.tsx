import React from 'react';
import { useFormStore } from '@/store/formStore';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const ProtectedFormRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { formData } = useFormStore();
  React.useEffect(() => {
    if (!formData.firstName) {
      navigate('/');
    }
  }, [formData, navigate]);

  return children;
};
