import axios from 'axios';

import { API_URLS } from 'api/constants';

import { ERROR_MESSAGES } from 'constants/messages';

const savedServerNumber = window.sessionStorage.getItem('serverNumber') || 0;
const SERVER_INDEX = Number(savedServerNumber);

export const BASE_URL = API_URLS[SERVER_INDEX].url;
export const SERVER_NAME = API_URLS[SERVER_INDEX].name;

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

export const getBaseUrl = () => {};

export const setBaseUrl = (index) => {
  customInstance.defaults.baseURL = API_URLS[index].url;
};

export default customInstance;
