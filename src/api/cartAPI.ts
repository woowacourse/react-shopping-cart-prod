import { API_ENDPOINT, CART_FETCH_OPTION_HEADERS } from '../constants/api';
import { CartItemData, CartPriceData } from '../types';
import { fetchAPI } from './fetchAPI';

const getCartAPI = (baseUrl: string) => {
  const getCartList = async (): Promise<CartItemData[]> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'GET',
      headers: { ...CART_FETCH_OPTION_HEADERS },
    });
  };

  const postCartItem = async (productId: number): Promise<Response> => {
    const data = {
      productId,
    };
    const jsonData = JSON.stringify(data);

    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, {
      method: 'POST',
      headers: { ...CART_FETCH_OPTION_HEADERS },
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
      headers: { ...CART_FETCH_OPTION_HEADERS },
      body: jsonData,
    });
  };

  const deleteCartItem = async (cartItemId: number): Promise<Response> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'DELETE',
      headers: { Authorization: CART_FETCH_OPTION_HEADERS.Authorization },
    });
  };

  const getCosts = async (): Promise<CartPriceData> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.COSTS}`, {
      method: 'GET',
      headers: { ...CART_FETCH_OPTION_HEADERS },
    });
  };

  return { getCartList, postCartItem, patchCartItem, deleteCartItem, getCosts };
};

export { getCartAPI };
