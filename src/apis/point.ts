import { servers } from '../constants/server';
import type { Point } from '../types/product';
import type { HostNameType } from '../types/server';
import { fetchData } from '../utils/apiUtils';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const fetchPoint = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/points`;

  const response: Point = await fetchData<Point>(URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });

  return response;
};
