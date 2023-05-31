import { useRecoilState, useRecoilValue } from 'recoil';
import { Coupon, CouponSelect } from './SpecificCouponSelect.styles';
import {
  coupons,
  selectedCouponsState,
  specificCouponSelector,
} from '../../../atoms/coupons';

interface SpecificCouponSelectProps {
  productId: number;
}

const SpecificCouponSelect = ({ productId }: SpecificCouponSelectProps) => {
  const { allCoupons } = useRecoilValue(coupons);
  const specificCoupons = useRecoilValue(specificCouponSelector(productId));

  const [selectedCoupons, setSelectedCoupons] =
    useRecoilState(selectedCouponsState);

  const onCouponSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO: 쿠폰 선택 시 초기화 되는 로직 구현해야함.
    if (e.target.value === 'DEFAULT') return;

    const newSelectedCoupons = selectedCoupons.filter(
      (couponId) => !allCoupons.some((coupon) => coupon.id === couponId)
    );
    const newSelectedCouponId = +e.target.value;

    newSelectedCoupons.push(newSelectedCouponId);
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
