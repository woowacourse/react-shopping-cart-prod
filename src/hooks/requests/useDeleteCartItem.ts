import useFetch from '../useFetch.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useDeleteCartItem = () => {
  const [deleteCartItemState, deleteCartItem] = useFetch<null>(endPoints.cart, 'DELETE');

  return { deleteCartItemState, deleteCartItem };
};

export default useDeleteCartItem;
