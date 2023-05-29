import { endPoints } from '../../constants/endPoints.ts';
import useFetch from '../useFetch.ts';

const usePostUpdateCartItem = () => {
  const [updateCartItemState, updateCartItem] = useFetch<null>({ url: endPoints.cart, method: 'PATCH' });

  return { updateCartItemState, updateCartItem };
};

export default usePostUpdateCartItem;
