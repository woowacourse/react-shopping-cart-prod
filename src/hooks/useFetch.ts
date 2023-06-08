import { useState, useEffect } from 'react';
import { getSessionStorage } from '../app/utils/storage';
import { SESSION_STORAGE_KEY_BASE64 } from '../app/keys';

interface FetchData<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const useFetch = <T, Body = unknown>(method: Method, url: string, body?: Body): FetchData<T> => {
  const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          Authorization: `Basic ${base64}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('잘못 된 요청입니다.');
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
