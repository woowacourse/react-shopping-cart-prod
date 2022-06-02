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
};

export default authAPI;
