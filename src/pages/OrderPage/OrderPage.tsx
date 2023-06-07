import { Suspense } from 'react';

import PageHeading from '../../components/common/PageHeading/PageHeading';
import { SpinnerContainer } from '../../components/common/SpinnerContainer/SpinnerContainer.styles';
import OrderList from '../../components/order/OrderList/OrderList';
import { useScrollToTop } from '../../hooks/common/useScrollToTop';

const OrderPage = () => {
  useScrollToTop();

  return (
    <>
      <PageHeading>주문 목록</PageHeading>
      <Suspense fallback={<SpinnerContainer />}>
        <OrderList />
      </Suspense>
    </>
  );
};

export default OrderPage;
