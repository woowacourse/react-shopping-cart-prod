import { API_ENDPOINT, AUTHORIZED_FETCH_OPTION_HEADERS } from '../constants/api';
import { CartItemData } from '../types/cart';
import { fetchAPI } from './utils/fetchAPI';

const getCartAPI = (baseUrl: string) => {
  const getCartList = async (): Promise<CartItemData[]> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'GET',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
    });
  };

  const postCartItem = async (productId: number): Promise<Response> => {
    const data = {
      productId,
    };
    const jsonData = JSON.stringify(data);

    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'POST',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
      body: jsonData,
    });
  };

  const patchCartItem = async (cartItemId: number, quantity: number): Promise<Response> => {
    const data = {
      quantity,
    };
    const jsonData = JSON.stringify(data);

    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'PATCH',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
      body: jsonData,
    });
  };

  const deleteCartItem = async (cartItemId: number): Promise<Response> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'DELETE',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
    });
  };

  return { getCartList, postCartItem, patchCartItem, deleteCartItem };
};

export { getCartAPI };
