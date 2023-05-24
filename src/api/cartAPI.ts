import { API_ENDPOINT, CART_FETCH_OPTION_HEADERS } from '../constants/api';
import { CartItemData } from '../types';
import { fetchAPI } from './fetchAPI';

const getCartList = async (): Promise<CartItemData[]> => {
  return await fetchAPI(API_ENDPOINT.CART_ITEMS, {
    method: 'GET',
    headers: { ...CART_FETCH_OPTION_HEADERS },
  });
};

const postCartItem = async (productId: number): Promise<CartItemData[]> => {
  const data = {
    productId,
  };
  const jsonData = JSON.stringify(data);

  return await fetchAPI(API_ENDPOINT.CART_ITEMS, {
    method: 'POST',
    headers: { ...CART_FETCH_OPTION_HEADERS },
    body: jsonData,
  });
};

const patchCartItem = async (cartItemId: number, quantity: number): Promise<CartItemData[]> => {
  const data = {
    quantity,
  };
  const jsonData = JSON.stringify(data);

  return await fetchAPI(`${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
    method: 'PATCH',
    headers: { ...CART_FETCH_OPTION_HEADERS },
    body: jsonData,
  });
};

const deleteCartItem = async (cartItemId: number): Promise<Response> => {
  return await fetchAPI(`${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: CART_FETCH_OPTION_HEADERS.Authorization },
  });
};

export { getCartList, postCartItem, patchCartItem, deleteCartItem };
