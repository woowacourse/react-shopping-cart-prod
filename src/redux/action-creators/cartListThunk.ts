import { cartListAction, CartListAction } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';
import type { Dispatch } from 'redux';
import axios from 'axios';
import { getLocalStorageToken } from 'utils/localStorage';
import { BASE_URL } from 'apis';

export const getCartList = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.getCartList.pending());
  const token = getLocalStorageToken();

  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/cart`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(cartListAction.getCartList.success(response.data.cartItems));
  } catch (error) {
    dispatch(cartListAction.getCartList.failure(error.response.data.errorMessage));
  }
};

export const patchCartItem =
  (cartItemList: CartItem[]) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListAction.patchCartItem.pending());
    const token = getLocalStorageToken();

    try {
      const response = await axios({
        method: 'patch',
        url: `${BASE_URL}/cart`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { cartItems: cartItemList },
      });

      dispatch(cartListAction.patchCartItem.success(response.data.cartItems));
    } catch (error) {
      dispatch(cartListAction.patchCartItem.failure(error.response.data.errorMessage));
    }
  };

export const postCartItem = (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.postCartItem.pending());
  const token = getLocalStorageToken();

  try {
    await axios({
      method: 'post',
      url: `${BASE_URL}/cart`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        productId: cartItem.id,
        quantity: cartItem.quantity,
        checked: cartItem.checked,
      },
    });

    dispatch(cartListAction.postCartItem.success(cartItem));
  } catch (error) {
    dispatch(cartListAction.postCartItem.failure(error.response.data.errorMessage));
  }
};

export const deleteSelectedCartItem =
  (cartItemList: CartItem[]) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListAction.deleteSelectedCartItem.pending());
    const token = getLocalStorageToken();
    const selectedIdList = cartItemList.map(cartItem => ({ id: cartItem.id }));

    try {
      await axios({
        method: 'delete',
        url: `${BASE_URL}/cart`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { cartItems: selectedIdList },
      });

      dispatch(cartListAction.deleteSelectedCartItem.success(selectedIdList));
    } catch (error) {
      dispatch(cartListAction.deleteSelectedCartItem.failure(error.response.data.errorMessage));
    }
  };

export const deleteAllCartItem = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListAction.deleteAllCartItem.pending());
  const token = getLocalStorageToken();

  try {
    await axios({
      method: 'delete',
      url: `${BASE_URL}/cart/all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(cartListAction.deleteAllCartItem.success());
  } catch (error) {
    dispatch(cartListAction.deleteAllCartItem.failure(error.response.data.errorMessage));
  }
};
