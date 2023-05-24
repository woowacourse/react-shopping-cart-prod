import { SERVER, ServerKey } from '../constants/server';
import type { CartProduct } from '../types/product';
import { handleResponseError } from './utils';

const cartProductApis = (serverName: ServerKey, endpoint: string) => {
  const getUrl = (param?: string | number) => {
    const baseUrl = SERVER[serverName].url + endpoint;

    return param ? `${baseUrl}/${param}` : baseUrl;
  };

  const base64 = btoa(
    SERVER[serverName].id + ':' + SERVER[serverName].password
  );

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };

  const getData = async () => {
    const response = await fetch(getUrl(), { headers });

    await handleResponseError(response);

    const data: CartProduct[] = await response.json();

    return data;
  };

  const postData = async (id: number) => {
    const response = await fetch(getUrl(), {
      method: 'POST',
      headers,
      body: JSON.stringify({ productId: id }),
    });

    await handleResponseError(response);

    return response.headers.get('location');
  };

  const patchData = async (id: number, quantity: number) => {
    const response = await fetch(getUrl(id), {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ quantity }),
    });

    await handleResponseError(response);
  };

  const deleteData = async (id: number) => {
    const response = await fetch(getUrl(id), {
      method: 'DELETE',
      headers,
    });

    await handleResponseError(response);
  };

  return { getData, postData, patchData, deleteData };
};

export default cartProductApis;
