import useFetch from '../useFetch.ts';
import { ProductList } from '../../types/CartList.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useGetProductList = () => {
  const [{ data, status }, refetchProductList] = useFetch<ProductList>({ url: endPoints.productList });

  return { data, status, refetchProductList };
};

export default useGetProductList;
