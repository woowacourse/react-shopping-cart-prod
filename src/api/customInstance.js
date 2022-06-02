import axios from 'axios';
import { ERROR_MESSAGES } from 'constants/messages';
import { API_URL } from './constants';

const customInstance = axios.create({
  baseURL: API_URL,
});

const token = window.sessionStorage.getItem('token');
const nickname = window.sessionStorage.getItem('nickname');

if (token !== undefined && nickname !== undefined) {
  customInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const handleAPIError = (error) => {
  const { status } = error.response;
  if (status >= 500) {
    throw Error(ERROR_MESSAGES.SERVER_ERROR);
  }
  if (status >= 400) {
    throw Error(ERROR_MESSAGES.INVALID_REQUEST);
  }
  throw Error(ERROR_MESSAGES.UNKNOWN);
};

customInstance.interceptors.response.use((response) => response, handleAPIError);

export default customInstance;
