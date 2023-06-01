import { fetchApi2 } from '.';
import { ResponseResult } from '../types';

const defaultToken = btoa('a@a.com:1234');

const APIHandler = {
  get: async <T>(url: string, token: string = defaultToken): Promise<ResponseResult<T>> => {
    const options: RequestInit = { method: 'GET', headers: { Authorization: `Basic ${token}` } };
    const responseResult = await fetchApi2<T>(url, options);

    return responseResult;
  },

  post: async <T>(url: string, body: T, token: string = defaultToken) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(body),
    };

    const responseResult = await fetchApi2<T>(url, options);

    return responseResult;
  },

  patch: async <T>(url: string, body: T, token: string = defaultToken) => {
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(body),
    };

    const responseResult = await fetchApi2<T>(url, options);

    return responseResult;
  },

  delete: async <T>(url: string, token: string = defaultToken) => {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const responseResult = await fetchApi2<T>(url, options);

    return responseResult;
  },
};

export default APIHandler;
