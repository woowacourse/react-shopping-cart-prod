import { AUTH } from '../constants/auth';

const fetchList = async <T>(baseURL: string, endPoints: string): Promise<T> => {
  const response = await fetch(`${baseURL}${endPoints}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${AUTH}`,
    },
  });
  const list = await response.json();

  return list;
};

export default fetchList;
