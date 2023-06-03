import React, { useEffect } from 'react';
import * as S from './CouponSection.styles';
import { useGet } from 'hooks/useGet';
import { CheckBox } from '../CartItem/CartItem.styles';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { couponAtom, priceAtom } from 'recoil/carts';
import { getCoupons, getPriceResult } from 'api/cart';
import { Coupon } from 'types/api/carts';

const CouponSection = () => {
  const { data: coupons } = useGet(getCoupons);
  const [checkedCoupons, setCheckedCoupons] = useRecoilState(couponAtom);
  const { request } = useGet(getPriceResult(checkedCoupons.join(',')));
  const setPrice = useSetRecoilState(priceAtom);

  useEffect(() => {
    setCheckedCoupons([]);
  }, []);

  useEffect(() => {
    const getPrice = async () => {
      const data = await request();

      if (data) {
        setPrice(data);
      }
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

  const couponList = coupons?.length ? (
    coupons?.map((coupon: Coupon) => (
      <S.CouponWrapper key={coupon.id}>
        <CheckBox type="checkbox" onChange={applyCoupon(coupon.id)} />
        <S.CouponName>{coupon.name}</S.CouponName>
      </S.CouponWrapper>
    ))
  ) : (
    <S.EmptyCoupon>사용가능 한 쿠폰이 없습니다.</S.EmptyCoupon>
  );

  return (
    <S.Container>
      <S.Title>쿠폰</S.Title>
      <S.CouponList>{couponList}</S.CouponList>
    </S.Container>
  );
};

export default CouponSection;
