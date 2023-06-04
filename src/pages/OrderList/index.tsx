import { Suspense } from 'react';

import SkeletonCartItem from '@Pages/CartList/CartItem/SkeletonCartItem';

import Order from './OrderContents';
import SkeltonPurChasedItems from './PurchasedItems/SkeletonPurChasedItmes';
import * as S from './style';

const OrderList = () => {
  return (
    <>
      <S.Container>
        <S.Title>주문 목록</S.Title>
        <Suspense fallback={<SkeltonPurChasedItems />}>
          <Order />
        </Suspense>
      </S.Container>
      ;
    </>
  );
};

export default OrderList;
