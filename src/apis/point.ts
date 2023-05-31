import { servers } from '../constants/server';
import type { Point } from '../types/point';
import type { HostNameType } from '../types/server';

export const getPoints = async (hostName: HostNameType) => {
  const hostURL = servers[hostName];
  const response = await fetch(`${hostURL}/points`);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const data: Point = await response.json();
  return data;
};
