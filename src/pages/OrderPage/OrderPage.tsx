import { Suspense } from 'react';
import OrderList from '../../components/OrderPage/OrderList';
import * as S from './OrderPage.styles';

const OrderPage = () => {
  return (
    <S.Root>
      <Suspense>
        <OrderList />
      </Suspense>
    </S.Root>
  );
};

export default OrderPage;
