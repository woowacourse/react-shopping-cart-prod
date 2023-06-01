import type { postDataType } from '../types/fetch';

export const fetchData = async <T,>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const data: T = await response.json();
  return data;
};

export const postData = async (
  url: string,
  headers: HeadersInit,
  data: postDataType
): Promise<string> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const location = response.headers.get('location');

  if (location !== null) {
    const lastSlashIndex = location.lastIndexOf('/');
    const orderId = location.slice(lastSlashIndex + 1);
    return orderId;
  }

  throw new Error('Location이 없습니다');
};
