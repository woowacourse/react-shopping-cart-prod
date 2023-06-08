import useFetch from '../useFetch.ts';
import { ProductList } from '../../types/CartList.ts';
import { END_POINTS } from '../../constants/END_POINTS.ts';

const useGetProductList = () => {
  const [{ data, status }, refetchProductList] = useFetch<ProductList>({ url: END_POINTS.PRODUCT_LIST });

  return { data, status, refetchProductList };
};

export default useGetProductList;
