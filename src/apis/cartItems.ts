import type { CartItemType } from '../types/product';
import type { HostNameType } from '../types/server';

import { servers } from '../constants/server';
import fetchWithHeaders from '.';

export const api = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/cart-items`;

  const getCartItems = async () => {
    const response = await fetchWithHeaders(URL, 'GET');
    const data: CartItemType[] = await response.json();

    return data;
  };

  const createCartProduct = async (productId: number) => {
    const response = await fetchWithHeaders(URL, 'POST', { productId });

    const location = response.headers.get('location');

    if (location !== null) {
      const lastSlashIndex = location.lastIndexOf('/');
      const cartItemId = location.slice(lastSlashIndex + 1);
      return cartItemId;
    }

    return;
  };

  const editCartProductQuantity = async (
    cartItemId: number,
    quantity: number
  ) => {
    const response = await fetchWithHeaders(`${URL}/${cartItemId}`, 'PATCH', {
      quantity,
    });

    return response;
  };

  const deleteCartProduct = async (cartItemId: number) => {
    await fetchWithHeaders(`${URL}/${cartItemId}`, 'DELETE');
  };

  return {
    getCartItems,
    createCartProduct,
    editCartProductQuantity,
    deleteCartProduct,
  };
};
