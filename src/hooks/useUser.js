import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MESSAGE, ROUTES_PATH, SERVER_PATH, STORAGE_KEY } from '../constants';

const useUser = () => {
  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const signIn = async (email, password) => {
    try {
      const { data } = await axios.post(SERVER_PATH.LOGIN, { email, password });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.accessToken));
      alert(MESSAGE.LOGIN_SUCCESS);
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const signUp = async (email, nickname, password) => {
    try {
      await axios.post(SERVER_PATH.USER, { email, nickname, password });
      alert(MESSAGE.SIGN_UP_SUCCESS);
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const modifyPassword = async (prevPassword, newPassword) => {
    try {
      await axios.patch(
        SERVER_PATH.PASSWORD,
        { prevPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.removeItem(STORAGE_KEY);
      alert(MESSAGE.MODIFY_PASSWORD_SUCCESS);
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const modifyUserInfo = async (nickname) => {
    try {
      await axios.patch(
        SERVER_PATH.USER,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert(MESSAGE.MODIFY_NICKNAME_SUCCESS);
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const removeToken = (message) => {
    localStorage.removeItem(STORAGE_KEY);
    alert(message);
    navigate(ROUTES_PATH.HOME);
    window.location.reload();
  };

  const withdrawMembership = async () => {
    try {
      await axios.delete(SERVER_PATH.USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      removeToken(MESSAGE.WITHDRAW_SUCCESS);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return { signIn, signUp, modifyPassword, modifyUserInfo, withdrawMembership, removeToken };
};

export default useUser;
