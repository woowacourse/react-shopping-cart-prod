import axios from 'axios';

import { API_URL } from 'api/constants';

import { ERROR_MESSAGES } from 'constants/messages';

const customInstance = axios.create({
  baseURL: API_URL[window.sessionStorage.getItem('server')],
});

const token = window.sessionStorage.getItem('token');
const nickname = window.sessionStorage.getItem('nickname');

export const setServerUrl = (index) => {
  customInstance.defaults.baseURL = API_URL[index];
  window.sessionStorage.setItem('server', index);
};

if (token !== null && nickname !== null) {
  customInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const handleAPIError = (error) => {
  const { status, data } = error.response;

  if (status >= 500) {
    throw Error(ERROR_MESSAGES.SERVER_ERROR);
  }
  if (status >= 400) {
    throw Error(data.message);
  }
  throw Error(ERROR_MESSAGES.UNKNOWN);
};

customInstance.interceptors.response.use((response) => response, handleAPIError);

export default customInstance;
