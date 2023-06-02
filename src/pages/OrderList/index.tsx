import { Suspense } from 'react';

import Order from './OrderContents';
import * as S from './style';

const OrderList = () => {
  return (
    <>
      <S.Container>
        <S.Title>주문 목록</S.Title>
        <Suspense>
          <Order />
        </Suspense>
      </S.Container>
      ;
    </>
  );
};

export default OrderList;
