import { useState } from 'react';
import { fetchApi } from '../api/fetchApi';

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (url: string, body: RequestInit) => {
    try {
      const data = await fetchApi(url, body);

      return data;
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
        headers: {
          Authorization: 'Basic YkBiLmNvbToxMjM0',
          'Content-Type': 'application/json',
        },
      });
    },
    post: <T>(url: string, body: T) => {
      return fetchData(url, {
        method: 'POST',
        headers: {
          Authorization: 'Basic YkBiLmNvbToxMjM0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
    patch: <T>(url: string, body: T) => {
      return fetchData(url, {
        method: 'PATCH',
        headers: {
          Authorization: 'Basic YkBiLmNvbToxMjM0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
    delete: <T>(url: string, body?: T) => {
      return fetchData(url, {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic YkBiLmNvbToxMjM0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
  };

  return { api, isLoading };
};

export default useFetchData;
