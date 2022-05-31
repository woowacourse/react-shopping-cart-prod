import apiInstance from 'api/customInstance';
import { API_ENDPOINT } from 'api/constants';

export const checkEmailDuplicate = async (email) => {
  const response = await apiInstance.get(API_ENDPOINT.USER, {
    params: {
      email,
    },
  });

  const { success } = response.data;

  return success;
};
// export const postUser = async (userData) => {
//   await
// }
