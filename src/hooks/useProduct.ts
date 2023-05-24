import { useEffect } from 'react';
import { serverState } from '../service/atom';
import { Product } from '../types/types';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

const useProduct = () => {
  const serverURL = useRecoilValue(serverState);

  const { data, isLoading, refetch } = useQuery<Product[]>('products', async () => {
    const res = await fetch(`${serverURL}/products`, { method: 'GET' });
    const resData = await res.json();
    return resData;
  });

  useEffect(() => {
    refetch();
  }, [serverURL]);

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useProduct;
