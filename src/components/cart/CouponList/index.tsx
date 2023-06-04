import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import withAvailableCoupon from '@recoil/coupon/selector/withAvailableCoupon';
import { CouponType } from '@type/couponType';
import CouponItem from './CouponItem';

interface CouponListProps {
  onCouponSelect: (coupon: CouponType) => void;
  selectedCoupon: CouponType | null;
}

function CouponList({ onCouponSelect, selectedCoupon }: CouponListProps) {
  const coupons = useRecoilValue(withAvailableCoupon);

  return (
    <Container>
      {coupons.map((coupon) => (
        <CouponItem
          onCouponSelect={() => onCouponSelect(coupon)}
          key={coupon.id}
          condition={coupon.minimumPrice}
          discountValue={coupon.value}
          selected={selectedCoupon?.id === coupon.id}
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
