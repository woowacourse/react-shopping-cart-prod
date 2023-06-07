import { API_ENDPOINT, AUTHORIZED_FETCH_OPTION_HEADERS } from '../constants/api';
import type { CartItemData } from '../types/cart';
import { fetchAPI } from './utils/fetchAPI';

const getCartAPI = (baseUrl: string) => {
  const getCartList = (): Promise<CartItemData[]> => {
    return fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'GET',
      headers: { Authorization: AUTHORIZED_FETCH_OPTION_HEADERS.Authorization },
    });
  };

  const postCartItem = (productId: number): Promise<Response> => {
    const data = {
      productId,
    };
    const jsonData = JSON.stringify(data);

    return fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'POST',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
      body: jsonData,
    });
  };

  const patchCartItem = (cartItemId: number, quantity: number): Promise<Response> => {
    const data = {
      quantity,
    };
    const jsonData = JSON.stringify(data);

    return fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'PATCH',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
      body: jsonData,
    });
  };

  const deleteCartItem = (cartItemId: number): Promise<Response> => {
    return fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'DELETE',
      headers: { Authorization: AUTHORIZED_FETCH_OPTION_HEADERS.Authorization },
    });
  };

  return { getCartList, postCartItem, patchCartItem, deleteCartItem };
};

export { getCartAPI };
