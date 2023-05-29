import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productListState } from '@recoil/product/productListState';
import serverState from '@recoil/server/serverState';
import { getProductPath } from '@constants/serverUrlConstants';
import { ProductItemType } from '@type/productType';
import { useFetch } from './useFetch';
import { ServerProductItemType } from '@type/productType';

const useRecoilProductList = (): {
  productList: ProductItemType[];
  isLoading: boolean;
  error: unknown | null;
} => {
  const serverName = useRecoilValue(serverState);
  const {
    data: originData,
    isLoading,
    error,
  } = useFetch<ServerProductItemType[]>(getProductPath(serverName));
  const [productList, setProductList] = useRecoilState<ProductItemType[]>(productListState);

  useEffect(() => {
    if (!originData) return;
    const clientProductList: ProductItemType[] = originData.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      };
    });

    setProductList(clientProductList);
  }, [originData, setProductList]);

  return { productList, isLoading, error };
};

export default useRecoilProductList;
