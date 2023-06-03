import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../recoil/atoms';
import { ProductInfo } from '../types';
import { PRODUCTS_BASE_URL } from '../constants';
import APIHandler from '../api/APIHandler';

export const useProduct = () => {
  const host = useRecoilValue(selectedHostState);
  const PRODUCTS_URL = `${host}${PRODUCTS_BASE_URL}`;
  const [productList, setProductList] = useState<ProductInfo[]>([]);

  useEffect(() => {
    const setFetchedProductList = async () => {
      setProductList(await getProductList());
    };

    setFetchedProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const getProductList = async () => {
    const responseResult = await APIHandler.get<ProductInfo[]>(PRODUCTS_URL);

    if (responseResult.statusCode !== 200) console.error(responseResult.errorMessage);
    if (responseResult.result === undefined) return [];

    return responseResult.result;
  };

  return { productList };
};
