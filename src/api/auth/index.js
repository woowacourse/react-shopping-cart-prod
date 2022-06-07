import apiClient from 'api';
import { getCookie } from 'utils/cookie';

export const duplicateEmailApi = async (email) => {
  try {
    await apiClient.get(`/api/members/duplicate-email?email=${email}`, {
      email,
    });
  } catch (err) {
    console.log('err', err);
  }
};

export const getAuthorizedHeaders = () => {
  return {
    Authorization: `Bearer ${getCookie('userToken')}`,
  };
};
