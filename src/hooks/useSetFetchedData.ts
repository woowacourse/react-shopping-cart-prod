import { Dispatch, SetStateAction, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';
import { fetchApi } from '../api';

type SetData<T> = SetterOrUpdater<T> | Dispatch<SetStateAction<T>>;

export const useSetFetchedData = <T>(url: string, setData: SetData<T>) => {
  const token = btoa('a@a.com:1234');

  const setFetchedData = useCallback(
    async (url: string, options: RequestInit, baseUrl?: string) => {
      const rawData = await fetchApi(url, options);

      if (options.method !== 'GET') {
        if (!baseUrl) return;

        const reFetchedData = await fetchApi(baseUrl, {
          method: 'GET',
          headers: { Authorization: `Basic ${token}` },
        });
        setData(reFetchedData);
        return;
      }

      setData(rawData);
    },
    [token, setData]
  );

  const api = {
    get: (url: string) =>
      setFetchedData(url, { method: 'GET', headers: { Authorization: `Basic ${token}` } }),
    post: <T>(url: string, body: T, baseUrl: string) => {
      setFetchedData(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
          },
          body: JSON.stringify(body),
        },
        baseUrl
      );
    },
    patch: <T>(url: string, body: T, baseUrl: string) => {
      setFetchedData(
        url,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
          },
          body: JSON.stringify(body),
        },
        baseUrl
      );
    },
    delete: (url: string, baseUrl: string) => {
      setFetchedData(
        url,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
        baseUrl
      );
    },
  };

  return { api };
};
