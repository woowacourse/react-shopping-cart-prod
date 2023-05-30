import { RecoilValue, useRecoilValue } from 'recoil';

import Coupon from '@Components/Coupon';

import { CouponType } from '@Types/index';

import notFound from '@Asset/notFound.png';

import * as S from './style';

type CouponListProps<T> = {
  couponState: RecoilValue<T[]>;
  noExistCouponText: string;
  noExistCouponSubText: string;
  couponSubMessage: string;
  ableIssued?: boolean;
};

function CouponList<T extends CouponType>({
  couponState,
  noExistCouponText,
  noExistCouponSubText,
  couponSubMessage,
  ableIssued = false,
}: CouponListProps<T>) {
  const myCoupons = useRecoilValue(couponState) as T[];

  if (myCoupons.length === 0) {
    return (
      <S.NoExistCouponContainer>
        <S.NoExistCouponImage src={notFound} alt="not found" />
        <S.NoExistCouponText>{noExistCouponText}</S.NoExistCouponText>
        <S.NoExistCouponSubText>{noExistCouponSubText}</S.NoExistCouponSubText>
      </S.NoExistCouponContainer>
    );
  }

  return (
    <S.Container>
      {myCoupons.map((coupon) => (
        <Coupon key={coupon.id} {...coupon} subMessage={couponSubMessage} ableIssued={ableIssued} />
      ))}
    </S.Container>
  );
}

export default CouponList;
