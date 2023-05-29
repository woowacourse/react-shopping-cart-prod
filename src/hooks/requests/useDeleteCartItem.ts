import useFetch from '../useFetch.ts';
import { endPoints } from '../../constants/endPoints.ts';

const useDeleteCartItem = () => {
  const [deleteCartItemState, deleteCartItem] = useFetch<null>({ url: endPoints.cart, method: 'DELETE' });

  return { deleteCartItemState, deleteCartItem };
};

export default useDeleteCartItem;
