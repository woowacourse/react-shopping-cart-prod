import { FETCH_DEFAULT_OPTION } from '../constants/api';
import HTTPError from './HTTPError';
import { handleAPIError } from './apiError';

const fetchAPI = async (
  endpoint: RequestInfo | URL,
  option: RequestInit = FETCH_DEFAULT_OPTION
) => {
  try {
    const response = await fetch(`${endpoint}`, option);

    if (!response.ok) handleAPIError(response.status);

    const contentType = response.headers.get('content-type');

    if (!contentType && response.ok) return response;

    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }

    alert(error);
  }
};

export { fetchAPI };
