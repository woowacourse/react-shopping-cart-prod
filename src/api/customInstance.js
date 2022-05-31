import axios from 'axios';
import { ERROR_MESSAGES } from 'constants/messages';
import { API_URL } from './constants';

const apiInstance = axios.create({
  baseURL: API_URL,
});

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

apiInstance.interceptors.response.use((response) => response, handleAPIError);

export default apiInstance;
