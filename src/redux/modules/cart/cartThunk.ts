import { AppDispatch } from '@/redux/store';
import { show } from '@/redux/modules/snackBar';
import {
  addItem,
  deleteBySelectedItems,
  deleteItem,
  loadCart,
  loadCartSuccess,
  updateQuantity,
} from './cartAction';

import axios, { AxiosError } from 'axios';
import { getCookie } from '@/utils';
import { ERROR_MESSAGES, INFO_MESSAGES } from '@/constants';

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
      alert(ERROR_MESSAGES.REQUEST.GET_CART);
    }
  }
};

const addItemAPI =
  (id: number): any =>
  async (dispatch: AppDispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/customers/me/carts`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      );

      dispatch(addItem());
      dispatch(show(INFO_MESSAGES.ADDED_TO_CART));

      return true;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(ERROR_MESSAGES.REQUEST.ADD_ITEM_TO_CART);
      }
    }
  };

const deleteItemAPI =
  (cartId: number): any =>
  async (dispatch: AppDispatch) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/me/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });

      dispatch(deleteItem(cartId));
      dispatch(show(INFO_MESSAGES.DELETED_FROM_CART));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(ERROR_MESSAGES.REQUEST.DELETE_ITEM_FROM_CART);
      }
    }
  };

const updateQuantityAPI =
  (cartId: number, quantity: number): any =>
  async (dispatch: AppDispatch) => {
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

      dispatch(updateQuantity(cartId, quantity));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(ERROR_MESSAGES.REQUEST.UPDATE_CART_ITEM_QUANTITY);
      }
    }
  };

const deleteBySelectedItemsAPI =
  (selectedItemsId: number[]): any =>
  async (dispatch: AppDispatch) => {
    try {
      await selectedItemsId.forEach((id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/me/carts/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        });
      });

      dispatch(deleteBySelectedItems());
      dispatch(show(INFO_MESSAGES.DELETED_FROM_CART));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(ERROR_MESSAGES.REQUEST.DELETE_ITEM_FROM_CART);
      }
    }
  };

export { loadCartAPI, addItemAPI, deleteItemAPI, updateQuantityAPI, deleteBySelectedItemsAPI };
