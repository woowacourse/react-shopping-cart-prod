import useFetch from '../useFetch.ts';
import { END_POINTS } from '../../constants/END_POINTS.ts';

const useDeleteCartItem = () => {
  const [deleteCartItemState, deleteCartItem] = useFetch<null>({ url: END_POINTS.CART, method: 'DELETE' });

  return { deleteCartItemState, deleteCartItem };
};

export default useDeleteCartItem;
