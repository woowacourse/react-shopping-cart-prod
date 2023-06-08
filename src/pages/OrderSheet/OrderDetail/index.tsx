import { Suspense } from 'react';

import * as S from './style';
import DiscountSheet from '../DiscountSheet';
import DiscountSheetSkeleton from '../DiscountSheet/DiscountSheetSkeleton';
import OrderSheetItems from '../OrderSheetItems';
import OrderSheetItemsLoading from '../OrderSheetItems/OrderSheetItemsLoading';
import ShippingInformation from '../ShippingInformation';
import ShippingInformationSkeleton from '../ShippingInformation/ShippingInformationSkeleton';

type OrderDetailProps = {
  setIsEmptyCartItemsTrue: () => void;
};

function OrderDetail({ setIsEmptyCartItemsTrue }: OrderDetailProps) {
  return (
    <S.Container>
      <Suspense
        fallback={
          <>
            <ShippingInformationSkeleton />
            <OrderSheetItemsLoading />
            <DiscountSheetSkeleton />
          </>
        }
      >
        <ShippingInformation />
        <OrderSheetItems setIsEmptyCartItemsTrue={setIsEmptyCartItemsTrue} />
        <DiscountSheet />
      </Suspense>
    </S.Container>
  );
}

export default OrderDetail;
