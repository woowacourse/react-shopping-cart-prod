import React from 'react';
import ContentLayout from 'components/@common/ContentLayout';
import OrderedItem from 'components/payment/OrderedItem';
import { useGet } from 'hooks/useGet';
import { useParams } from 'react-router-dom';
import PaymentSection from 'components/OrderDetail/PaymentSection';
import { getOrderDetail } from 'api/orders';

const OrderDetail = () => {
  const { id } = useParams();

  if (!id) return null;

  const { data: orderDetail, isLoading } = useGet(getOrderDetail(id));

  if (isLoading) return null;

  return (
    <ContentLayout title="주문 상세 내역">
      <OrderedItem order={orderDetail} />
      <PaymentSection orderDetail={orderDetail} />
    </ContentLayout>
  );
};

export default OrderDetail;
