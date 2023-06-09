import ContentLayout from 'components/@common/ContentLayout';
import Spinner from 'components/@common/Spinner';
import OrderedItemList from 'components/payment/OrderedItemList';
import React, { Suspense } from 'react';

const OrderListPage = () => {
  return (
    <ContentLayout title="주문 목록">
      <Suspense fallback={<Spinner />}>
        <OrderedItemList />
      </Suspense>
    </ContentLayout>
  );
};

export default OrderListPage;
