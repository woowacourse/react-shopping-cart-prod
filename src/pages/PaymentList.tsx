import ContentLayout from 'components/@common/ContentLayout';
import PaymentItemList from 'components/payment/PaymentItemList';
import React, { Suspense } from 'react';

const PaymentList = () => {
  return (
    <ContentLayout title="주문 목록">
      <Suspense>
        <PaymentItemList />
      </Suspense>
    </ContentLayout>
  );
};

export default PaymentList;
