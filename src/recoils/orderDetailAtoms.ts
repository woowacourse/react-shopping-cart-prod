import { selectorFamily, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import { OrderDetail } from '../types';

export const orderDetailSelector = selectorFamily<OrderDetail, number>({
  key: 'orderDetailSelector',
  get: (orderId) => async () => {
    const orders = await fetchAPI(`/orders/${orderId}`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return orders;
  },
});

export const useFetchOrderDetail = (orderId: number) =>
  useRecoilValue(orderDetailSelector(orderId));
