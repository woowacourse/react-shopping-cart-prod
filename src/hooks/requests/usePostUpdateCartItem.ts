import { endPoints } from '../../constants/endPoints.ts';
import useFetch from '../useFetch.ts';

const usePostUpdateCartItem = () => {
  const [updateCartItemState, updateCartItem] = useFetch<null>(endPoints.cart, 'PATCH');

  return { updateCartItemState, updateCartItem };
};

export default usePostUpdateCartItem;
