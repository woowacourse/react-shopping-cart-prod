import { LOCAL_BASE_URL } from 'apis';
import { CartListActionType, CartListAction } from 'redux/actions/cartList';
import { CartItem } from 'types/domain';
import type { Dispatch } from 'redux';
import axios from 'axios';
import { getLocalStorageToken } from 'utils/localStorage';

export const getCartList = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch({ type: CartListActionType.GET_CART_LIST_START });
  const token = getLocalStorageToken();

  try {
    const response = await axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      url: `${LOCAL_BASE_URL}/cart`,
    });

    dispatch({
      type: CartListActionType.GET_CART_LIST_SUCCESS,
      payload: response.data.cartItems,
    });
  } catch (e) {
    dispatch({
      type: CartListActionType.GET_CART_LIST_FAILURE,
      payload: e.message,
    });
  }
};

export const postCartItem = (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch({ type: CartListActionType.POST_CART_ITEM_START });
  const token = getLocalStorageToken();

  try {
    const response = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      url: `${LOCAL_BASE_URL}/cart`,
      data: cartItem,
    });

    dispatch({
      type: CartListActionType.POST_CART_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: CartListActionType.POST_CART_ITEM_FAILURE,
      payload: e.message,
    });
  }
};

export const patchCartItem =
  (cartItem: { cartItems: CartItem[] }) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch({ type: CartListActionType.PATCH_CART_ITEM_START });
    const token = getLocalStorageToken();

    try {
      const response = await axios({
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${LOCAL_BASE_URL}/cart`,
        data: cartItem,
      });

      dispatch({
        type: CartListActionType.PATCH_CART_ITEM_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CartListActionType.PATCH_CART_ITEM_FAILURE,
        payload: e.message,
      });
    }
  };

export const deleteCartItem =
  (cartItem: { cartItems: { id: number }[] }) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch({ type: CartListActionType.REMOVE_CART_ITEM_START });
    const token = getLocalStorageToken();

    try {
      const response = await axios({
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${LOCAL_BASE_URL}/cart`,
        data: cartItem,
      });

      dispatch({
        type: CartListActionType.REMOVE_CART_ITEM_SUCCESS,
        payload: cartItem.cartItems,
      });
    } catch (e) {
      dispatch({
        type: CartListActionType.REMOVE_CART_ITEM_FAILURE,
        payload: e.message,
      });
    }
  };

// TODO: 장바구니 선택상품 제거 추가
// TODO: 장바구니 전체상품 제거 추가
