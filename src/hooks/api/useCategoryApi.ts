import { apiService } from '@/api/api-service';
import { EX_SYSTEM } from '@/common/error-messages';
import React from 'react';
import toast from 'react-hot-toast';
export type Category = string;
export interface CategoryApiHookType {
  categories: Category[];
  findAllCategories: () => Promise<void>;
}

export const useCategoryApi = (): CategoryApiHookType => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const findAllCategories = async () => {
    try {
      const res = await apiService.getCategories();
      const allCategories = res.data;

      if (allCategories) {
        setCategories(allCategories);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || EX_SYSTEM);
    }
  };

  return {
    categories,
    findAllCategories,
  };
};
