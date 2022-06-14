import { useDispatch, useSelector } from 'react-redux';

import {
  addCartItemAsync,
  deleteCartItemAsync,
  getCartItemListAsync,
  updateItemQuantityAsync,
} from '../store/cart/cart.actions';

const useCart = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(({ user }) => user.accessToken);

  const getItemList = () => {
    if (accessToken) {
      dispatch(getCartItemListAsync(accessToken));
    }
  };

  const addItem = (id) => {
    dispatch(addCartItemAsync(id, accessToken));
  };

  const deleteItem = (id) => {
    dispatch(deleteCartItemAsync(id, accessToken));
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch(updateItemQuantityAsync(id, quantity, accessToken));
  };

  return { getItemList, addItem, deleteItem, updateItemQuantity };
};

export default useCart;
