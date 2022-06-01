import { BASE_URL } from 'apis';
import axios from 'axios';
import type { Dispatch } from 'redux';
import { CartListAction, cartListActions } from 'redux/cartList/action';
import { RootState } from 'redux/rootReducer';
import { CartItem } from 'types/domain';

export const getCartListRequest = () => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListActions.getCartListActionGroup.request());
  try {
    const response = await axios.get(`${BASE_URL}/cartList`);

    dispatch(cartListActions.getCartListActionGroup.success(response.data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.getCartListActionGroup.failure(e));
    }
  }
};

export const putCartItemRequest =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListActions.putCartItemActionGroup.request());
    try {
      const response = await axios.put(`${BASE_URL}/cartList/${cartItem.id}`, cartItem);

      dispatch(cartListActions.putCartItemActionGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.putCartItemActionGroup.failure(e));
      }
    }
  };

export const postCartItemRequest =
  (cartItem: CartItem) => async (dispatch: Dispatch<CartListAction>) => {
    dispatch(cartListActions.postCartItemActionGroup.request());
    try {
      const response = await axios.post(`${BASE_URL}/cartList`, cartItem);

      dispatch(cartListActions.postCartItemActionGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.postCartItemActionGroup.failure(e));
      }
    }
  };

export const patchCartSelectedRequest =
  (id: number) => async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch(cartListActions.patchCartSelectedActionGroup.request());
    try {
      const { data: cartList } = getState().cartList;
      const isSelected = cartList.find(item => item.id === id).isSelected;
      const response = await axios.patch(`${BASE_URL}/cartList/${id}`, { isSelected: !isSelected });

      dispatch(cartListActions.patchCartSelectedActionGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.patchCartSelectedActionGroup.failure(e));
      }
    }
  };

export const patchAllCartSelectedRequest =
  (isAllSelected: boolean) =>
  async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch(cartListActions.patchAllCartSelectedActionGroup.request());
    try {
      const { data: cartList } = getState().cartList;

      cartList.forEach(
        async item =>
          await axios.patch(`${BASE_URL}/cartList/${item.id}`, { isSelected: !isAllSelected })
      );

      dispatch(cartListActions.patchAllCartSelectedActionGroup.success(!isAllSelected));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.patchAllCartSelectedActionGroup.failure(e));
      }
    }
  };

export const deleteCartItemRequest = (id: number) => async (dispatch: Dispatch<CartListAction>) => {
  dispatch(cartListActions.deleteCartItemActionGroup.request());
  try {
    await axios.delete(`${BASE_URL}/cartList/${id}`);

    dispatch(cartListActions.deleteCartItemActionGroup.success(id));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.deleteCartItemActionGroup.failure(e));
    }
  }
};

export const deleteAllCartItemRequest =
  () => async (dispatch: Dispatch<CartListAction>, getState: () => RootState) => {
    dispatch(cartListActions.deleteAllCartItemActionGroup.request());
    try {
      const { data: cartList } = getState().cartList;

      cartList.forEach(async item => await axios.delete(`${BASE_URL}/cartList/${item.id}`));

      dispatch(cartListActions.deleteAllCartItemActionGroup.success());
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.deleteAllCartItemActionGroup.failure(e));
      }
    }
  };
