import type { Point } from '../types/point';
import type { HostNameType } from '../types/server';

import { servers } from '../constants/server';
import base64 from './auth';

export const api = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/points`;

  const getPoints = async () => {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const data: Point = await response.json();
    return data;
  };

  return {
    getPoints,
  };
};
