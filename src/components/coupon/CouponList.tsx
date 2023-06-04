import { styled } from 'styled-components';
import { RateCouponInfo, FixedCouponInfo } from '../../types';
import CouponItem from './CouponItem';

interface Props {
  totalProductsPrice: number;
  rateCoupons: RateCouponInfo[];
  fixedCoupons: FixedCouponInfo[];
  handleCouponSelect: ({ couponId, discountPrice, minOrderPrice }: Record<string, number>) => void;
}

export default function CouponList({
  totalProductsPrice,
  rateCoupons,
  fixedCoupons,
  handleCouponSelect,
}: Props) {
  return (
    <Style.Container>
      {rateCoupons.map((rateCoupon) => (
        <li key={rateCoupon.id}>
          <CouponItem
            totalProductsPrice={totalProductsPrice}
            couponItemInfo={rateCoupon}
            handleCouponSelect={handleCouponSelect}
          />
        </li>
      ))}
      {fixedCoupons.map((fixedCoupon) => (
        <li key={fixedCoupon.id}>
          <CouponItem
            totalProductsPrice={totalProductsPrice}
            couponItemInfo={fixedCoupon}
            handleCouponSelect={handleCouponSelect}
          />
        </li>
      ))}
    </Style.Container>
  );
}

const Style = {
  Container: styled.ul`
    display: flex;
    flex-direction: column;

    gap: 20px;
  `,
};
