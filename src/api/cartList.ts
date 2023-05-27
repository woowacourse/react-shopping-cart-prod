import { AUTH } from '../constants/auth';
import { BASE_URL } from '../constants/baseURL';

export const fetchCartList = async <T>(baseURL: string): Promise<T> => {
  const response = await fetch(`${baseURL}/cart-items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${AUTH}`,
    },
  });
  const data = await response.json();

  return data;
};

export const fetchCartItem = async <T>(id: number): Promise<T> => {
  const response = await fetch(`${BASE_URL.SPLIT}/cart-items/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${AUTH}`,
    },
  });
  const data = await response.json();

  return data;
};

export const updateCartItem = async <T>(
  id: number,
  quantity: number
): Promise<T> => {
  const response = await fetch(`/cart-items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${AUTH}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();

  return data;
};

export const deleteCartItem = async <T>(id: number): Promise<T> => {
  const response = await fetch(`${BASE_URL.SPLIT}/cart-items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${AUTH}`,
    },
  });
  const data = await response.json();

  return data;
};
