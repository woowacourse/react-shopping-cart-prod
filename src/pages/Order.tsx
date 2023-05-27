import { base64 } from '../constants/user';
import { Layout } from '../layout';
import { useEffect } from 'react';

export const Order = () => {
  useEffect(() => {
    fetch(`/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <Layout>주문목록 보기 페이지</Layout>;
};
