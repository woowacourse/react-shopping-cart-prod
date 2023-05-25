import { Dispatch, SetStateAction, useState } from 'react';
import { fetchApi } from '../api/fetchApi';
import { CART_BASE_URL } from '../constants/url';
import { useRecoilValue } from 'recoil';
import { serverState } from '../store/ServerState';

type SetDataType<T> = Dispatch<SetStateAction<T>>;

export const useFetchData = <T>(setData?: SetDataType<T>) => {
  const [isLoading, setIsLoading] = useState(true);

  const serverUrl = useRecoilValue(serverState);

  const email = 'a@a.com';
  const password = '1234';
  const base64 = btoa(`${email}:${password}`);

  const fetchData = async (url: string, options: RequestInit, baseUrl?: string) => {
    try {
      const data = await fetchApi(url, options);

      if (options.method !== 'GET') {
        if (!baseUrl) return;

        const refetchData = await fetchApi(`${serverUrl}${baseUrl}`, {
          method: 'GET',
          headers: {
            Authorization: `basic ${base64}`,
          },
        });

        if (setData) setData(refetchData);
        return;
      }

      if (setData) setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const api = {
    get: (url: string) => {
      url.includes(CART_BASE_URL)
        ? fetchData(url, {
            method: 'GET',
            headers: {
              Authorization: `basic ${base64}`,
            },
          })
        : fetchData(url, {
            method: 'GET',
          });
    },
    post: <T>(url: string, body: T, baseUrl: string) => {
      fetchData(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': `application/json`,
            Authorization: `basic ${base64}`,
          },
          body: JSON.stringify(body),
        },
        baseUrl,
      );
    },
    patch: <T>(url: string, body: T, baseUrl: string) => {
      fetchData(
        url,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `basic ${base64}`,
          },
          body: JSON.stringify(body),
        },
        baseUrl,
      );
    },
    delete: (url: string, baseUrl: string) => {
      fetchData(
        url,
        {
          method: 'DELETE',
          headers: {
            Authorization: `basic ${base64}`,
          },
        },
        baseUrl,
      );
    },
  };

  return { api, isLoading };
};
