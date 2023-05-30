import ContentLayout from 'components/@common/ContentLayout';
import OrderedItemList from 'components/payment/OrderedItemList';
import React, { Suspense } from 'react';

const OrderedList = () => {
  return (
    <ContentLayout title="주문 목록">
      <Suspense>
        <OrderedItemList />
      </Suspense>
    </ContentLayout>
  );
};

export default OrderedList;
