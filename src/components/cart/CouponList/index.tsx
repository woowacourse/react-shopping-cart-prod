import { styled } from 'styled-components';
import { CouponType } from '@type/couponType';
import CouponItem from './CouponItem';

interface CouponListProps {
  coupons: CouponType[];
  onCouponSelect: (coupon: CouponType) => void;
  selectedCoupon: CouponType | null;
}

function CouponList({ coupons, onCouponSelect, selectedCoupon }: CouponListProps) {
  return (
    <Container>
      {coupons.map((coupon) => (
        <CouponItem
          onCouponSelect={() => onCouponSelect(coupon)}
          key={coupon.id}
          condition={coupon.minimumPrice}
          discountValue={coupon.value}
          isSelect={selectedCoupon?.id === coupon.id}
          {...coupon}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 5rem;
`;

export default CouponList;
