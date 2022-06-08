import axios from 'axios';

import { API_URL } from 'api/constants';

import { ERROR_MESSAGES } from 'constants/messages';

const customInstance = axios.create({
  baseURL: API_URL,
});

const token = window.sessionStorage.getItem('token');
const nickname = window.sessionStorage.getItem('nickname');

if (token !== undefined && nickname !== undefined) {
  customInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const handleAPIError = (error) => {
  const { data, status } = error.response;

  if (data === undefined || status >= 500) {
    throw new Error(ERROR_MESSAGES.UNKNOWN);
  }

  throw new Error(data.message);
};

customInstance.interceptors.response.use((response) => response, handleAPIError);

export default customInstance;
