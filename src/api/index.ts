import type { CartType, ProductType, ServerNameType } from '../types';

import { BASE_URL_MAP } from '../constants';

const get =
  <T>(path: string) =>
  async (serverName: ServerNameType) => {
    const response = await fetch(`${BASE_URL_MAP[serverName]}/${path}`);
    if (!response.ok) throw new Error(`${path} GET error`);

    const data: T = await response.json();

    return data;
  };

export const getProducts = get<ProductType[]>('products');

export const getCart = get<CartType>('cart-items');

export const postCartItem = async (serverName: ServerNameType, productId: number) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items`;
  const body = { productId };

  const response = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`${url} POST Error`);
};

export const patchCartItemQuantity = async (
  serverName: ServerNameType,
  cartItemId: number,
  quantity: number
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;
  const body = { quantity };

  const response = await fetch(url, { method: 'PATCH', body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`${url} PATCH Error`);
};

export const deleteCartItem = async (serverName: ServerNameType, cartItemId: number) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;

  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw new Error(`${url} FETCH Error`);
};
