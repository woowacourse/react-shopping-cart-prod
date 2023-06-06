import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../recoil/atoms';
import { ProductInfo } from '../types';
import { PRODUCTS_BASE_URL } from '../constants';
import APIHandler from '../api/APIHandler';

export const useProduct = () => {
  const { showBoundary } = useErrorBoundary();
  const host = useRecoilValue(selectedHostState);
  const PRODUCTS_URL = `${host}${PRODUCTS_BASE_URL}`;
  const [productList, setProductList] = useState<ProductInfo[]>([]);

  useEffect(() => {
    const setFetchedProductList = async () => {
      const newProductList = await getProductList();
      if (newProductList) setProductList(newProductList);
    };

    setFetchedProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const getProductList = async () => {
    try {
      const responseResult = await APIHandler.get<ProductInfo[]>(PRODUCTS_URL);

      if (responseResult.statusCode !== 200) throw new Error(responseResult.errorMessage);

      return responseResult.result;
    } catch (error) {
      showBoundary(error);
    }
  };

  return { productList };
};
