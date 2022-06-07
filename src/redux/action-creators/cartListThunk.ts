import { LOCAL_BASE_URL } from 'apis';
import { cartListAction, CartListAction } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';
import type { Dispatch } from 'redux';
import axios from 'axios';

export const getCartList = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.getCartList.pending());

  try {
    const response = await axios.get<CartItem[]>(`${LOCAL_BASE_URL}/cartList`);

    dispatch(cartListAction.getCartList.success(response.data));
  } catch (error) {
    dispatch(cartListAction.getCartList.failure(error.response.data.errorMessage));
  }
};

export const putCartItem = (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.putCartItem.pending());
  try {
    const response = await axios.put(`${LOCAL_BASE_URL}/cartList/${cartItem.id}`, cartItem);

    dispatch(cartListAction.putCartItem.success(response.data));
  } catch (error) {
    dispatch(cartListAction.putCartItem.failure(error.response.data.errorMessage));
  }
};

export const postCartItem = (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.postCartItem.pending());
  try {
    const response = await axios.post(`${LOCAL_BASE_URL}/cartList`, cartItem);

    dispatch(cartListAction.postCartItem.success(response.data));
  } catch (error) {
    dispatch(cartListAction.postCartItem.failure(error.response.data.errorMessage));
  }
};

export const deleteCartItem =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListAction.deleteCartItem.pending());

    try {
      const response = await axios.delete(`${LOCAL_BASE_URL}/cartList/${cartItem.id}`);

      dispatch(cartListAction.deleteCartItem.success(response.data));
    } catch (error) {
      dispatch(cartListAction.deleteCartItem.failure(error.response.data.errorMessage));
    }
  };
