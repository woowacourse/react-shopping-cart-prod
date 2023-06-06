import type { CartType, ServerNameType } from '../types';

import fetcher from '../utils/fetcher';

export const getCart = (serverName: ServerNameType, token: string) =>
  fetcher(serverName, token)<CartType>('GET', 'cart-items');

export const postCartItem = (serverName: ServerNameType, token: string, productId: number) =>
  fetcher(serverName, token)('POST', 'cart-items', { productId });

export const patchCartItemQuantity = (
  serverName: ServerNameType,
  token: string,
  cartItemId: number,
  quantity: number
) => fetcher(serverName, token)('PATCH', `cart-items/${cartItemId}`, { quantity });

export const deleteCartItem = (serverName: ServerNameType, token: string, cartItemId: number) =>
  fetcher(serverName, token)('DELETE', `cart-items/${cartItemId}`);

export const deleteCartItems = (
  serverName: ServerNameType,
  token: string,
  cartItemIdList: number[]
) => {
  const ids = cartItemIdList.map(String).join(',');
  return fetcher(serverName, token)('DELETE', `cart-items?ids=${ids}`);
};
