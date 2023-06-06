import { useRef } from 'react';
import { END_POINTS } from '../constants/endPoints';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { baseURLSelector } from '../store/server';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/path';
import { loginState, tokenAtom } from '../store/loginState';

const useSignIn = () => {
  const baseURL = useRecoilValue(baseURLSelector);
  const setIsSignedIn = useSetRecoilState(loginState);
  const setToken = useSetRecoilState(tokenAtom);

  const idRef = useRef('');
  const passwordRef = useRef('');

  const navigate = useNavigate();

  const onChageId = (e: React.ChangeEvent<HTMLInputElement>) => {
    idRef.current = e.target.value;
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    passwordRef.current = e.target.value;
  };

  const onClickSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const body = { id: idRef, password: passwordRef };
      const token = await handleFetch(body);

      setIsSignedIn(() => true);
      setToken(() => token);

      navigate(PATH.PRODUCT_PAGE);
    } catch (error) {
      alert('로그인 요청이 실패했습니다.');
    }
  };

  const handleFetch = async (body: {}) => {
    const response = await fetch(`${baseURL}${END_POINTS.SIGN_IN}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'formData',
      },
    });

    if (!response.ok) throw new Error('');

    const data = await response.text();
    if (!data) return null;

    return await response.json();
  };

  return { onChageId, onChangePassword, onClickSubmit };
};

export default useSignIn;
