import {
  PurchasePropertyWrapper,
  PurchaseText,
  Vacant,
} from '../PurchaseBox/PurchaseBox.style';
import {
  DiscountPropertyWrapper,
  DiscountText,
  DiscountWrapper,
  TotalDiscountText,
} from './PaymentInfo.style';

type PaymentInfoProps = {
  totalPrice: number;
};

const discount = {
  coupon: 9900,
  point: 120,
};

function PaymentInfo({ totalPrice }: PaymentInfoProps) {
  const DELIVERY_FEE = totalPrice > 0 ? 3000 : 0;

  return (
    <>
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 상품가격</PurchaseText>
        <PurchaseText>{totalPrice.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      <DiscountWrapper>
        <PurchasePropertyWrapper>
          <TotalDiscountText>할인</TotalDiscountText>
          <TotalDiscountText>
            -{(discount.coupon + discount.point).toLocaleString()}원
          </TotalDiscountText>
        </PurchasePropertyWrapper>
        <DiscountPropertyWrapper>
          <DiscountText>ㄴ포인트</DiscountText>
          <DiscountText>-{discount.point.toLocaleString()}원</DiscountText>
        </DiscountPropertyWrapper>
        <DiscountPropertyWrapper>
          <DiscountText>ㄴ쿠폰</DiscountText>
          <DiscountText>-{discount.coupon.toLocaleString()}원</DiscountText>
        </DiscountPropertyWrapper>
      </DiscountWrapper>
      <PurchasePropertyWrapper>
        <PurchaseText>배송비</PurchaseText>
        <PurchaseText>+{DELIVERY_FEE.toLocaleString()}원</PurchaseText>
      </PurchasePropertyWrapper>
      <Vacant />
      <PurchasePropertyWrapper>
        <PurchaseText>총 결제 금액</PurchaseText>
        <PurchaseText>
          {(
            totalPrice +
            DELIVERY_FEE -
            discount.coupon -
            discount.point
          ).toLocaleString()}
          원
        </PurchaseText>
      </PurchasePropertyWrapper>
    </>
  );
}

export default PaymentInfo;
