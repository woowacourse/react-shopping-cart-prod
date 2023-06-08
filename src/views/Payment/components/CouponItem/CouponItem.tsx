import { HTMLAttributes } from 'react';

import * as S from './CouponItem.style'

interface CouponItemProps extends HTMLAttributes<HTMLButtonElement> {
  benefit: string;
  name: string;
  condition: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function CouponItem({ benefit, name, condition, onClick, disabled, selected }: CouponItemProps) {
  return (
    <S.Coupon onClick={onClick} disabled={disabled} selected={selected}>
      <S.ContentWrapper>
        <S.CouponContentPrimary>{name}</S.CouponContentPrimary>
        <S.CouponBenefit>{benefit}</S.CouponBenefit>
        <S.CouponContentSecondary disabled={disabled}>{condition}</S.CouponContentSecondary>
      </S.ContentWrapper>
    </S.Coupon>
  );
}

export default CouponItem;

