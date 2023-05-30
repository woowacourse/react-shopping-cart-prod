import { useModal } from 'noah-modal';
import { useRecoilState } from 'recoil';

import { CouponType } from '@Types/index';

import selectedCouponIdState from '@Atoms/selectedCouponIdState';

import * as S from './style';

function Coupon({
  id,
  name,
  description,
  isUsed = false,
  subMessage,
  type,
  isLoading = false,
}: Partial<CouponType> & Partial<{ subMessage: string; type: 'issued' | 'use'; isLoading: boolean }>) {
  const { closeModal } = useModal();

  const [selectedCouponId, setSelectedCouponId] = useRecoilState(selectedCouponIdState);
  console.log(selectedCouponId);

  const IssuedOrUseCoupon = () => {
    if (!id) return;
    if (type === 'issued') return;

    setSelectedCouponId(id);
    closeModal('myCoupon');
  };

  const couponButton = type === 'issued' ? '⬇︎' : selectedCouponId === id ? '✓' : '➡︎';
  return (
    <S.Container isUsed={isUsed} isLoading={isLoading}>
      <S.CouponLayout>
        <S.CouponDescription>{description}</S.CouponDescription>
        <S.CouponName>{name}</S.CouponName>
        <S.CouponSubMessage>{subMessage}</S.CouponSubMessage>
      </S.CouponLayout>
      <S.CouponButton isLoading={isLoading} onClick={IssuedOrUseCoupon}>
        {couponButton}
      </S.CouponButton>
    </S.Container>
  );
}

export default Coupon;
