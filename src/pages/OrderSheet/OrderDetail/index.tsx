import { Suspense } from 'react';

import * as S from './style';
import DiscountSheet from '../DiscountSheet';
import OrderSheetItems from '../OrderSheetItems';
import ShippingInformation from '../ShippingInformation';

type OrderDetailProps = {
  setIsEmptyCartItemsTrue: () => void;
};

function OrderDetail({ setIsEmptyCartItemsTrue }: OrderDetailProps) {
  return (
    <S.Container>
      <Suspense fallback={<></>}>
        <ShippingInformation />
        <OrderSheetItems setIsEmptyCartItemsTrue={setIsEmptyCartItemsTrue} />
        <DiscountSheet />
      </Suspense>
    </S.Container>
  );
}

export default OrderDetail;
