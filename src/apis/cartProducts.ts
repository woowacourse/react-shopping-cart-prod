import { servers } from '../constants/server';
import { deleteData, fetchData, patchData, postData } from '../utils/apiUtils';
import type { CartProduct } from '../types/product';
import type { HostNameType } from '../types/server';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const cartApi = async (hostName: HostNameType) => {
  const BASE_URL = `${servers[hostName]}/cart-items`;
  const headers = {
    Authorization: `Basic ${base64}`,
  };

  const fetchCartProducts = async () => {
    const response: CartProduct[] = await fetchData<CartProduct[]>(BASE_URL, {
      method: 'GET',
      headers,
    });
    return response;
  };

  const postCartProduct = async (productId: number) => {
    const response = await postData(BASE_URL, headers, { productId });
    return response;
  };

  const patchCartProduct = async (cartItemId: number, quantity: number) => {
    const URL = `${BASE_URL}/${cartItemId}`;

    const response = await patchData(URL, headers, { quantity });
    return response;
  };

  const deleteCartProduct = async (cartItemId: number) => {
    const URL = `${BASE_URL}/${cartItemId}`;

    const response = await deleteData(URL, headers);
    return response;
  };

  return {
    fetchCartProducts,
    postCartProduct,
    patchCartProduct,
    deleteCartProduct,
  };
};
