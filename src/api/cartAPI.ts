import { API_ENDPOINT } from '../constants/api';
import { CartItemData, CartPriceData } from '../types';
import { JsonAPI } from './fetchAPI';

const getCartAPI = (baseUrl: string) => {
  const getCartList = (): Promise<CartItemData[]> =>
    JsonAPI.get(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`);

  const postCartItem = (productId: number): Promise<Response> =>
    JsonAPI.post(`${baseUrl}${API_ENDPOINT.CART_ITEMS}`, true, {
      body: JSON.stringify({ productId }),
    });

  const patchCartItem = (cartItemId: number, quantity: number): Promise<Response> => {
    return JsonAPI.patch(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`, true, {
      body: JSON.stringify({ quantity }),
    });
  };

  const deleteCartItem = (cartItemId: number): Promise<Response> =>
    JsonAPI.delete(`${baseUrl}${API_ENDPOINT.CART_ITEMS}/${cartItemId}`);

  const getCosts = async (): Promise<CartPriceData> =>
    JsonAPI.get(`${baseUrl}${API_ENDPOINT.COSTS}`);

  return { getCartList, postCartItem, patchCartItem, deleteCartItem, getCosts };
};

export { getCartAPI };
