import { Suspense } from 'react';

import * as S from './style';
import DiscountSheet from '../DiscountSheet';
import OrderSheetItems from '../OrderSheetItems';

function OrderDetail() {
  return (
    <S.Container>
      <Suspense fallback={<div></div>}>
        <OrderSheetItems />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <DiscountSheet />
      </Suspense>
    </S.Container>
  );
}

export default OrderDetail;
