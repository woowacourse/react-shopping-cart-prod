import Button from '@components/common/Button';
import * as S from './CartCouponSelect.style';

interface CartCouponSelectProps {
  coupons: number;
}

function CartCouponSelect({ coupons }: CartCouponSelectProps) {
  return (
    <div>
      <S.Title>쿠폰 (사용 가능한 쿠폰 {coupons}개)</S.Title>
      <S.InformationWrapper>
        {coupons === 0 && <S.Message>현재 사용 가능한 쿠폰이 없습니다.</S.Message>}
        {coupons > 0 && <S.Message>사용 가능한 쿠폰이 있습니다. 쿠폰을 적용하시겠어요?</S.Message>}
        <Button text="쿠폰 선택" disabled={coupons === 0} />
      </S.InformationWrapper>
    </div>
  );
}

export default CartCouponSelect;
