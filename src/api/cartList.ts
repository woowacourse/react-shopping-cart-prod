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
