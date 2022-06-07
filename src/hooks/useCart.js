import { useDispatch } from 'react-redux';
import { STORAGE_KEY } from '../constants';
import {
  addCartItemAsync,
  deleteCartItemAsync,
  updateItemQuantityAsync,
} from '../store/cart/cart.actions';

const useCart = () => {
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

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
