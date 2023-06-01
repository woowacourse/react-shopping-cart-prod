import { useModal } from 'noah-modal';
import { useSetRecoilState } from 'recoil';

import { CouponType } from '@Types/index';

import useCoupon from '@Hooks/useCoupon';

import selectedCouponIdState from '@Atoms/selectedCouponIdState';

import * as S from './style';

type CouponProps = Partial<CouponType> &
  Partial<{ subMessage: string; type: 'issued' | 'use'; isLoading: boolean; isSelected?: boolean }>;

function Coupon({
  id,
  name,
  description,
  isUsed = false,
  subMessage,
  type,
  isLoading = false,
  isSelected = false,
}: CouponProps) {
  const { closeModal } = useModal();
  const { deleteMyCoupon, issuedCoupon } = useCoupon();

  const setSelectedCouponId = useSetRecoilState(selectedCouponIdState);

  const IssuedOrUseCoupon = () => {
    if (!id) return;
    if (type === 'issued') return issuedCoupon(id);
    if (isUsed) return alert('이미 사용한 쿠폰입니다.');

    setSelectedCouponId(id);
    closeModal('myCoupon');
  };

  const handleDeleteMyCoupon = () => {
    if (!id) return;
    deleteMyCoupon(id);
  };

  const couponButton = isUsed ? '✖︎' : type === 'issued' ? '⬇︎' : isSelected ? '✓' : '➡︎';
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
