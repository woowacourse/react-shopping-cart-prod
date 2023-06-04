import { OrderRequest } from '../types/types';
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

export const fetchCouponList = ({ server, auth }: { server: string; auth: string }) => {
  return fetch(`${url[server]}/coupons`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
};

export const fetchPostOrder = ({
  server,
  auth,
  bodyData,
}: {
  server: string;
  auth: string;
  bodyData: OrderRequest;
}) => {
  return fetch(`${url[server]}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });
};
