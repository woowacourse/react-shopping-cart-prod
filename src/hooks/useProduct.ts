import { useEffect } from 'react';
import { serverState } from '../service/atom';
import { ProductType } from '../types/types';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

const useProduct = () => {
  const serverURL = useRecoilValue(serverState);

  const {
    data: productData,
    isLoading,
    refetch,
  } = useQuery<ProductType[]>('products', async () => {
    const res = await fetch(`${serverURL}/products`, { method: 'GET' });
    const resData = await res.json();
    return resData;
  });

  useEffect(() => {
    refetch();
  }, [serverURL]);

  return {
    productData,
    isLoading,
    refetch,
  };
};

export default useProduct;
