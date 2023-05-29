import { API_ENDPOINT } from '../constants/api';
import { CartItemData } from '../types/cart';
import { fetchAPI } from './fetchAPI';

const getCartAPI = (baseUrl: string, headers: HeadersInit) => {
  const getCartList = async (): Promise<CartItemData[]> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'GET',
      headers,
    });
  };

  const postCartItem = async (productId: number): Promise<Response> => {
    const data = {
      productId,
    };
    const jsonData = JSON.stringify(data);

    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'POST',
      headers,
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
      headers,
      body: jsonData,
    });
  };

  const deleteCartItem = async (cartItemId: number): Promise<Response> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'DELETE',
      headers,
    });
  };

  return { getCartList, postCartItem, patchCartItem, deleteCartItem };
};

export { getCartAPI };
