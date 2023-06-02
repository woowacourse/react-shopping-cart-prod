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

  const getData = async <T>(endpoint: string): Promise<T> => {
    const url = getUrl(endpoint);
    if (!url) throw new Error('잘못된 요청입니다');

    const response = await fetch(url, { headers });
    await handleResponseError(response);

    return await response.json();
  };

  const postData = async <T>(postingData: T, endpoint: string) => {
    const url = getUrl(endpoint);
    if (!url) throw new Error('잘못된 요청입니다');

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(postingData),
    });

    await handleResponseError(response);

    return response.headers.get('location');
  };

  const patchData = async <T>(patchingData: T, endpoint: string) => {
    const url = getUrl(endpoint);
    if (!url) throw new Error('잘못된 요청입니다');

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(patchingData),
    });

    await handleResponseError(response);
  };

  const deleteData = async <T>(endpoint: string) => {
    const url = getUrl(endpoint);
    if (!url) throw new Error('잘못된 요청입니다');

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    await handleResponseError(response);
  };

  return { getData, postData, patchData, deleteData };
};

export default fetchApis;
