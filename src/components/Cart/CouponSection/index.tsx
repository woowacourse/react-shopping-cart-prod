import React from 'react';
import * as S from './CouponSection.styles';
import { useGet } from 'hooks/useGet';
import { getMockCoupons, getMockPriceResult } from 'api/mockApi';
import { CheckBox } from '../CartItem/CartItem.styles';
import { useSetRecoilState } from 'recoil';
import { priceAtom } from 'recoil/cartList';

const CouponSection = () => {
  const { data: coupons } = useGet(getMockCoupons);
  const setPrice = useSetRecoilState(priceAtom);

  const getCouponAppliedPrice = (couponId: number) => async () => {
    const priceData = await getMockPriceResult(couponId)();
    setPrice(priceData);
  };

  return (
    <S.Container>
      <S.Title>쿠폰</S.Title>
      <S.CouponList>
        {coupons?.map((coupon) => (
          <S.CouponWrapper key={coupon.id}>
            <CheckBox
              type="checkbox"
              onChange={getCouponAppliedPrice(coupon.id)}
            />
            <S.CouponName>{coupon.name}</S.CouponName>
          </S.CouponWrapper>
        ))}
      </S.CouponList>
    </S.Container>
  );
};

export default CouponSection;
