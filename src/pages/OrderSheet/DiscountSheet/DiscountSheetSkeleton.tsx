import HelperMessage from '@Components/HelperMessage';
import SecondaryButton from '@Components/SecondaryButton';

import * as S from './style';
import OrderDetailSheetLayout from '../OrderDetailSheetLayout';

function DiscountSheetSkeleton() {
  return (
    <OrderDetailSheetLayout title="할인/쿠폰" hasShownIcon={false}>
      <S.Container>
        <S.DiscountLayout>
          <HelperMessage
            text="특별 할인 이벤트"
            message="10만원 이상 구매시 1%, 30만원 이상 구매시 3%, 50만원 이상 구매시 5%의 할인이 적용됩니다."
            isLoading={true}
          />
          <S.Amount isLoading={true}>로딩중</S.Amount>
        </S.DiscountLayout>
        <S.DiscountLayout>
          <HelperMessage
            text="로딩중"
            message="5만원 이상 구매시 쿠폰을 적용할 수 있습니다. 오른쪽 쿠폰 적용하기에서 적용가능한 쿠폰을 확인하세요."
            isLoading={true}
          />
          <SecondaryButton text="쿠폰 적용하기" />
        </S.DiscountLayout>
        <S.DiscountLayout>
          <S.Amount isLoading={true}>로딩중</S.Amount>
        </S.DiscountLayout>
      </S.Container>
    </OrderDetailSheetLayout>
  );
}

export default DiscountSheetSkeleton;
