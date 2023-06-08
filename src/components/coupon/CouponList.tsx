import type { CouponType } from '../../types';

import styled from 'styled-components';

import Coupon from './Coupon';

interface Props {
  coupons: CouponType[];
  selectCoupon?: (coupon: CouponType) => () => void;
}

export default function CouponList({ coupons, selectCoupon }: Props) {
  return (
    <Wrapper>
      {coupons.map((coupon) => (
        <Coupon {...coupon} onClick={selectCoupon && selectCoupon(coupon)} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 352px);
  grid-column-gap: 48px;
  grid-row-gap: 64px;

  height: 448px;
  padding-top: 8px;

  overflow: scroll;

  @media (max-width: 448px) {
    grid-template-columns: repeat(1, 264px);
  }
`;
