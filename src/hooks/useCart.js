import { useDispatch, useSelector } from 'react-redux';

import useUser from './useUser';

import {
  actionTypes,
  addCartItemAsync,
  deleteCartItemAsync,
  getCartItemListAsync,
  updateItemQuantityAsync,
} from '../store/cart/cart.actions';
import { useEffect } from 'react';

const useCart = () => {
  const dispatch = useDispatch();
  const { accessToken } = useUser();
  const cartList = useSelector(({ cart }) => cart.data);

  const getItemList = () => {
    if (!accessToken) {
      dispatch({
        type: actionTypes.ADD_CART_SUCCESS,
        payload: [],
      });
      return;
    }
    dispatch(getCartItemListAsync(accessToken));
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

  useEffect(() => {
    getItemList();
  }, [accessToken]);

  return { cartList, getItemList, addItem, deleteItem, updateItemQuantity };
};

export default useCart;
