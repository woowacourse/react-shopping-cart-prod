import { CartItemResponses, ProductItem } from '../types/types';
import { url } from './url';

export const fetchAddCart = async (server: string, id: number, auth: string) => {
  const response = await fetch(`${url[server]}/cart-items`, {
    method: 'POST',
    body: JSON.stringify({
      productId: id,
    }),
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.ok);
};

export const fetchDeleteCart = async (server: string, id: number, auth: string) => {
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  console.log(response);
};

export const fetchUpdateCart = async (server: string, id: number, quantity: number, auth: string) => {
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      quantity,
    }),
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(response.ok);
};

export const fetchCartList = async (server: string, auth: string) => {
  try {
    const response = await fetch(`${url[server]}/cart-items`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await response.json();
    return data as CartItemResponses;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchProductList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/products`);
    const data: ProductItem[] = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
