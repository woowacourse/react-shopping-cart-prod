import { useLocation } from 'react-router-dom';
import { Layout } from '../layout';

import { useEffect } from 'react';
import { base64 } from '../constants/user';

export const OrderDetail = () => {
  const { state } = useLocation();
  const { orderId } = state;

  useEffect(() => {
    if (orderId)
      fetch(`/order/${orderId}`, {
        method: 'GET',
        headers: { Authorization: `Basic ${base64}` },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
  }, []);

  return <Layout>주문 상세 페이지 {orderId}</Layout>;
};
