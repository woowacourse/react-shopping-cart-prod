import { HttpMethods } from '../types/api';

export const httpRequestWithBase64 = <T>(base64: string, body?: T) => {
  const headers = {
    Authorization: `Basic ${base64}`,
    'Content-Type': 'application/json',
  };

  const fetcher = async <T>(url: string, method: HttpMethods, body?: T) => {
    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    return response;
  };

  const _get = (url: string) => fetcher(url, 'GET');

  const _post = (url: string) => fetcher(url, 'POST', body);

  const _put = (url: string) => fetcher(url, 'PUT', body);

  const _patch = (url: string) => fetcher(url, 'PATCH', body);

  const _delete = (url: string) => fetcher(url, 'DELETE');

  return { _get, _post, _put, _patch, _delete };
};
