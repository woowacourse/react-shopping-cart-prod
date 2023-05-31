import { useModal } from 'noah-modal';
import { useRecoilState } from 'recoil';

import { CouponType } from '@Types/index';

import useCoupon from '@Hooks/useCoupon';

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
  const { deleteMyCoupon } = useCoupon();

  const [selectedCouponId, setSelectedCouponId] = useRecoilState(selectedCouponIdState);

  const IssuedOrUseCoupon = () => {
    if (!id) return;
    if (type === 'issued') return;
    if (isUsed) return alert('이미 사용한 쿠폰입니다.');

    setSelectedCouponId(id);
    closeModal('myCoupon');
  };

  const handleDeleteMyCoupon = () => {
    if (!id) return;
    deleteMyCoupon(id);
  };

  const couponButton = isUsed ? '✖︎' : type === 'issued' ? '⬇︎' : selectedCouponId === id ? '✓' : '➡︎';
  return (
    <S.Wrapper>
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
      {type === 'use' && isUsed && <S.DeleteButton onClick={handleDeleteMyCoupon}>쿠폰 삭제하기</S.DeleteButton>}
    </S.Wrapper>
  );
}

export default Coupon;
