import Button from '@components/common/Button';
import { CouponType } from '@type/couponType';
import * as S from './CartCouponSelect.style';

interface CartCouponSelectProps {
  availableCouponLength: number;
  selectedCoupon?: CouponType;
}

function CartCouponSelect({ availableCouponLength, selectedCoupon }: CartCouponSelectProps) {
  const getMessage = () => {
    if (selectedCoupon) {
      return `${selectedCoupon.name}이 적용되었습니다.`;
    }

    if (availableCouponLength > 0) {
      return '사용 가능한 쿠폰이 있습니다. 쿠폰을 적용하시겠어요?';
    }

    return '현재 사용 가능한 쿠폰이 없습니다.';
  };

  return (
    <div>
      <S.Title>쿠폰 (사용 가능한 쿠폰 {availableCouponLength}개)</S.Title>
      <S.InformationWrapper>
        <S.Message>{getMessage()}</S.Message>
        <Button text="쿠폰 선택" disabled={availableCouponLength === 0} />
      </S.InformationWrapper>
    </div>
  );
}

export default CartCouponSelect;
