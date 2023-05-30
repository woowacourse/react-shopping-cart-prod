import styled from '@emotion/styled';
import CouponItem from '../../box/CouponItem/CouponItem';
import { CouponType } from '../../../types/types';
import useCouponFetch from '../../../hooks/useCouponFetch';
import Button from '../../common/Button/Button';

const CouponList = () => {
  const { allCoupon } = useCouponFetch();

  const coupons: CouponType[] =
    (allCoupon && allCoupon.map(({ issuable, ...coupon }) => coupon)) || [];

  console.log(coupons);
  return (
    <CouponListWrapper>
      {coupons?.map((coupon) => (
        <CouponWrapper key={coupon.id}>
          <CouponItem key={coupon.id} coupon={coupon} />
          <PublishButton key={coupon.id} size="big" text="발급하기" />
        </CouponWrapper>
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

  @media screen and (max-width: 660px) {
    gap: 12px;
  }
`;

const CouponWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-items: center;

  @media screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

const PublishButton = styled(Button)`
  width: 30%;
  @media screen and (max-width: 660px) {
    size: 'big';
    width: 350px;
  }
`;
