import axios from 'axios';
import { getCookie } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

const getUserName = async () => {
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

const removeUserInfo = () => {
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

const updateUserInfo = (password: string, userName: string) => {
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

export { getUserName, removeUserInfo, updateUserInfo };
