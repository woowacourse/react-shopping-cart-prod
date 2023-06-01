import { useRecoilValue } from 'recoil';
import { baseURLSelector } from '../store/server';
import { AUTH } from '../constants/auth';
import { useCallback } from 'react';
import { END_POINTS } from '../constants/endPoints';

export type FetchMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type EndPointKeys = (typeof END_POINTS)[keyof typeof END_POINTS];

const useFetch = (endPoint: EndPointKeys) => {
  const baseURL = useRecoilValue(baseURLSelector);

  const handleFetch = useCallback(
    async (method: FetchMethod, body: {}, id?: number) => {
      const response = await fetch(
        `${baseURL}${endPoint}${id ? `/${id}` : ''}`,
        {
          method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Basic ${AUTH}`,
          },
        }
      );

      if (!response.ok) throw new Error(`error code : ${response.status}`);

      const data = await response.text();
      if (!data) return null;
      return JSON.parse(data);
    },
    [baseURL, endPoint]
  );

  return { handleFetch };
};

export default useFetch;
