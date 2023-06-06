import type { ServerNameType } from '../types';

import { BASE_URL_MAP } from '../constants';

const fetcher =
  (serverName: ServerNameType, token?: string) =>
  async <T>(method: string, path: string, body?: object): Promise<T> => {
    const url = `${BASE_URL_MAP[serverName]}/${path}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Basic ${token}`;

    const init: RequestInit = {
      method,
      headers,
    };
    if (body) init.body = JSON.stringify(body);

    const response = await fetch(url, init);

    if (!response.ok) throw new Error(`${method} ${url} response not ok`);
    return response.json();
  };

export default fetcher;
