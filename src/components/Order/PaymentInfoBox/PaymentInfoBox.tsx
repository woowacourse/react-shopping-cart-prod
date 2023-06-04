import { Coupon, OrderItem } from '../../../types/types';
import { PaymentInfo } from '../../@common/PaymentInfo';
import * as S from './PaymentInfoBox.style';

type PaymentInfoBoxProps = {
  orderItems: OrderItem[];
  usedCoupons: Coupon[];
  usedPoint: number;
  paymentPrice: number;
};

function PaymentInfoBox({ orderItems, usedCoupons, usedPoint, paymentPrice }: PaymentInfoBoxProps) {
  const originalPrice = orderItems.reduce(
    (acc, { productPrice, productQuantity }) => acc + productPrice * productQuantity,
    0
  );

  const couponDiscount =
    usedCoupons.length === 0
      ? 0
      : usedCoupons[0].discountPercent === 0
      ? usedCoupons[0].discountAmount
      : (originalPrice / 100) * usedCoupons[0].discountPercent;

  return (
    <S.Wrapper>
      <S.Title>결제정보</S.Title>
      <S.PaymentInfoWrapper>
        <PaymentInfo totalPrice={originalPrice} couponDiscount={couponDiscount} pointDiscount={usedPoint} />
      </S.PaymentInfoWrapper>
    </S.Wrapper>
  );
}

export default PaymentInfoBox;
