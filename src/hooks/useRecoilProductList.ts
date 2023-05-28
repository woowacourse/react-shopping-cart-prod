import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { productListState } from '@recoil/product/productListState';
import { SERVER_NAME, getProductPath } from '@constants/urlConstants';
import { ProductItemType } from '@type/ProductType';
import { useFetch } from './useFetch';

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
  const [productList, setProductList] = useRecoilState<ProductItemType[]>(productListState);

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
  }, [originData, setProductList]);

  return { productList, isLoading, error };
};

export default useRecoilProductList;
