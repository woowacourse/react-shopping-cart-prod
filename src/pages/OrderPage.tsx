import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import OrderItem from '../components/OrderItem';
import { ORDER_URL } from '../constants/url';
import useFetchData from '../hooks/useFetchData';
import { serverState } from '../recoil';
import { Order } from '../types';

const OrderPage = () => {
  const server = useRecoilValue(serverState);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { api } = useFetchData();

  useEffect(() => {
    api
      .get(`${server}${ORDER_URL}`)
      .then((data) => {
        const orders = data.sort((a: any, b: any) => b.orderId - a.orderId);
        setOrders(orders);
      })
      .catch((error) => alert(error));
  }, [server]);

  if (!orders) return <div>없는 주문 번호입니다.</div>;

  return (
    <StyledMain>
      <Title>주문 목록</Title>
      <List>
        {orders.map((order) => (
          <OrderItem key={order.orderId} {...order} />
        ))}
      </List>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1270px) {
    padding: 0 36px;
  }

  @media (max-width: 420px) {
    padding: 0 28px;
  }
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 4px solid var(--text-color);
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: var(--text-color);
`;

const List = styled.ol`
  @media (max-width: 1270px) {
    flex-direction: column;
    margin-right: 0;

    & section {
      max-width: 100%;
    }

    & section:last-child {
      margin: 30px 0 80px;
    }
  }
`;

export default OrderPage;
