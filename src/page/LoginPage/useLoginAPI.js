// @ts-nocheck
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useSnackbar from 'hooks/useSnackbar';

import { getCookie, setCookie } from 'utils/cookie';
import { doLogin } from 'reducers/authReducer';
import { MESSAGE, ROUTES } from 'utils/constants';
import apiClient from 'apis/apiClient';

const useLoginAPI = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: userEmail } = useLocation();

  const [isFulfilled, setIsFulfilled] = useState(false);
  const [email, setEmail] = useState(userEmail || '');
  const [password, setPassword] = useState('');
  const [renderSnackbar] = useSnackbar();

  useEffect(() => {
    if (email.length >= 3 && password.length >= 10) {
      setIsFulfilled(true);
      return;
    }
    setIsFulfilled(false);
  }, [email, password]);

  const login = async () => {
    if (!isFulfilled) return;

    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      const accessToken = response.data.accessToken;

      apiClient.defaults.headers = {
        Authorization: `Bearer ${accessToken}`,
        withCredentials: true,
      };
      setCookie('accessToken', accessToken);
      dispatch(doLogin({ nickname: response.data.nickname }));
      renderSnackbar(`${response.data.nickname}${MESSAGE.LOGIN_SUCCESS}`, 'SUCCESS');
      navigate(ROUTES.HOME);
    } catch (error) {
      const customError = error.response.data;
      navigate(ROUTES.LOGIN);
      renderSnackbar(customError.message, 'FAILED');
    }
  };

  return { email, setEmail, password, setPassword, login, isFulfilled };
};

export default useLoginAPI;
