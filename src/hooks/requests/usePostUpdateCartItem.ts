import { END_POINTS } from '../../constants/END_POINTS.ts';
import useFetch from '../useFetch.ts';

const usePostUpdateCartItem = () => {
  const [updateCartItemState, updateCartItem] = useFetch<null>({ url: END_POINTS.CART, method: 'PATCH' });

  return { updateCartItemState, updateCartItem };
};

export default usePostUpdateCartItem;
