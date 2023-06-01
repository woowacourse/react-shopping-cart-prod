import React from 'react';
import * as S from './CouponSection.styles';
import { useGet } from 'hooks/useGet';
import { getMockCoupons } from 'api/mockApi';
import { CheckBox } from '../CartItem/CartItem.styles';

const CouponSection = () => {
  const { data: coupons } = useGet(getMockCoupons);

  return (
    <S.Container>
      <S.Title>쿠폰</S.Title>
      <S.CouponList>
        {coupons?.map((coupon) => (
          <S.CouponWrapper key={coupon.id}>
            <CheckBox type="checkbox" />
            <S.CouponName>{coupon.name}</S.CouponName>
          </S.CouponWrapper>
        ))}
      </S.CouponList>
    </S.Container>
  );
};

export default CouponSection;
