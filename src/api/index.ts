import type {
  CartType,
  CouponType,
  OrderDetailType,
  OrderType,
  ProductType,
  ServerNameType,
} from '../types';

import { BASE_URL_MAP } from '../constants';

export const getProducts = async (serverName: ServerNameType) => {
  const url = `${BASE_URL_MAP[serverName]}/products`;
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) throw new Error(`${url} GET error`);

  const products: ProductType[] = await response.json();

  return products;
};

export const postLogin = async (serverName: ServerNameType, name: string, password: string) => {
  const url = `${BASE_URL_MAP[serverName]}/users/login`;
  const body = JSON.stringify({
    name,
    password,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) throw new Error(`${url} POST Error`);

  const { token }: { token: string } = await response.json();

  return token;
};

export const postJoin = async (serverName: ServerNameType, name: string, password: string) => {
  const url = `${BASE_URL_MAP[serverName]}/users/join`;
  const body = JSON.stringify({
    name,
    password,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) throw new Error(`${url} POST Error`);
};

export const getCoupons = async (serverName: ServerNameType, token: string) => {
  const url = `${BASE_URL_MAP[serverName]}/users/me/coupons`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);

  const coupons: CouponType[] = await response.json();

  return coupons;
};

export const getCart = async (serverName: ServerNameType, token: string) => {
  const url = `${BASE_URL_MAP[serverName]}/cart-items`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);

  const cart: CartType = await response.json();

  return cart;
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

export const getOrders = async (serverName: ServerNameType, token: string) => {
  const url = `${BASE_URL_MAP[serverName]}/orders`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);

  const orders: OrderType[] = await response.json();

  return orders;
};

export const getOrder = async (serverName: ServerNameType, token: string, orderId: number) => {
  const url = `${BASE_URL_MAP[serverName]}/orders/${orderId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);

  const order: OrderDetailType = await response.json();

  return order;
};

interface OrderRequestItemType {
  productId: number;
  quantity: number;
}

export const postOrder = async (
  serverName: ServerNameType,
  token: string,
  items: OrderRequestItemType[],
  couponId: number | null
) => {
  const url = `${BASE_URL_MAP[serverName]}/orders`;
  const body = JSON.stringify({
    items,
    couponId,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) throw new Error(`${url} POST error`);
};
