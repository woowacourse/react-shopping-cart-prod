import axios from 'configs/api';

import PATH from 'constants/path';
import { Product } from 'types';
import { getAccessToken } from 'utils/auth';

const cartAPI = {
  addCartItem: async function (cartItem: {
    productId: Product['id'];
    quantity: number;
  }) {
    const accessToken = getAccessToken();

    try {
      const response = await axios.post(
        `${PATH.REQUEST_CART_ITEMS}`,
        cartItem,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  deleteCartItem: async function (cartItemId: number) {
    const accessToken = getAccessToken();

    try {
      const response = await axios.delete(
        `${PATH.REQUEST_CART_ITEMS}/${cartItemId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  deleteCartItems: function (cartItemIds: number[]) {
    try {
      let response;

      for (const cartItemId of cartItemIds) {
        response = this.deleteCartItem(cartItemId);
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  //TODO: API 생성기 추상화
  changeCartItemQuantity: async function (
    cartItemId: number,
    quantity: number
  ) {
    const accessToken = getAccessToken();

    try {
      const response = await axios.patch(
        `${PATH.REQUEST_CART_ITEMS}/${cartItemId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
};

export default cartAPI;
