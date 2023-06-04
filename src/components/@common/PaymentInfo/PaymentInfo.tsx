import { useRecoilValue } from 'recoil';
import { PurchasePropertyWrapper, PurchaseText, Vacant } from '../../Cart/PurchaseBox/PurchaseBox.style';
import * as S from './PaymentInfo.style';
import { couponState, pointState } from '../../../recoil/orderAtom';
import { useEffect } from 'react';

type PaymentInfoProps = {
  totalPrice: number;
};

function PaymentInfo({ totalPrice }: PaymentInfoProps) {
  const point = useRecoilValue(pointState);
  const couponDiscount = useRecoilValue(couponState);
  const discountPrice = couponDiscount ? couponDiscount.discountPrice : 0;
  const DELIVERY_FEE = totalPrice > 0 ? 3000 : 0;

  return (
    <>
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 상품가격</PurchaseText>
        <PurchaseText>{totalPrice.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      <PurchasePropertyWrapper>
        <PurchaseText>배송비</PurchaseText>
        <PurchaseText>+{DELIVERY_FEE.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      {(Number(point) !== 0 || discountPrice !== 0) && (
        <S.DiscountWrapper>
          <PurchasePropertyWrapper>
            <S.TotalDiscountText>할인</S.TotalDiscountText>
            <S.TotalDiscountText>-{(discountPrice + Number(point)).toLocaleString()}원</S.TotalDiscountText>
          </PurchasePropertyWrapper>
          <S.DiscountPropertyWrapper>
            <S.DiscountText>ㄴ쿠폰</S.DiscountText>
            <S.DiscountText>-{discountPrice.toLocaleString()}원</S.DiscountText>
          </S.DiscountPropertyWrapper>
          <S.DiscountPropertyWrapper>
            <S.DiscountText>ㄴ포인트</S.DiscountText>
            <S.DiscountText>-{Number(point).toLocaleString().toLocaleString()}원</S.DiscountText>
          </S.DiscountPropertyWrapper>
        </S.DiscountWrapper>
      )}
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 결제 금액</PurchaseText>
        <PurchaseText>{(totalPrice + DELIVERY_FEE - discountPrice - Number(point)).toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
    </>
  );
}

export default PaymentInfo;
