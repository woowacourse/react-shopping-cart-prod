import axios from 'configs/api';
import { Product } from 'types';

import PATH from 'constants/path';

const cartAPI = {
  load: async function (accessToken: string) {
    try {
      const { data } = await axios.get(PATH.REQUEST_CART, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
  add: async function (
    accessToken: string,
    productId: Product['id'],
    quantity: number
  ) {
    try {
      await axios.post(
        PATH.REQUEST_CART,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return this.load(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
  delete: async function (accessToken: string, cartItemId: string) {
    try {
      await axios.delete(`${PATH.REQUEST_CART}/${cartItemId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return this.load(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
  deleteItems: async function (accessToken: string, cartItems: Array<string>) {
    try {
      for (const cartItemId of cartItems) {
        await axios.delete(`${PATH.REQUEST_CART}/${cartItemId}`, {
          headers: { Authorization: `Bearer ${accessToken}}` },
        });
      }

      return this.load(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
  changeQuantity: async function (
    accessToken: string,
    cartItemId: string,
    quantity: number
  ) {
    try {
      await axios.patch(
        `${PATH.REQUEST_CART}/${cartItemId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return this.load(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
};

export default cartAPI;
