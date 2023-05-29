import useFetch from '../useFetch.ts';
import { CartList } from '../../types/CartList.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useGetCartList = () => {
  const [{ status, data }, refetchCartList] = useFetch<CartList>({ url: endPoints.cart });

  return { status, data, refetchCartList };
};

export default useGetCartList;
