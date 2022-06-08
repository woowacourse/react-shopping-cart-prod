import { BASE_URL } from 'apis';
import axios from 'axios';
import type { Dispatch } from 'redux';
import { CartListAction, cartListActions } from 'redux/cartList/action';

export const getCartListRequest = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListActions.getCartListActionGroup.request());
  try {
    const response = await axios.get(`${BASE_URL}/customers/carts`);

    dispatch(cartListActions.getCartListActionGroup.success(response.data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.getCartListActionGroup.failure(e));
    }
  }
};

export const putCartItemRequest =
  ({ id, quantity }: { id: number; quantity: number }) =>
  async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListActions.putCartItemActionGroup.request());
    try {
      const response = await axios.put(`${BASE_URL}/customers/carts/${id}`, { quantity });

      dispatch(cartListActions.putCartItemActionGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.putCartItemActionGroup.failure(e));
      }
    }
  };

export const postCartItemRequest =
  (productId: number) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListActions.postCartItemActionGroup.request());
    try {
      const response = await axios.post(`${BASE_URL}/customers/carts`, { productId });

      dispatch(cartListActions.postCartItemActionGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.postCartItemActionGroup.failure(e));
      }
    }
  };

export const deleteCartItemRequest = (id: number) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListActions.deleteCartItemActionGroup.request());
  try {
    await axios.delete(`${BASE_URL}/customers/carts/${id}`);

    dispatch(cartListActions.deleteCartItemActionGroup.success(id));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.deleteCartItemActionGroup.failure(e));
    }
  }
};

export const deleteAllCartItemRequest = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListActions.deleteAllCartItemActionGroup.request());
  try {
    await axios.delete(`${BASE_URL}/customers/carts`);

    dispatch(cartListActions.deleteAllCartItemActionGroup.success());
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.deleteAllCartItemActionGroup.failure(e));
    }
  }
};
