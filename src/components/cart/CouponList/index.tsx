import { styled } from 'styled-components';
import { CouponType } from '@type/couponType';
import CouponItem from './CouponItem';

interface CouponListProps {
  coupons: CouponType[];
}

function CouponList({ coupons }: CouponListProps) {
  return (
    <Container>
      {coupons.map((coupon) => (
        <CouponItem
          key={coupon.id}
          condition={coupon.minimumPrice}
          discountValue={coupon.value}
          isSelect={true}
          {...coupon}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 5rem;
`;

export default CouponList;
