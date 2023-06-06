import * as api from '../../api';
import { useState } from 'react';
import { ProductType, ServerNameType } from '../../types';
import useToast from './useToast';
import { API_ERROR_MESSAGE } from '../../constants';

export const useGetProductList = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const { showToast } = useToast();

  const getProductsThroughApi = (serverName: ServerNameType) => {
    api
      .getProducts<ProductType[]>(serverName)
      .then(setProducts)
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', `${API_ERROR_MESSAGE.server}`);
          return;
        }

        showToast('error', e.message);
      });
  };

  return { products, getProductsThroughApi };
};
