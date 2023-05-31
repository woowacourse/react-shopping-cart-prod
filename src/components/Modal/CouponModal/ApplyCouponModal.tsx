import styled from '@emotion/styled';
import { Text } from '../../common/Text/Text';
import { useCouponModal } from '../../../hooks/useCouponModal';
import UserCouponItem from '../../box/UserCouponItem/UserCouponItem';
import { CouponType } from '../../../types/types';
import { couponState } from '../../../service/atom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

interface ApplyCouponModalProps {
  totalPrice: number;
  coupons?: CouponType[];
}

const ApplyCouponModal = ({ totalPrice, coupons }: ApplyCouponModalProps) => {
  const { modalDataState, closeModal } = useCouponModal();
  const [_, setCoupon] = useRecoilState(couponState);
  const [useCouponId, setUseCouponId] = useState<number>();

  const onSubmit = () => {
    modalDataState.callBack && modalDataState.callBack();
    closeModal();
    changeCoupon();
  };

  const changeCoupon = () => {
    const coupon = coupons?.find((coupon) => coupon.id === useCouponId);
    if (coupon) setCoupon(coupon);
  };

  const changeCouponId = (couponId: number, minimumPrice: number) => {
    if (minimumPrice < totalPrice) setUseCouponId(couponId);
  };

  return (
    <ModalWrapper>
      <TextWrapper>
        <Text color="#000000" size="medium" weight="bold">
          보유 쿠폰 리스트
        </Text>
      </TextWrapper>
      <CouponListWrapper>
        {coupons && coupons.length ? (
          coupons.map((coupon) => {
            return (
              <UserCouponItem
                key={coupon.id}
                coupon={coupon}
                totalPrice={totalPrice}
                isClicked={coupon.id === useCouponId}
                onClick={() => changeCouponId(coupon.id, coupon.minimumPrice)}
              />
            );
          })
        ) : (
          <Text size="smallest" weight="light">
            보유한 쿠폰이 없습니다.
          </Text>
        )}
      </CouponListWrapper>
      <ButtonWrapper>
        <CancelButton onClick={closeModal}>
          <Text size="smallest" weight="light">
            취소
          </Text>
        </CancelButton>
        <SubmitButton onClick={onSubmit}>
          <Text size="smallest" weight="normal">
            적용
          </Text>
        </SubmitButton>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default ApplyCouponModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 375px;
  max-width: 375px;
  height: 667px;
  max-height: 667px;

  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
`;

const CouponListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 330px;
  max-width: 330px;
  height: 520px;
  max-height: 520px;

  gap: 6px;
  background-color: #fff;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 2px solid #04c09e;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 56px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: row;
`;

const ButtonStyle = styled.button`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    filter: brightness(0.94);
  }
`;

const CancelButton = styled(ButtonStyle)`
  border-radius: 0 0 0 8px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled(ButtonStyle)`
  border-radius: 0 0 8px 0;
`;
