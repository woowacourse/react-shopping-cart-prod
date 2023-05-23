import { SERVER, ServerKey } from '../constants/server';
import { handleResponseError } from './utils';

const productApis = (serverName: ServerKey, endpoint: string) => {
  const getUrl = (param?: string) => {
    const baseUrl = SERVER[serverName].url + endpoint;

    return param ? `${baseUrl}/${param}` : baseUrl;
  };

  const getData = async <T>() => {
    const response = await fetch(getUrl());

    await handleResponseError(response);

    const data: T = await response.json();
    return data;
  };

  return { getData };
};

export default productApis;
