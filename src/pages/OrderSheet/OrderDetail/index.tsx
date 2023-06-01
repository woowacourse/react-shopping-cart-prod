import { Suspense } from 'react';

import * as S from './style';
import DiscountSheet from '../DiscountSheet';
import OrderSheetItems from '../OrderSheetItems';
import ShippingInformation from '../ShippingInformation';

function OrderDetail() {
  return (
    <S.Container>
      <Suspense fallback={<div></div>}>
        <ShippingInformation />
        <OrderSheetItems />
        <DiscountSheet />
      </Suspense>
    </S.Container>
  );
}

export default OrderDetail;
