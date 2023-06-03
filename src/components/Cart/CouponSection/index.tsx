import React, { useEffect } from 'react';
import * as S from './CouponSection.styles';
import { useGet } from 'hooks/useGet';
import { CheckBox } from '../CartItem/CartItem.styles';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { couponAtom, priceAtom } from 'recoil/carts';
import { getCoupons, getPriceResult } from 'api/cart';
import { Coupon } from 'types/api/carts';
import { SERVERS } from 'utils/constants';

const CouponSection = () => {
  const { data: coupons } = useGet(getCoupons);
  const [checkedCoupons, setCheckedCoupons] = useRecoilState(couponAtom);
  const setPrice = useSetRecoilState(priceAtom);

  useEffect(() => {
    setCheckedCoupons([]);
  }, []);

  useEffect(() => {
    const getPrice = async () => {
      const data = await getPriceResult(checkedCoupons.join(','))(
        SERVERS['제이']
      );
      setPrice(data);
    };

    getPrice();
  }, [checkedCoupons]);

  const applyCoupon =
    (couponId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.checked) {
        setCheckedCoupons((prev) => prev.filter((id) => id !== couponId));

        return;
      }
      setCheckedCoupons((prev) => [...prev, couponId]);
    };

  return (
    <S.Container>
      <S.Title>쿠폰</S.Title>
      <S.CouponList>
        {coupons?.map((coupon: Coupon) => (
          <S.CouponWrapper key={coupon.id}>
            <CheckBox type="checkbox" onChange={applyCoupon(coupon.id)} />
            <S.CouponName>{coupon.name}</S.CouponName>
          </S.CouponWrapper>
        ))}
      </S.CouponList>
    </S.Container>
  );
};

export default CouponSection;
