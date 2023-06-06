import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { hostNameAtom, orderApiAtom } from '../recoil/hostData';
import OrderProductList from '../components/Order/OrderProductList';
import PaymentInfoBox from '../components/Order/PaymentInfoBox';
import Title from '../components/Common/Title';
import type { OrderedProduct } from '../types/product';

const OrderDetailsPage = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const orderApiInstance = useRecoilValue(orderApiAtom);
  const [orderDetails, setOrderDetails] = useState<OrderedProduct | null>(null);
  const { orderId } = useParams<{ orderId?: string }>();
  const currentOrderId = orderId!;

  useEffect(() => {
    orderApiInstance.fetchOrderDetailsProduct(currentOrderId).then((data) => {
      setOrderDetails(data);
    });
  }, [hostName]);

  return (
    <Main>
      <Title>주문 내역 상세</Title>
      {orderDetails && (
        <>
          <OrderProductList orderProducts={orderDetails} />
          <PaymentInfoBox totalPrice={orderDetails.totalPrice} />
        </>
      )}
    </Main>
  );
};

const Main = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 10px 100px 10px;
`;

export default OrderDetailsPage;
