import { DEFAULT_VALUE_SERVER_OWNER, KEY_LOCALSTORAGE_SERVER_OWNER, SERVERS } from '../constants';
import { LocalProductType } from '../types/domain';
import { getLocalStorage } from '../utils';
import { parseExpiredDate, parseOrderListData } from '../utils/domain';
import { generateStatusErrorMessage } from './generateStatusErrorMessage';

// Base64로 인코딩
const base64 = btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD);

const request = async (path: string, init?: RequestInit) => {
  const base = SERVERS[getLocalStorage(KEY_LOCALSTORAGE_SERVER_OWNER, DEFAULT_VALUE_SERVER_OWNER)];
  const response = await fetch([base, path].join(''), {
    ...init,
    headers: {
      Authorization: `Basic ${base64}`,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = generateStatusErrorMessage(response.status.toString());
    throw new Error(errorMessage);
  }
  return response;
};

export const fetchProducts = () => request('/products').then((response) => response.json());

export const fetchCartItems = () => request(`/cart-items`).then((response) => response.json());

export const changeQuantity = async (cartItemId: number, newQuantity: number) =>
  request(`/cart-items/${cartItemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity: newQuantity }),
  });

export const addCartItem = async (productId: number) =>
  request(`/cart-items`, {
    method: 'POST',
    body: JSON.stringify({ productId: productId }),
  });

export const deleteCartItem = async (cartItemId: number) =>
  request(`/cart-items/${cartItemId}`, {
    method: 'DELETE',
  });

export const fetchCoupons = async (cartItemIdList: number[]) => {
  const orderQuery = cartItemIdList
    .map((id) => {
      return `cartItemId=${id}`;
    })
    .join('&');

  return request(`/orders/coupons?${orderQuery}`)
    .then((response) => response.json())
    .then((data) => parseExpiredDate(data.coupons));
};

export const fetchAddOrderList = async (
  orderListData: LocalProductType[],
  couponId: number | null,
) => {
  const parsedOrderListData = parseOrderListData(couponId, orderListData);

  return request(`/orders`, {
    method: 'POST',
    body: JSON.stringify(parsedOrderListData),
  });
};

export const fetchOrderList = (orderId?: number) => {
  return request(`/orders/${orderId ?? ''}`).then((response) => response.json());
};
