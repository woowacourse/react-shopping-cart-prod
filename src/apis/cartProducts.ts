import { SERVER, ServerKey } from '../constants/server';
import type { CartProduct } from '../types/product';
import { fetchData } from './utils';

const cartProductApis = (serverName: ServerKey) => {
  const url = `${SERVER[serverName].url}/cart-items`;

  const base64 = btoa(
    SERVER[serverName].id + ':' + SERVER[serverName].password
  );

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };

  const getCartProducts = async () => {
    const response = await fetchData({ url, method: 'GET', headers });
    const cartProducts: CartProduct[] = await response.json();
    return cartProducts;
  };

  const postCartProduct = (id: number) =>
    fetchData({
      url,
      method: 'POST',
      headers,
      body: { productId: id },
    }).then((response) => response.headers.get('location'));

  const patchCartProduct = (id: number, quantity: number) =>
    fetchData({
      url,
      method: 'PATCH',
      param: id,
      headers,
      body: { quantity },
    });

  const deleteCartProduct = (id: number) =>
    fetchData({
      url,
      method: 'DELETE',
      param: id,
      headers,
    });

  return {
    getCartProducts,
    postCartProduct,
    patchCartProduct,
    deleteCartProduct,
  };
};

export default cartProductApis;
