import { endPoints } from '../../constants/endPoints.ts';
import useFetch from '../useFetch.ts';

const useCreateCartItem = () => {
  const [createCartItemState, createCartItem] = useFetch<null>(endPoints.cart, 'POST');

  return { createCartItemState, createCartItem };
};

export default useCreateCartItem;
