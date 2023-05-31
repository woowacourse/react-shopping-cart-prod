import { servers } from '../constants/server';
import type { Point } from '../types/product';
import type { HostNameType } from '../types/server';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const fetchPoint = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/points`;

  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });

  const data: Point = await response.json();
  return data;
};
