import type { ServerNameType } from '../types';

import { BASE_URL_MAP } from '../constants';

export const getProducts = async <T>(serverName: ServerNameType) => {
  const response = await fetch(`${BASE_URL_MAP[serverName]}/products`);
  if (!response.ok) throw new Error(`products GET error`);

  const data: T = await response.json();

  return data;
};

export const getCart = async <T>(serverName: ServerNameType, loginCredential: string) => {
  const response = await fetch(`${BASE_URL_MAP[serverName]}/cart-items`, {
    headers: {
      Authorization: `Basic ${loginCredential}`,
    },
  });

  if (!response.ok) throw new Error(`cart-items GET error`);

  const data: T = await response.json();

  return data;
};

export const postCartItem = async (
  serverName: ServerNameType,
  productId: number,
  loginCredential: string
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items`;
  const body = { productId };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${loginCredential}`,
      'content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`${url} POST Error`);
};

export const patchCartItemQuantity = async (
  serverName: ServerNameType,
  cartItemId: number,
  quantity: number,
  loginCredential: string
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;
  const body = { quantity };

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Basic ${loginCredential}`,
      'content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`${url} PATCH Error`);
};

export const deleteCartItem = async (
  serverName: ServerNameType,
  cartItemId: number,
  loginCredential: string
) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items/${cartItemId}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Basic ${loginCredential}` },
  });

  if (!response.ok) throw new Error(`${url} FETCH Error`);
};

export const deleteCartItems = async (
  serverName: ServerNameType,
  cartItemIdList: number[],
  loginCredential: string
) => {
  const ids = cartItemIdList.map(String).join(',');
  const url = `${BASE_URL_MAP[serverName]}/cart-items?ids=${ids}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Basic ${loginCredential}` },
  });

  if (!response.ok) throw new Error(`${url} FETCH Error`);
};

export const postSignUpInfo = async (
  serverName: ServerNameType,
  signUpInfo: { name: string; password: string }
) => {
  const url = `${BASE_URL_MAP[serverName]}/users/join`;
  const body = signUpInfo;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok && response.body) {
    const errorMessage = (await response.json()) as { errorMessage: string };
    throw new Error(`${errorMessage.errorMessage}`);
  }
  if (!response.ok) throw new Error(`${url} FETCH Error`);
};

export const postLoginInfo = async (
  serverName: ServerNameType,
  loginInfo: { name: string; password: string }
) => {
  const url = `${BASE_URL_MAP[serverName]}/users/login`;
  const body = loginInfo;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok && response.body) {
    const errorMessage = (await response.json()) as { errorMessage: string };
    throw new Error(`${errorMessage.errorMessage}`);
  }
  if (!response.ok) throw new Error(`${url} FETCH Error`);

  const loginToken = await response.json();

  return loginToken['token'];
};
