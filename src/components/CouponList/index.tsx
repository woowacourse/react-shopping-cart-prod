import { RecoilValue, useRecoilValue } from 'recoil';

import Coupon from '@Components/Coupon';
import SecondaryButton from '@Components/SecondaryButton';

import { CouponType } from '@Types/index';

import notFound from '@Asset/notFound.png';

import * as S from './style';

type CouponListProps<T> = {
  couponState: RecoilValue<T[]>;
  noExistCouponText: string;
  noExistCouponSubText: string;
  couponSubMessage: string;
  type: 'issued' | 'use';
  redirectMessage?: string;
  redirectAction?: () => void;
};

function CouponList<T extends CouponType>({
  couponState,
  noExistCouponText,
  noExistCouponSubText,
  couponSubMessage,
  type,
  redirectMessage,
  redirectAction,
}: CouponListProps<T>) {
  const myCoupons = useRecoilValue(couponState) as T[];

  if (myCoupons.length === 0) {
    return (
      <S.NoExistCouponContainer>
        <S.NoExistCouponImage src={notFound} alt="not found" />
        <S.NoExistCouponText>{noExistCouponText}</S.NoExistCouponText>
        <S.NoExistCouponSubText>{noExistCouponSubText}</S.NoExistCouponSubText>
        {redirectMessage && <SecondaryButton text={redirectMessage} onClick={redirectAction} />}
      </S.NoExistCouponContainer>
    );
  }

  return (
    <S.Container>
      {myCoupons.map((coupon) => (
        <Coupon key={coupon.id} {...coupon} subMessage={couponSubMessage} type={type} />
      ))}
    </S.Container>
  );
}

export default CouponList;
