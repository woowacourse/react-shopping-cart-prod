import { END_POINTS } from '../constants/endPoints';
import { AUTH } from '../constants/auth';

export const fetchOrderList = async <T>(baseURL: string): Promise<T> => {
  const response = await fetch(`${baseURL}${END_POINTS.ORDERS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${AUTH}`,
    },
  });
  const data = await response.json();

  return data;
};
