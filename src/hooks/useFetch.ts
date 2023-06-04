import { useRecoilValue } from 'recoil';
import { baseURLSelector } from '../store/server';
import { AUTH } from '../constants/auth';
import { useCallback } from 'react';
import { END_POINTS } from '../constants/endPoints';
import { FetchMethod } from '../types/request';
import { loginState } from '../store/loginState';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/path';

type EndPointKeys = (typeof END_POINTS)[keyof typeof END_POINTS];

const useFetch = (endPoint: EndPointKeys) => {
  const baseURL = useRecoilValue(baseURLSelector);
  const isSignedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  const handleFetch = useCallback(
    async (method: FetchMethod, body: {}, id?: number) => {
      if (!isSignedIn) {
        navigate(PATH.SIGN_IN);
        throw new Error('로그인을 먼저 해주세요.');
      }
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

      if (!response.ok) throw new Error('');

      const data = await response.text();
      if (!data) return null;

      return await response.json();
    },
    [baseURL, endPoint, isSignedIn]
  );

  return { handleFetch };
};

export default useFetch;
