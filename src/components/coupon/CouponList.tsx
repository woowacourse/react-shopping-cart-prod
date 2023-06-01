import type { CouponType } from '../../types';

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Coupon from './Coupon';

import { couponsState } from '../../recoil/state';

interface Props {
  selectCoupon?: (coupon: CouponType) => () => void;
}

export default function CouponList({ selectCoupon }: Props) {
  const coupons = useRecoilValue(couponsState);

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
`;
