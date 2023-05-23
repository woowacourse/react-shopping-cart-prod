import { Dispatch, SetStateAction, useState } from 'react';
import { fetchApi } from '../api/fetchApi';

type SetDataType<T> = Dispatch<SetStateAction<T>>;

export const useFetchData = <T>(setData?: SetDataType<T>) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (url: string, body: RequestInit) => {
    try {
      const data = await fetchApi(url, body);

      if (setData) setData(data);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const api = {
    get: (url: string) => {
      return fetchData(url, {
        method: 'GET',
      });
    },
    post: <T>(url: string, body: T) => {
      return fetchData(url, {
        method: 'POST',
        headers: {
          Authorization: 'Basic YUBhLmNvbToxMjM0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
    patch: <T>(url: string, body: T) => {
      return fetchData(url, {
        method: 'PATCH',
        headers: {
          Authorization: 'Basic YUBhLmNvbToxMjM0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
    delete: <T>(url: string, body: T) => {
      return fetchData(url, {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic YUBhLmNvbToxMjM0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
  };

  return { api, isLoading };
};
