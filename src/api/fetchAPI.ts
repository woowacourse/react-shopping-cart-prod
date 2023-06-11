import { FETCH_DEFAULT_OPTION, FETCH_OPTION_HEADERS_AUTH } from '../constants/api';
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

const JsonAPI = {
  get(endpoint: RequestInfo | URL, withAuth = true, option: RequestInit = FETCH_DEFAULT_OPTION) {
    return fetchAPI(endpoint, {
      method: 'GET',
      ...(withAuth ? { headers: FETCH_OPTION_HEADERS_AUTH } : {}),
      ...option,
    });
  },

  post(endpoint: RequestInfo | URL, withAuth = true, option: RequestInit = FETCH_DEFAULT_OPTION) {
    return fetchAPI(endpoint, {
      method: 'POST',
      ...(withAuth ? { headers: FETCH_OPTION_HEADERS_AUTH } : {}),
      ...option,
    });
  },

  patch(endpoint: RequestInfo | URL, withAuth = true, option: RequestInit = FETCH_DEFAULT_OPTION) {
    return fetchAPI(endpoint, {
      method: 'PATCH',
      ...(withAuth ? { headers: FETCH_OPTION_HEADERS_AUTH } : {}),
      ...option,
    });
  },

  delete(endpoint: RequestInfo | URL, withAuth = true, option: RequestInit = FETCH_DEFAULT_OPTION) {
    return fetchAPI(endpoint, {
      method: 'DELETE',
      ...(withAuth ? { headers: FETCH_OPTION_HEADERS_AUTH } : {}),
      ...option,
    });
  },
};

export { JsonAPI };
