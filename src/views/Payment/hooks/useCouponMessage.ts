import { useTotalPrice } from '@views/Cart/recoil/cartState';
import useCouponList, { useCouponSelected } from '../recoil/couponListState';

const useCouponMessage = () => {
  const { couponList } = useCouponList();
  const couponSelected = useCouponSelected();
  const totalPrice = useTotalPrice();

  if (!couponList.some((coupon) => coupon.checked)) {
    const availableCouponLength = couponList.reduce((acc, coupon) => {
      return coupon.minimumPrice < totalPrice ? acc + 1 : acc;
    }, 0);

    return `현재 적용 가능한 쿠폰은 ${availableCouponLength}개 입니다.`;
  }

  if (!couponSelected) {
    return `선택하신 쿠폰을 적용할 수 없습니다.`;
  }

  return `${couponSelected.name}이 적용중입니다.`;
};

export default useCouponMessage;
