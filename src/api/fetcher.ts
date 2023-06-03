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

export const fetchOrder = ({ server, auth, orderId }: { server: string; auth: string; orderId: string }) => {
  return fetch(`${url[server]}/orders/${orderId}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
};
