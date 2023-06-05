import { SERVER, ServerKey } from '../constants/server';
import { handleResponseError } from './utils';

const fetchApis = (serverName: ServerKey) => {
  const getUrl = (endpoint?: string) => {
    const baseUrl = SERVER[serverName].url;
    const url = endpoint ? `${baseUrl}${endpoint}` : baseUrl;

    return url;
  };

  const base64 = btoa(
    SERVER[serverName].id + ':' + SERVER[serverName].password
  );

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };

  const fetchRequest = async <T>(
    endpoint: string,
    method: string,
    body?: T
  ) => {
    const url = getUrl(endpoint);
    if (!url) throw new Error('잘못된 요청입니다');

    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    await handleResponseError(response);

    if (method === 'PATCH' || method === 'DELETE') return;

    return method === 'GET'
      ? await response.json()
      : response.headers.get('location');
  };

  const getData = <T>(endpoint: string): Promise<T> =>
    fetchRequest<T>(endpoint, 'GET');

  const postData = <T>(endpoint: string, body: T): Promise<string> =>
    fetchRequest<T>(endpoint, 'POST', body);

  const patchData = <T>(endpoint: string, body: T) =>
    fetchRequest<T>(endpoint, 'PATCH', body);

  const deleteData = <T>(endpoint: string) =>
    fetchRequest<T>(endpoint, 'DELETE');

  return { getData, postData, patchData, deleteData };
};

export default fetchApis;
