import { REQUEST_STATUS, REQUEST_TIMEOUT } from 'constants/';

import { getCookie } from './cookieUtils';

const addAccessTokenHeader = (headers = {}) => {
  headers.Authorization = `Bearer ${getCookie('accessToken')}`;
};

const request = async (url, option, { isAccessTokenUsed = false } = {}) => {
  const fetchController = new AbortController();
  const newOption = { ...option, signal: fetchController.signal };

  isAccessTokenUsed === true && addAccessTokenHeader(newOption.headers);

  const timerID = setTimeout(() => fetchController.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(process.env.REACT_APP_API_URL + url, newOption);
    const responseBody = await response.text();

    const jsonBody = responseBody ? JSON.parse(responseBody) : {};
    const responseHeader = Object.fromEntries(response.headers.entries());

    clearTimeout(timerID);

    return {
      status: response.ok ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.FAIL,
      statusCode: response.status,
      header: responseHeader,
      content: jsonBody,
    };
  } catch (error) {
    return {
      status: REQUEST_STATUS.FAIL,
      statusCode: 500,
      content: `서버와의 통신에 실패하였습니다.\n(${error.message})`,
    };
  }
};

export { request };
