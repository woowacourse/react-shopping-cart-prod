// @ts-nocheck
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCookie, getCookie, deleteCookie } from 'utils/cookie';
import { doInitializeCart } from 'modules/cart';
import { doChangeNickname, doLogout, doLogin } from 'modules/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const { nickname, isAuthenticated, isLoading } = useSelector(state => state.authReducer);

  const signupAPI = async (email, nickname, password) => {
    const response = await axios.post('/customers', {
      email,
      nickname,
      password,
    });

    return response.data;
  };

  const loginAPI = async (email, password) => {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  };

  const getAccountAPI = async () => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;

    const response = await axios.get('/customers', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const deleteAccountAPI = async password => {
    const accessToken = getCookie('accessToken');

    const response = await axios.delete('/customers', {
      data: {
        password,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const updateNicknameAPI = async nickname => {
    const accessToken = getCookie('accessToken');

    const response = await axios.patch(
      '/customers/profile',
      {
        nickname,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  };

  const updatePasswordAPI = async (password, newPassword) => {
    const accessToken = getCookie('accessToken');

    const response = await axios.patch(
      '/customers/password',
      {
        password,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  };

  const deleteAccount = async (
    password: string,
    handleSuccess?: Function,
    handleError?: Function,
  ) => {
    try {
      await deleteAccountAPI(password);

      logout();
      handleSuccess?.();
    } catch (error) {
      handleError?.(error);
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
    handleSuccess?: Function,
    handleError?: Function,
  ) => {
    try {
      await updatePasswordAPI(currentPassword, newPassword);

      logout();
      handleSuccess?.();
    } catch (error) {
      handleError?.(error);
    }
  };

  const updateNickname = async (
    nickname: string,
    handleSuccess?: Function,
    handleError?: Function,
  ) => {
    try {
      const response = await updateNicknameAPI(nickname);
      dispatch(doChangeNickname({ nickname: response.nickname }));

      handleSuccess?.();
    } catch (error) {
      handleError?.(error);
    }
  };

  const login = async (email: string, password: string, handleSuccess?: Function) => {
    try {
      const { accessToken, nickname } = await loginAPI(email, password);

      setCookie('accessToken', accessToken);
      dispatch(doLogin({ nickname }));

      handleSuccess?.(nickname);
    } catch (error) {}
  };

  const logout = (callback?: Function) => {
    deleteCookie('accessToken');
    dispatch(doInitializeCart());
    dispatch(doLogout());
    callback?.();
  };

  return {
    nickname,
    isAuthenticated,
    isLoading,
    deleteAccount,
    updatePassword,
    updateNickname,
    login,
    logout,
    signupAPI,
    loginAPI,
    getAccountAPI,
    deleteAccountAPI,
    updateNicknameAPI,
    updatePasswordAPI,
  };
};

export default useAuth;
