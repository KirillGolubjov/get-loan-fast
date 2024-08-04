import { apiService } from '@/api/api-service';
import { EX_SYSTEM } from '@/common/error-messages';
import { FormDataProps } from '@/store/formStore';
import toast from 'react-hot-toast';

export interface ApplicationApiHookType {
  onCreateNew: (newApplication: FormDataProps) => Promise<boolean>;
}

export const useApplicationApi = (): ApplicationApiHookType => {
  const onCreateNew = async (
    newApplication: FormDataProps
  ): Promise<boolean> => {
    try {
      const res = await apiService.createApplication(newApplication);
      console.log('Application is successfully created', res.data);
      return true;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || EX_SYSTEM);
      return false;
    }
  };

  return {
    onCreateNew,
  };
};
