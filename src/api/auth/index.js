import apiClient from 'api';
import { getCookie } from 'utils/cookie';

export const duplicateEmailApi = async (email) => {
  await apiClient.get(`/api/members/duplicate-email?email=${email}`, {
    email,
  });
};

export const getAuthorizedHeaders = () => {
  return {
    Authorization: `Bearer ${getCookie('userToken')}`,
  };
};
