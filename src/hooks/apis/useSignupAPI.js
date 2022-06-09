// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSnackbar from '../useSnackbar';
import apiClient from 'apis/apiClient';
import { MESSAGE, ROUTES } from 'utils/constants';

// DONE 4. put 장바구니 내 상품 수량 수정
const useSignupAPI = () => {
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isFulfilled, setIsFulfilled] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  useEffect(() => {
    setIsFulfilled(isEmailCorrect && isNicknameCorrect && isPasswordCorrect);
  }, [email, nickname, password, isEmailCorrect, isNicknameCorrect, isPasswordCorrect]);

  const signup = useCallback(async () => {
    if (!isFulfilled) return;

    try {
      const response = await apiClient.post('/customers', {
        email,
        nickname,
        password,
      });

      renderSnackbar(`${response.data.nickname}${MESSAGE.SIGNUP_SUCCESS}`, 'SUCCESS');
      navigate(ROUTES.LOGIN, { state: response.data.email });
    } catch (error) {
      const customError = error.response.data;
      navigate(ROUTES.LOGIN);
      renderSnackbar(customError.message, 'FAILED');
    }
  }, [email, isFulfilled, navigate, nickname, password, renderSnackbar]);

  return {
    signup,
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    isEmailCorrect,
    setIsEmailCorrect,
    isNicknameCorrect,
    setIsNicknameCorrect,
    isPasswordCorrect,
    setIsPasswordCorrect,
    isFulfilled,
  };
};

export default useSignupAPI;
