import React from 'react';
import ContentLayout from 'components/@common/ContentLayout';
import OrderedItem from 'components/payment/OrderedItem';
import { useGet } from 'hooks/useGet';
import { useParams } from 'react-router-dom';
import PaymentSection from 'components/OrderDetail/PaymentSection';
import { getOrderDetail } from 'api/orders';
import { styled } from 'styled-components';

const OrderDetailPage = () => {
  const { id } = useParams();

  if (!id) return null;

  const { data: orderDetail } = useGet(getOrderDetail(id));

  return (
    <ContentLayout title="주문 상세 내역">
      <Wrapper>
        {orderDetail && <OrderedItem order={orderDetail} />}
        {orderDetail && <PaymentSection orderDetail={orderDetail} />}
      </Wrapper>
    </ContentLayout>
  );
};

export default OrderDetailPage;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;
