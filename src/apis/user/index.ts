import axios from 'axios';
import { getCookie } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

const checkUserNameDuplicateAPI = async (userName: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/customers/exists?userName=${userName}`
    );

    return data.isDuplicate;
  } catch {
    alert(ERROR_MESSAGES.REQUEST.CHECK_USER_NAME_DUPLICATE);
  }
};

const getUserNameAPI = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers/me`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });

    return data.userName;
  } catch {
    alert(ERROR_MESSAGES.REQUEST.GET_USER_NAME);
  }
};

const loginAPI = async (userName: string, password: string) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
      userName,
      password,
    });

    return data.accessToken;
  } catch {
    alert(ERROR_MESSAGES.REQUEST.LOGIN);
  }
};

const removeUserInfoAPI = () => {
  try {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/me`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
  } catch {
    alert(ERROR_MESSAGES.REQUEST.LEAVE);
  }
};

const updateUserInfoAPI = (password: string, userName: string) => {
  try {
    axios.put(
      `${process.env.REACT_APP_API_URL}/api/customers/me`,
      { password, userName },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    );
  } catch {
    alert(ERROR_MESSAGES.REQUEST.UPDATE_USER_INFO);
  }
};

export {
  checkUserNameDuplicateAPI,
  getUserNameAPI,
  loginAPI,
  removeUserInfoAPI,
  updateUserInfoAPI,
};
