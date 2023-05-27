import { useEffect, useState } from 'react';
import { useFetch } from './useFetch';
import { ProductItemType } from '@type/ProductType';
import { SERVER_NAME, getProductPath } from '@constants/urlConstants';
import { useRecoilState } from 'recoil';
import { productListState } from '@recoil/product/productListState';

const useRecoilProductList = (): {
  productList: ProductItemType[];
  isLoading: boolean;
  error: unknown | null;
} => {
  const {
    data: originData,
    isLoading,
    error,
  } = useFetch<ProductItemType[]>(getProductPath(SERVER_NAME[0]));
  const [productList, setProductList] =
    useRecoilState<ProductItemType[]>(productListState);

  useEffect(() => {
    if (!originData) return;
    const clientProductList = originData.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      };
    });

    setProductList(clientProductList);
  }, [originData]);

  return { productList, isLoading, error };
};

export default useRecoilProductList;
