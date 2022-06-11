import axios from 'axios';
import { getCookie } from '@/utils';

const getUserName = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers/me`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });

    return data.userName;
  } catch (error) {
    alert(error);
  }
};

const removeUserInfo = () => {
  try {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/customers/me`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
  } catch (error) {
    alert(error);
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
  } catch (error) {
    alert(error);
  }
};

export { getUserName, removeUserInfo, updateUserInfo };
