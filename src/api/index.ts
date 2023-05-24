import type { CartType, ProductType, ServerNameType } from '../types';

import { BASE_URL_MAP, USER_ID, USER_PASSWORD } from '../constants';

const Authorization = `Basic ${btoa(`${USER_ID}:${USER_PASSWORD}`)}`;

const get =
  <T>(path: string) =>
  async (serverName: ServerNameType) => {
    const response = await fetch(`${BASE_URL_MAP[serverName]}/${path}`, {
      headers: {
        Authorization,
      },
    });
    if (!response.ok) throw new Error(`${path} GET error`);

    const data: T = await response.json();

    return data;
  };

export const getProducts = get<ProductType[]>('products');

export const getCart = get<CartType>('cart-items');

export const postCartItem = async (serverName: ServerNameType, productId: number) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items`;
  const body = { productId };

  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization, 'content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`${url} POST Error`);
};

export const patchCartItemQuantity = async (
  serverName: ServerNameType,
  cartItemId: number,
  quantity: number
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;
  const body = { quantity };

  const response = await fetch(url, {
    method: 'PATCH',
    headers: { Authorization, 'content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`${url} PATCH Error`);
};

export const deleteCartItem = async (serverName: ServerNameType, cartItemId: number) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;

  const response = await fetch(url, { method: 'DELETE', headers: { Authorization } });

  if (!response.ok) throw new Error(`${url} FETCH Error`);
};

export const deleteCartItems = async (serverName: ServerNameType, cartItemIdList: number[]) => {
  const ids = cartItemIdList.map(String).join(',');
  const url = `${BASE_URL_MAP[serverName]}/cart-items/ids=${ids}`;

  const response = await fetch(url, { method: 'DELETE', headers: { Authorization } });

  if (!response.ok) throw new Error(`${url} FETCH Error`);
};
