import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Title from '../components/common/Title';
import OrderItemList from '../components/orderList/OrderItemList';
import MainLayout from '../components/PageMainLayout';
import { ORDER_URL } from '../constants/url';
import { useFetchData } from '../hooks/useFetchData';
import { serverState } from '../recoil';
import { OrderList } from '../types';

const OrderPage = () => {
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();

  const [orderList, setOrderList] = useState<OrderList[]>([]);

  useEffect(() => {
    api
      .get(`${server}${ORDER_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setOrderList(data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  return (
    <MainLayout>
      <Title title='주문 목록' />
      <ul>
        {orderList.map((list) => (
          <OrderItemList key={list.orderId} orderList={list} />
        ))}
      </ul>
    </MainLayout>
  );
};

export default OrderPage;
