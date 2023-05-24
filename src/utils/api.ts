import { FetchArgs } from '@Types/index';

import { ERROR_MESSAGE, SERVERS } from '@Constants/index';

export const fetchData = async <T>({ url, method, body, server }: FetchArgs): Promise<T> => {
  const email = SERVERS[server].email;
  const password = SERVERS[server].password;

  const base64 = btoa(email + ':' + password);

  let response;
  if (!body) {
    response = await fetch(`${SERVERS[server].apiUrl}${url}`, {
      method,
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
  } else {
    response = await fetch(`${SERVERS[server].apiUrl}${url}`, {
      method,
      body,
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });
  }

  if (response.status === 400) throw new Error(ERROR_MESSAGE[400]);
  if (response.status === 401) throw new Error(ERROR_MESSAGE[401]);
  if (response.status === 403) throw new Error(ERROR_MESSAGE[403]);
  if (response.status === 404) throw new Error(ERROR_MESSAGE[404]);

  if (response.status === 500) throw new Error(ERROR_MESSAGE[500]);

  if (!response.ok) throw new Error(ERROR_MESSAGE.default);

  if (method !== 'GET') return new Promise<T>((res) => res({ ok: true } as T));

  return await response.json();
};
