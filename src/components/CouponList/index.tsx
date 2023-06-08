import { RecoilValue, useRecoilValue } from 'recoil';

import Coupon from '@Components/Coupon';
import SecondaryButton from '@Components/SecondaryButton';

import { CouponType } from '@Types/index';

import selectedCouponIdState from '@Atoms/selectedCouponIdState';

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
  const coupons = useRecoilValue(couponState) as T[];
  const selectedCouponId = useRecoilValue(selectedCouponIdState);

  if (coupons.length === 0) {
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
      {coupons.map((coupon) => (
        <Coupon
          key={coupon.id}
          {...coupon}
          subMessage={couponSubMessage}
          type={type}
          isSelected={selectedCouponId === coupon.id}
        />
      ))}
    </S.Container>
  );
}

export default CouponList;
