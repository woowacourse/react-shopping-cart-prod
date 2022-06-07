import PATH from 'constants/path';
import { User } from 'types/index';
import { axios, axiosWithToken } from 'configs/api';

const authAPI = {
<<<<<<< HEAD
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
=======
  login: async function (user: User) {
    const {
      data: { accessToken },
    } = await axios.post(PATH.REQUEST_AUTH_TOKEN, user);

    sessionStorage.setItem('accessToken', accessToken);
>>>>>>> 83ec576 (refactor: axios interceptors 적용)

    return this.getUserInfo();
  },

  getUserInfo: async function () {
    const { data } = await axiosWithToken.get(PATH.REQUEST_CUSTOMER_ME);

    return data;
  },

  signup: async function (user: User) {
    await axios.post(PATH.REQUEST_CUSTOMER, user);
  },

  editUserInfo: async function (user: User) {
    await axiosWithToken.put(PATH.REQUEST_CUSTOMER_ME, user);

    return this.getUserInfo();
  },

  deleteUser: async function () {
    await axiosWithToken.delete(PATH.REQUEST_CUSTOMER_ME);

<<<<<<< HEAD
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
=======
    sessionStorage.removeItem('accessToken');
>>>>>>> 83ec576 (refactor: axios interceptors 적용)
  },
};

export default authAPI;
