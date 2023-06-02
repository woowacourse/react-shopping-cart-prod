import { AUTH } from '../constants/auth';

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
