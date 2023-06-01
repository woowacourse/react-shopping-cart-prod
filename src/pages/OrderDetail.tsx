import React from 'react';
import { getMockOrderDetail } from 'api/mockApi';
import ContentLayout from 'components/@common/ContentLayout';
import OrderedItem from 'components/payment/OrderedItem';
import { useGet } from 'hooks/useGet';
import { useParams } from 'react-router-dom';
import PaymentSection from 'components/OrderDetail/PaymentSection';

const OrderDetail = () => {
  const { id } = useParams();
  const { data: orderDetail, isLoading } = useGet(
    getMockOrderDetail(Number(id))
  );

  if (isLoading) return null;

  return (
    <ContentLayout title="주문 상세 내역">
      <OrderedItem order={orderDetail} />
      <PaymentSection orderDetail={orderDetail} />
    </ContentLayout>
  );
};

export default OrderDetail;
