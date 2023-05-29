import useFetch from '../useFetch.ts';
import { ProductList } from '../../types/CartList.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useGetOrderDetail = (orderID: string) => {
  const [{ data, status }, refetchProductList] = useFetch<ProductList>({ url: `${endPoints.order}/${orderID}`, isNotAutomaticallyFetched: true });

  return { data, status, refetchProductList };
};

export default useGetOrderDetail;
