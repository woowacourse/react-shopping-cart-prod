import { servers } from '../constants/server';
import type { CartProduct } from '../types/product';
import type { HostNameType } from '../types/server';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const api = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/cart-items`;

  const fetchCartProducts = async () => {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    const data: CartProduct[] = await response.json();
    return data;
  };

  const postCartProduct = async (productId: number) => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const location = response.headers.get('location');

    if (location !== null) {
      const lastSlashIndex = location.lastIndexOf('/');
      const cartItemId = location.slice(lastSlashIndex + 1);
      return cartItemId;
    }
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
