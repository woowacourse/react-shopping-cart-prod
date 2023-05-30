import { SERVER, ServerKey } from '../constants/server';
import type { CartProduct } from '../types/product';
import { getData, mutateData } from './utils';

const cartProductApis = (serverName: ServerKey) => {
  const url = `${SERVER[serverName].url}/cart-items`;

  const base64 = btoa(
    SERVER[serverName].id + ':' + SERVER[serverName].password
  );

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };

  const getCartProducts = () => {
    return getData<CartProduct[]>({ url, headers });
  };

  const postCartProduct = async (id: number) => {
    const response = await mutateData({
      url,
      method: 'POST',
      headers,
      body: { productId: id },
    });

    return response.headers.get('location');
  };

  const patchCartProduct = (id: number, quantity: number) => {
    return mutateData({
      url,
      method: 'PATCH',
      param: id,
      headers,
      body: { quantity },
    });
  };

  const deleteCartProduct = async (id: number) => {
    return mutateData({
      url,
      method: 'DELETE',
      param: id,
      headers,
    });
  };

  return {
    getCartProducts,
    postCartProduct,
    patchCartProduct,
    deleteCartProduct,
  };
};

export default cartProductApis;
