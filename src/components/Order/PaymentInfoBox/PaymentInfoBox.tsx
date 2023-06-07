import { Coupon, OrderItem } from '../../../types/types';
import { PaymentInfo } from '../../@common/PaymentInfo';
import * as S from './PaymentInfoBox.style';

type PaymentInfoBoxProps = {
  orderItems: OrderItem[];
  usedCoupons: Coupon[];
  usedPoint: number;
  paymentPrice: number;
};

function PaymentInfoBox({ orderItems, usedCoupons, usedPoint }: PaymentInfoBoxProps) {
  const originalPrice = orderItems.reduce(
    (acc, { productPrice, productQuantity }) => acc + productPrice * productQuantity,
    0
  );

  const calculateCouponDiscount = (usedCoupons: Coupon[]) => {
    if (usedCoupons.length === 0) return 0;

    const { discountAmount, discountPercent } = usedCoupons[0];

    if (discountPercent === 0) return discountAmount;

    return (originalPrice / 100) * discountPercent;
  };

  return (
    <S.Wrapper>
      <S.Title>결제정보</S.Title>
      <S.PaymentInfoWrapper>
        <PaymentInfo
          totalPrice={originalPrice}
          couponDiscount={calculateCouponDiscount(usedCoupons)}
          pointDiscount={usedPoint}
        />
      </S.PaymentInfoWrapper>
    </S.Wrapper>
  );
}

export default PaymentInfoBox;
