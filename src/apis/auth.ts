import PATH from 'constants/path';
import { User } from 'types/index';
import { axios } from 'configs/api';
import { getAccessToken } from 'utils/auth';

const authAPI = {
  login: async function (user: User, isKeepLogin: boolean) {
    try {
      const {
        data: { accessToken },
      } = await axios.post(PATH.REQUEST_AUTH_TOKEN, user);

      if (isKeepLogin) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        sessionStorage.setItem('accessToken', accessToken);
      }

      return this.getUserInfo(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  getUserInfo: async function (accessToken = getAccessToken()) {
    try {
      const { data } = await axios.get(PATH.REQUEST_CUSTOMER_ME, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  signup: async function (user: User) {
    try {
      await axios.post(PATH.REQUEST_CUSTOMER, user);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  editUserInfo: async function (user: User) {
    const accessToken = getAccessToken();

    try {
      await axios.put(PATH.REQUEST_CUSTOMER_ME, user, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  deleteUser: async function () {
    const accessToken = getAccessToken();

    try {
      await axios.delete(PATH.REQUEST_CUSTOMER_ME, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
};

export default authAPI;
