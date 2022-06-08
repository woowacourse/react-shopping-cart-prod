import { ACCESS_TOKEN_COOKIE_NAME, REQUEST_STATUS, REQUEST_TIMEOUT } from 'constants/';

import { getCookie } from './cookieUtils';

const addAccessTokenHeader = (requestOptions = {}) => {
  requestOptions.headers.Authorization = `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_NAME)}`;
};

const request = async (url, option, { isAccessTokenUsed = false } = {}) => {
  const fetchController = new AbortController();
  const newOption = { ...option, signal: fetchController.signal };

  if (!newOption.headers) {
    newOption.headers = {};
  }

  isAccessTokenUsed === true && addAccessTokenHeader(newOption);

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
      body: jsonBody,
    };
  } catch (error) {
    return {
      status: REQUEST_STATUS.FAIL,
      statusCode: 500,
      body: { message: `서버와의 통신에 실패하였습니다.\n(${error.message})` },
    };
  }
};

export { request };
