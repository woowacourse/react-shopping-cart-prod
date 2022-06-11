import { AppDispatch } from '@/redux/store';
import { show } from '@/redux/modules/snackBar';
import {
  addItem,
  addItemFailure,
  addItemSuccess,
  deleteBySelectedItems,
  deleteBySelectedItemsFailure,
  deleteBySelectedItemsSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  loadCart,
  loadCartFailure,
  loadCartSuccess,
  updateQuantity,
  updateQuantityFailure,
  updateQuantitySuccess,
} from './cartAction';

import axios, { AxiosError } from 'axios';
import { getCookie } from '@/utils';
import { INFO_MESSAGES } from '@/constants';

const loadCartAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(loadCart());

  try {
    const { data: cart } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/customers/me/carts`,
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    );

    dispatch(loadCartSuccess(cart));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      dispatch(loadCartFailure(error.response?.data));
    }
  }
};

const addItemAPI =
  (item: { id: number; imageUrl: string; name: string; price: number; isSelected: boolean }): any =>
  async (dispatch: AppDispatch) => {
    dispatch(addItem());

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/customers/me/carts`, item, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });

      dispatch(addItemSuccess());
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(addItemFailure(error.response?.data));
      }
    }
  };

const deleteItemAPI =
  (cartId: number): any =>
  async (dispatch: AppDispatch) => {
    dispatch(deleteItem());

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/me/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });

      dispatch(deleteItemSuccess(cartId));
      dispatch(show(INFO_MESSAGES.DELETED_FROM_CART));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(deleteItemFailure(error.response?.data));
      }
    }
  };

const updateQuantityAPI =
  (cartId: number, quantity: number): any =>
  async (dispatch: AppDispatch) => {
    dispatch(updateQuantity());

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/customers/me/carts/${cartId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      );

      dispatch(updateQuantitySuccess(cartId, quantity));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(updateQuantityFailure(error.response?.data));
      }
    }
  };

const deleteBySelectedItemsAPI =
  (selectedItemsId: number[]): any =>
  async (dispatch: AppDispatch) => {
    dispatch(deleteBySelectedItems());

    try {
      await selectedItemsId.forEach((id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/me/carts/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        });
      });

      dispatch(deleteBySelectedItemsSuccess());
      dispatch(show(INFO_MESSAGES.DELETED_FROM_CART));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(deleteBySelectedItemsFailure(error.response?.data));
      }
    }
  };

export { loadCartAPI, addItemAPI, deleteItemAPI, updateQuantityAPI, deleteBySelectedItemsAPI };
