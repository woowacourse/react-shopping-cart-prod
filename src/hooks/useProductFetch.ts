import { serverState } from '../service/atom';
import { ProductType } from '../types/types';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { base64 } from '../service/apiURL';

const useProduct = () => {
  const serverURL = useRecoilValue(serverState);

  const { data: productData, isFetching } = useQuery<ProductType[]>('products', async () => {
    const res = await fetch(`${serverURL}/products`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const resData = await res.json();
    return resData;
  });

  return {
    productData,
    isFetching,
  };
};

export default useProduct;
