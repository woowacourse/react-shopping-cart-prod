import { useRecoilState, useRecoilValue } from 'recoil';
import { Coupon, CouponSelect } from './SpecificCouponSelect.styles';
import {
  couponsSelector,
  selectedCouponsState,
  specificCouponSelector,
} from '../../../atoms/coupons';
import { useEffect, useState } from 'react';
import { isSelectedCartId } from '../../../atoms/cart';

interface SpecificCouponSelectProps {
  cartId: number;
  productId: number;
}

const SpecificCouponSelect = ({
  cartId,
  productId,
}: SpecificCouponSelectProps) => {
  const { allCoupons } = useRecoilValue(couponsSelector);
  const specificCoupons = useRecoilValue(specificCouponSelector(productId));
  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);
  const [targetCouponId, setTargetCouponId] = useState<number>();
  const isCheckedCartItem = useRecoilValue(isSelectedCartId(cartId));

  useEffect(() => {
    if (!isCheckedCartItem && targetCouponId) {
      setSelectedCoupons(
        selectedCoupons.filter((couponId) => couponId !== targetCouponId)
      );
    }
  }, [isCheckedCartItem]);

  const onCouponSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'DEFAULT' || !isCheckedCartItem) {
      e.target.selectedIndex = 0;
      return;
    }

    const newSelectedCoupons = selectedCoupons.filter(
      (couponId) => !allCoupons.some((coupon) => coupon.id === couponId)
    );
    const newSelectedCouponId = +e.target.value;
    newSelectedCoupons.push(newSelectedCouponId);

    setTargetCouponId(newSelectedCouponId);
    setSelectedCoupons([...new Set(newSelectedCoupons)]);
  };
  return (
    <CouponSelect onChange={onCouponSelected}>
      <Coupon defaultChecked value={'DEFAULT'}>
        쿠폰 선택 안함
      </Coupon>
      {specificCoupons.map((coupon) => (
        <Coupon
          key={coupon.id}
          value={coupon.id}
          selected={selectedCoupons.includes(coupon.id)}
        >
          {coupon.name}
        </Coupon>
      ))}
    </CouponSelect>
  );
};

export default SpecificCouponSelect;
