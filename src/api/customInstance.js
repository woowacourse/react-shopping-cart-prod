import axios from 'axios';

import { API_URLS } from 'api/constants';

import { ERROR_MESSAGES } from 'constants/messages';

const savedServerNumber = window.sessionStorage.getItem('serverNumber') || 0;

export const { url: BASE_URL, name: SERVER_NAME } = API_URLS[Number(savedServerNumber)];

const customInstance = axios.create({
  baseURL: BASE_URL,
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
