import { AUTH } from '../constants/auth';

export const fetchOrderList = async <T>(baseURL: string): Promise<T> => {
  const response = await fetch(`${baseURL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${AUTH}`,
    },
  });
  const data = await response.json();

  return data;
};
