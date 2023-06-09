import { DELIVERY_FEE } from '../../../constants';
import { PurchasePropertyWrapper, PurchaseText, Vacant } from '../../Cart/PurchaseBox/PurchaseBox.style';
import * as S from './PaymentInfo.style';

type PaymentInfoProps = {
  totalPrice: number;
  pointDiscount?: number;
  couponDiscount?: number;
};

function PaymentInfo({ totalPrice, pointDiscount, couponDiscount }: PaymentInfoProps) {
  const deliveryFee = totalPrice > 0 ? DELIVERY_FEE : 0;
  const hasDiscount = pointDiscount !== undefined && couponDiscount !== undefined;
  const finalPrice = hasDiscount ? totalPrice + deliveryFee - pointDiscount - couponDiscount : totalPrice + deliveryFee;

  return (
    <>
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 상품가격</PurchaseText>
        <PurchaseText>{totalPrice.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      <PurchasePropertyWrapper>
        <PurchaseText>배송비</PurchaseText>
        <PurchaseText>+{deliveryFee.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      {hasDiscount && (
        <S.DiscountWrapper>
          <PurchasePropertyWrapper>
            <S.TotalDiscountText>할인</S.TotalDiscountText>
            <S.TotalDiscountText>-{(couponDiscount + pointDiscount).toLocaleString()}원</S.TotalDiscountText>
          </PurchasePropertyWrapper>
          <S.DiscountPropertyWrapper>
            <S.DiscountText>ㄴ쿠폰</S.DiscountText>
            <S.DiscountText>-{couponDiscount.toLocaleString()}원</S.DiscountText>
          </S.DiscountPropertyWrapper>
          <S.DiscountPropertyWrapper>
            <S.DiscountText>ㄴ포인트</S.DiscountText>
            <S.DiscountText>-{pointDiscount.toLocaleString().toLocaleString()}원</S.DiscountText>
          </S.DiscountPropertyWrapper>
        </S.DiscountWrapper>
      )}
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 결제 금액</PurchaseText>
        <PurchaseText>{finalPrice.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
    </>
  );
}

export default PaymentInfo;
