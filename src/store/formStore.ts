import { create } from 'zustand';

export interface FormDataProps {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  job: string;
  loanAmount: number;
  loanTerm: number;
}

interface FormStoreState {
  formData: FormDataProps;
  setFormData: (newData: Partial<FormDataProps>) => void;
  resetFormData: () => void;
}

const initialFormData: FormDataProps = {
  phone: '',
  firstName: '',
  lastName: '',
  gender: '',
  address: '',
  job: '',
  loanAmount: 200,
  loanTerm: 10,
};

export const useFormStore = create<FormStoreState>((set) => ({
  formData: initialFormData,
  setFormData: (newData) => {
    set((state) => {
      const updatedData = { ...state.formData, ...newData };
      return { formData: updatedData };
    });
  },
  resetFormData: () => {
    set(()=> ({
      formData: initialFormData,
    }));
  }
}));