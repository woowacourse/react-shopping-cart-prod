import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { hostNameAtom } from '../recoil/hostData';
import OrderProductList from '../components/Order/OrderProductList';
import PaymentInfoBox from '../components/Order/PaymentInfoBox';
import Title from '../components/Common/Title';
import { orderApi } from '../apis/orderProducts';
import type { OrderedDetails } from '../types/product';

const OrderDetailsPage = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [orderDetails, setOrderDetails] = useState<OrderedDetails | null>(null);
  const { orderId } = useParams<{ orderId?: string }>();
  const currentOrderId = orderId!;

  useEffect(() => {
    orderApi(hostName).then((apiInstance) => {
      apiInstance.fetchOrderDetailsProduct(currentOrderId).then((data) => {
        setOrderDetails(data);
      });
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
  padding: 0 0 100px 0;
`;

export default OrderDetailsPage;
