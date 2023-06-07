import useFetch from '../useFetch.ts';
import { CartList } from '../../types/CartList.ts';
import { END_POINTS } from '../../constants/END_POINTS.ts';

const useGetCartList = () => {
  const [{ status, data }, refetchCartList] = useFetch<CartList>({ url: END_POINTS.CART });

  return { status, data, refetchCartList };
};

export default useGetCartList;
