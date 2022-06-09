import { useDispatch } from 'react-redux';

import {
  addCartItemAsync,
  deleteCartItemAsync,
  updateItemQuantityAsync,
} from '../store/cart/cart.actions';

const useCart = () => {
  const dispatch = useDispatch();

  const addItem = (id, accessToken) => {
    dispatch(addCartItemAsync(id, accessToken));
  };

  const deleteItem = (id, accessToken) => {
    dispatch(deleteCartItemAsync(id, accessToken));
  };

  const updateItemQuantity = (id, quantity, accessToken) => {
    dispatch(updateItemQuantityAsync(id, quantity, accessToken));
  };

  return { addItem, deleteItem, updateItemQuantity };
};

export default useCart;
