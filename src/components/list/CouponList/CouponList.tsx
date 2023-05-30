import styled from '@emotion/styled';
import CouponItem from '../../box/CouponItem/CouponItem';
import { CouponType } from '../../../types/types';
import useCouponFetch from '../../../hooks/useCouponFetch';

const CouponList = () => {
  const { allCoupon } = useCouponFetch();

  const coupons: CouponType[] =
    (allCoupon && allCoupon.map(({ issuable, ...coupon }) => coupon)) || [];

  console.log(coupons);
  return (
    <CouponListWrapper>
      {coupons?.map((coupon) => (
        <CouponItem key={coupon.id} coupon={coupon} />
      ))}
    </CouponListWrapper>
  );
};

export default CouponList;

const CouponListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
