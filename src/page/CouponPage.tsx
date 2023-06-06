import { Fragment, useEffect, useState } from 'react';
import * as S from './styles/CouponPage.styles';
import * as api from '../api';
import { useRecoilValue } from 'recoil';
import { serverNameState } from '../atom/serverName';
import { loginState } from '../atom/login';
import { CouponInfo } from '../types';

export default function CouponPage() {
  const serverName = useRecoilValue(serverNameState);
  const loginCredential = useRecoilValue(loginState);
  const [coupons, setCoupons] = useState<CouponInfo[]>([]);

  useEffect(() => {
    api.getCoupon<CouponInfo[]>(serverName, loginCredential).then(setCoupons);
  }, []);

  return (
    <>
      <S.CouponHeader>쿠폰함</S.CouponHeader>
      {coupons.map(({ id, name, discountRate, expiredAt, isUsed }: CouponInfo) =>
        name.includes('신규') ? (
          <Fragment key={id}>
            <S.CouponImage
              src={`./join${discountRate}DiscountCoupon.svg`}
              alt={`신규가입 ${discountRate}% 할인쿠폰`}
              isUsed={isUsed}
            />
            {isUsed ? (
              <S.CouponParagraph>쿠폰을 이미 사용했어요.</S.CouponParagraph>
            ) : (
              <S.CouponParagraph>만료기간 : {expiredAt.split('T')[0]}</S.CouponParagraph>
            )}
          </Fragment>
        ) : (
          <Fragment key={id}>
            <S.CouponImage
              src={`./purchase${discountRate}DiscountCoupon.svg`}
              alt={`첫 구매 감사 ${discountRate}% 할인쿠폰`}
              isUsed={isUsed}
            />
            {isUsed ? (
              <S.CouponParagraph>쿠폰을 이미 사용했어요.</S.CouponParagraph>
            ) : (
              <S.CouponParagraph>만료기간 : {expiredAt.split('T')[0]}</S.CouponParagraph>
            )}
          </Fragment>
        )
      )}
    </>
  );
}
