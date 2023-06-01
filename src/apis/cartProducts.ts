import { servers } from '../constants/server';
import { fetchData, postData } from '../utils/apiUtils';
import type { CartProduct } from '../types/product';
import type { HostNameType } from '../types/server';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const cartApi = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/cart-items`;

  const fetchCartProducts = async () => {
    const response: CartProduct[] = await fetchData<CartProduct[]>(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    return response;
  };

  const postCartProduct = async (productId: number) => {
    const headers = {
      Authorization: `Basic ${base64}`,
    };

    const response = await postData(URL, headers, { productId });
    return response;
  };

  const patchCartProduct = async (cartItemId: number, quantity: number) => {
    const response = await fetch(`${URL}/${cartItemId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    return response;
  };

  const deleteCartProduct = async (cartItemId: number) => {
    await fetch(`${URL}/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    fetchCartProducts,
    postCartProduct,
    patchCartProduct,
    deleteCartProduct,
  };
};
