import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { hostNameAtom } from '../recoil/hostData';
import OrderProductList from '../components/Order/OrderProductList';
import Title from '../components/Common/Title';
import { orderApi } from '../apis/orderProducts';
import type { OrderDetails } from '../types/product';

const OrderProductsListPage = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    orderApi(hostName).then((apiInstance) => {
      apiInstance.fetchOrderProducts().then((data) => {
        setOrders(data);
      });
    });
  }, [hostName]);

  return (
    <Main>
      <Title>주문 목록</Title>
      {orders.map((order) => (
        <OrderProductList
          orderProducts={order}
          key={order.orderId}
          showDetailsLink
        />
      ))}
    </Main>
  );
};

const Main = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 100px 0;
`;

export default OrderProductsListPage;
