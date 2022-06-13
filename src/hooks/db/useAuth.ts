// @ts-nocheck
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getCookie } from 'utils/cookie';

const useAuth = () => {
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

  return {
    nickname,
    isAuthenticated,
    isLoading,
    signupAPI,
    loginAPI,
    getAccountAPI,
    deleteAccountAPI,
    updateNicknameAPI,
    updatePasswordAPI,
  };
};

export default useAuth;
