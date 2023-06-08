import { END_POINTS } from '../../constants/END_POINTS.ts';
import useFetch from '../useFetch.ts';

const useCreateCartItem = () => {
  const [createCartItemState, createCartItem] = useFetch<null>({ url: END_POINTS.CART, method: 'POST' });

  return { createCartItemState, createCartItem };
};

export default useCreateCartItem;
