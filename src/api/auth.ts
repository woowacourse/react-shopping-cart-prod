import type { ServerNameType } from '../types';

import { BASE_URL_MAP } from '../constants';

export const postLogin = (serverName: ServerNameType, name: string, password: string) => {
  const url = `${BASE_URL_MAP[serverName]}/users/login`;
  const body = JSON.stringify({
    name,
    password,
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
};

export const postJoin = (serverName: ServerNameType, name: string, password: string) => {
  const url = `${BASE_URL_MAP[serverName]}/users/join`;
  const body = JSON.stringify({
    name,
    password,
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
};
