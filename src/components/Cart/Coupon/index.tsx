import { getCoupons } from 'api/requests';
import { useGet } from 'hooks/useGet';
import { useRecoilState } from 'recoil';
import { couponIdAtom } from 'recoil/cartList';
import { CouponType } from 'types';
import * as S from './Coupon.styles';

const Coupon = () => {
  const { data } = useGet<CouponType[]>(getCoupons);
  const [selectedCouponId, setSelectedCouponId] = useRecoilState(couponIdAtom);

  const onCheckCoupon = (id: number) => {
    if (selectedCouponId.includes(id)) {
      setSelectedCouponId((prev) => prev.filter((couponId) => couponId !== id));
      return;
    }
    setSelectedCouponId((prev) => [...prev, id]);
  };

  return (
    <S.Container>
      <S.Title>적용 가능한 쿠폰</S.Title>
      <div>
        {data?.map((coupon) => (
          <S.CouponWrapper key={coupon.id}>
            <S.CheckBox
              type="checkbox"
              onChange={() => onCheckCoupon(coupon.id)}
              checked={selectedCouponId.includes(coupon.id)}
            />
            <S.CouponName>{coupon.name}</S.CouponName>
          </S.CouponWrapper>
        ))}
      </div>
    </S.Container>
  );
};
export default Coupon;
