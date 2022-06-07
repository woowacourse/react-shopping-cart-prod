import { useDispatch, useSelector } from 'react-redux';
import {
  addCartItemAsync,
  deleteCartItemAsync,
  updateItemQuantityAsync,
} from '../store/cart/cart.actions';

const useCart = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(({ user }) => user.accessToken);

  const addItem = (id) => {
    dispatch(addCartItemAsync(id, accessToken));
  };

  const deleteItem = (id) => {
    dispatch(deleteCartItemAsync(id));
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch(updateItemQuantityAsync(id, quantity));
  };

  return { addItem, deleteItem, updateItemQuantity };
};

export default useCart;
