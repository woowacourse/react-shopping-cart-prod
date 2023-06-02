import React from 'react';
import ContentLayout from 'components/@common/ContentLayout';
import OrderedItem from 'components/payment/OrderedItem';
import { useGet } from 'hooks/useGet';
import { useParams } from 'react-router-dom';
import PaymentSection from 'components/OrderDetail/PaymentSection';
import { getOrderDetail } from 'api/orders';

const OrderDetail = () => {
  const { id } = useParams();

  const { data: orderDetail, isLoading } = useGet(getOrderDetail(id));

  if (isLoading) return null;

  return (
    <ContentLayout title="주문 상세 내역">
      {orderDetail && <OrderedItem order={orderDetail} />}
      {orderDetail && <PaymentSection orderDetail={orderDetail} />}
    </ContentLayout>
  );
};

export default OrderDetail;
