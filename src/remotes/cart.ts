import { auth } from '../constants/auth';
import type { CartItem, Product } from '../types/product';
import Fetcher from './Fetcher';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { isCartItems } from '../types/typeGuards';

export const fetchCartItems = async (url: string) => {
  const { value } = await Fetcher.fetch<CartItem[]>({
    url,
    auth: `Basic ${auth}`,
    method: 'GET',
    typeGuard: isCartItems,
    errorMessages: ERROR_MESSAGES.getCart,
  });

  return value;
};

export const addCartItem = async (url: string, productId: Product['id']) => {
  await Fetcher.fetchNoResponseJSON({
    url,
    auth: `Basic ${auth}`,
    method: 'POST',
    body: JSON.stringify({ productId }),
    errorMessages: ERROR_MESSAGES.addCart,
  });
};

export const updateQuantity = async (
  url: string,
  quantity: CartItem['quantity'],
) => {
  await Fetcher.fetchNoResponseJSON({
    url,
    auth: `Basic ${auth}`,
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
    errorMessages: ERROR_MESSAGES.changeCart,
  });
};

export const removeCartItem = async (url: string) => {
  await Fetcher.fetchNoResponseJSON({
    url,
    auth: `Basic ${auth}`,
    method: 'DELETE',
    errorMessages: ERROR_MESSAGES.removeCart,
  });
};
