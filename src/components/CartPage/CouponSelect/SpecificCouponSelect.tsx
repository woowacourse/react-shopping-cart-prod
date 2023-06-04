import { Coupon, CouponSelect } from './SpecificCouponSelect.styles';
import useCouponSelect from '../../../hooks/useCouponSelect';

interface SpecificCouponSelectProps {
  cartId: number;
  productId: number;
}

const SpecificCouponSelect = ({
  cartId,
  productId,
}: SpecificCouponSelectProps) => {
  const { selectedCoupons, specificCoupons, onCouponSelected } =
    useCouponSelect(cartId, productId);

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
