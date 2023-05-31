import { PurchasePropertyWrapper, PurchaseText, Vacant } from '../../Cart/PriceCounter/PurchaseBox/PurchaseBox.style';
import * as S from './PaymentInfo.style';

type PaymentInfoProps = {
  totalPrice: number;
  point: string;
};

const discount = {
  coupon: 9900,
};

function PaymentInfo({ totalPrice, point }: PaymentInfoProps) {
  const DELIVERY_FEE = totalPrice > 0 ? 3000 : 0;

  return (
    <>
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 상품가격</PurchaseText>
        <PurchaseText>{totalPrice.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      <S.DiscountWrapper>
        <PurchasePropertyWrapper>
          <S.TotalDiscountText>할인</S.TotalDiscountText>
          <S.TotalDiscountText>-{(discount.coupon + Number(point)).toLocaleString()}원</S.TotalDiscountText>
        </PurchasePropertyWrapper>
        <S.DiscountPropertyWrapper>
          <S.DiscountText>ㄴ포인트</S.DiscountText>
          <S.DiscountText>-{Number(point).toLocaleString().toLocaleString()}원</S.DiscountText>
        </S.DiscountPropertyWrapper>
        <S.DiscountPropertyWrapper>
          <S.DiscountText>ㄴ쿠폰</S.DiscountText>
          <S.DiscountText>-{discount.coupon.toLocaleString()}원</S.DiscountText>
        </S.DiscountPropertyWrapper>
      </S.DiscountWrapper>
      <PurchasePropertyWrapper>
        <PurchaseText>배송비</PurchaseText>
        <PurchaseText>+{DELIVERY_FEE.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 결제 금액</PurchaseText>
        <PurchaseText>{(totalPrice + DELIVERY_FEE - discount.coupon - Number(point)).toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
    </>
  );
}

export default PaymentInfo;
