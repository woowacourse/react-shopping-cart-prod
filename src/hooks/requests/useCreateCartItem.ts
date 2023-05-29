import { endPoints } from '../../constants/endPoints.ts';
import useFetch from '../useFetch.ts';

const useCreateCartItem = () => {
  const [createCartItemState, createCartItem] = useFetch<null>({ url: endPoints.cart, method: 'POST' });

  return { createCartItemState, createCartItem };
};

export default useCreateCartItem;
