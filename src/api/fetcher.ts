import { url } from './url';

export const fetchMemberList = ({ server }: { server: string }) => {
  return fetch(`${url[server]}/members`);
};

export const fetchMemberPoint = ({ server, auth }: { server: string; auth: string }) => {
  return fetch(`${url[server]}/point`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
};

export const fetchOrderList = ({ server, auth }: { server: string; auth: string }) => {
  return fetch(`${url[server]}/orders`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
};
