import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { hostNameAtom, orderApiAtom } from '../recoil/hostData';
import OrderProductList from '../components/Order/OrderProductList';
import Title from '../components/Common/Title';
import { LG } from '../constants/screenSizes';
import type { OrderedProduct } from '../types/product';

const OrderProductsListPage = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const orderApiInstance = useRecoilValue(orderApiAtom);
  const [orders, setOrders] = useState<OrderedProduct[]>([]);

  useEffect(() => {
    orderApiInstance.fetchOrderProducts().then((data) => {
      setOrders(data);
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
  max-width: ${LG};
  margin: 0 auto;
  padding: 0 10px 100px 10px;
`;

export default OrderProductsListPage;
