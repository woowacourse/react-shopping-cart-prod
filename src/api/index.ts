import type { PurchasingCartItemType, ServerNameType } from '../types';

import { API_ERROR_MESSAGE, BASE_URL_MAP } from '../constants';

export const getProducts = async <T>(serverName: ServerNameType) => {
  const response = await fetch(`${BASE_URL_MAP[serverName]}/products`);
  if (!response.ok) throw new Error(`products GET error`);

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.getProducts}`);
  }

  const data: T = await response.json();

  return data;
};

export const getCarts = async <T>(serverName: ServerNameType, loginCredential: string) => {
  const response = await fetch(`${BASE_URL_MAP[serverName]}/cart-items`, {
    headers: {
      Authorization: `Basic ${loginCredential}`,
    },
  });

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.getCart}`);
  }

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

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.postCartItem}`);
  }
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

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.patchCartItemQuantity}`);
  }
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

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.deleteCartItem}`);
  }
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

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.deleteCartItem}`);
  }
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

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.postSignUp}`);
  }
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

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.postLogin}`);
  }

  const loginToken = await response.json();

  return loginToken['token'];
};

export const getCoupon = async <T>(serverName: ServerNameType, loginCredential: string) => {
  const url = `${BASE_URL_MAP[serverName]}/users/me/coupons`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${loginCredential}`,
    },
  });

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.getCoupon}`);
  }

  const data: T = await response.json();

  return data;
};

export const postPurchaseCartItem = async <T>(
  serverName: ServerNameType,
  loginCredential: string,
  purchasingCartItems: PurchasingCartItemType[],
  couponId: number | null
) => {
  const url = `${BASE_URL_MAP[serverName]}/orders`;
  const body = { items: purchasingCartItems, couponId };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${loginCredential}`,
      'content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.postPurchaseCartItem}`);
  }
};

export const getOrder = async <T>(serverName: ServerNameType, loginCredential: string) => {
  const response = await fetch(`${BASE_URL_MAP[serverName]}/orders`, {
    headers: {
      Authorization: `Basic ${loginCredential}`,
    },
  });

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.getOrder}`);
  }

  const data: T = await response.json();

  return data;
};

export const getOrderDetail = async <T>(
  serverName: ServerNameType,
  loginCredential: string,
  orderId: string
) => {
  const response = await fetch(`${BASE_URL_MAP[serverName]}/orders/${orderId}`, {
    headers: {
      Authorization: `Basic ${loginCredential}`,
    },
  });

  if (!response.ok) {
    throw response.body
      ? new Error(`${(await response.json()).errorMessage}`)
      : new Error(`${API_ERROR_MESSAGE.getDetailOrder}`);
  }

  const data: T = await response.json();

  return data;
};
