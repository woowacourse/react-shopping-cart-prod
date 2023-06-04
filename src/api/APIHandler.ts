import fetchAPI from './fetchAPI';
import { ResponseResult } from '../types';

const defaultToken = btoa('b@b.com:1234');

const APIHandler = {
  get: async <T>(url: string, token: string = defaultToken): Promise<ResponseResult<T>> => {
    // console.log('get 요청을 보냈습니다.');

    const options: RequestInit = { method: 'GET', headers: { Authorization: `Basic ${token}` } };
    const responseResult = await fetchAPI<T>(url, options);
    // console.log('get에 대한 응답을 받았습니다.', responseResult.statusCode);

    return responseResult;
  },

  post: async <T>(url: string, body: T, token: string = defaultToken) => {
    // console.log('post 요청을 보냈습니다.');
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(body),
    };

    // console.log('post요청 options', options);
    // console.log('post요청 options.header', options.headers);
    // console.log('post요청 options.body', options.body);

    const responseResult = await fetchAPI<T>(url, options);
    // console.log('post에 대한 응답을 받았습니다.', responseResult.statusCode);
    // console.log('post에 대한 응답을 받았습니다.', responseResult.errorMessage);

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

    const responseResult = await fetchAPI<T>(url, options);

    return responseResult;
  },

  delete: async <T>(url: string, token: string = defaultToken) => {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const responseResult = await fetchAPI<T>(url, options);

    return responseResult;
  },
};

export default APIHandler;
