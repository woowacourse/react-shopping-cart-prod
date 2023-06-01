import { useModal } from 'noah-modal';
import { useRecoilValue } from 'recoil';

import HelperMessage from '@Components/HelperMessage';
import SecondaryButton from '@Components/SecondaryButton';

import convert from '@Utils/convert';

import orderAmountState from '@Selector/orderAmountState';

import * as S from './style';
import OrderDetailSheet from '../OrderDetailSheet';

function DiscountSheet() {
  const { openModal } = useModal();
  const { orderAmount, discountAmount, couponDiscountAmount, allDiscountAmount } = useRecoilValue(orderAmountState);

  const couponHelperMessage =
    convert.toNumberFromLocalPrice(orderAmount) < 50000 ? '적용가능한 쿠폰이 없습니다.' : '적용가능한 쿠폰이 있습니다.';

  const openMyCouponModal = () => {
    if (convert.toNumberFromLocalPrice(orderAmount) < 50000) return alert('쿠폰은 50,000원 이상일 때 적용가능합니다.');

    openModal('myCoupon');
  };

  return (
    <OrderDetailSheet title="할인/쿠폰" hasShownIcon={false}>
      <S.Container>
        <S.DiscountLayout>
          <HelperMessage
            text="특별 할인 이벤트"
            message="10만원 이상 구매시 1%, 30만원 이상 구매시 3%, 50만원 이상 구매시 5%의 할인이 적용됩니다."
          />
          <S.Amount>{discountAmount}</S.Amount>
        </S.DiscountLayout>
        <S.DiscountLayout>
          <HelperMessage
            text={couponHelperMessage}
            message="5만원 이상 구매시 쿠폰을 적용할 수 있습니다. 오른쪽 쿠폰 적용하기에서 적용가능한 쿠폰을 확인하세요."
          />
          {couponDiscountAmount ? (
            <S.AmountWrapper>
              <S.Amount>{couponDiscountAmount}</S.Amount>
              <SecondaryButton text="쿠폰 재선택" onClick={openMyCouponModal} />
            </S.AmountWrapper>
          ) : (
            <SecondaryButton text="쿠폰 적용하기" onClick={openMyCouponModal} />
          )}
        </S.DiscountLayout>
        <S.DiscountLayout>
          <div>총 할인 금액</div>
          <S.Amount>{allDiscountAmount}</S.Amount>
        </S.DiscountLayout>
      </S.Container>
    </OrderDetailSheet>
  );
}

export default DiscountSheet;
