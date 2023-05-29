import * as S from './Coupon.styles';

const Coupon = () => {
  return (
    <S.Container>
      <S.Title>적용 가능한 쿠폰</S.Title>
      <div>
        <S.CouponWrapper>
          <S.CheckBox type="checkbox" />
          <S.CouponName>10% 할인 쿠폰</S.CouponName>
        </S.CouponWrapper>
        <S.CouponWrapper>
          <S.CheckBox type="checkbox" />
          <S.CouponName>10% 할인 쿠폰</S.CouponName>
        </S.CouponWrapper>
      </div>
    </S.Container>
  );
};
export default Coupon;
