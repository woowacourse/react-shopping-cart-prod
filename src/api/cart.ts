import type { CartType, ServerNameType } from '../types';

import { BASE_URL_MAP } from '../constants';

export const getCart = async (serverName: ServerNameType, token: string): Promise<CartType> => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);
  return response.json();
};

export const postCartItem = async (
  serverName: ServerNameType,
  token: string,
  productId: number
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items`;
  const body = JSON.stringify({
    productId,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) throw new Error(`${url} POST Error`);
};

export const patchCartItemQuantity = async (
  serverName: ServerNameType,
  token: string,
  cartItemId: number,
  quantity: number
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;
  const body = JSON.stringify({
    quantity,
  });

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) throw new Error(`${url} PATCH Error`);
};

export const deleteCartItem = async (
  serverName: ServerNameType,
  token: string,
  cartItemId: number
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} FETCH Error`);
};

export const deleteCartItems = async (
  serverName: ServerNameType,
  token: string,
  cartItemIdList: number[]
) => {
  const ids = cartItemIdList.map(String).join(',');
  const url = `${BASE_URL_MAP[serverName]}/cart-items?ids=${ids}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} FETCH Error`);
};
