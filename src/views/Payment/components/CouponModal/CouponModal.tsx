import { Modal } from '@common/Modal';

import { useCart, useTotalPrice } from '@views/Cart/recoil/cartState';
import useCouponList, { useCouponSelected } from '@views/Payment/recoil/couponListState';

import { styled } from 'styled-components';

import { CouponItem } from '../CouponItem';
import { Button } from '@common/Button';

interface CouponModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const couponCondition = (minimumPrice: number) => {
  if (!minimumPrice) {
    return '금액 상관없이 적용';
  }

  return `${minimumPrice.toLocaleString('ko-KR')}원 이상 구매시 적용`;
};

const couponBenefitText = (type: string, value: number) => {
  switch (type) {
    case 'percent': {
      return `${value}% 할인`;
    }

    case 'price': {
      return `${value}원 할인`;
    }

    case 'delivery': {
      return `배달비 무료`;
    }

    default: {
      throw new Error('coupon benefit text를 만들 수 없는 coupon 타입입니다.');
    }
  }
};

function CouponModal({ isOpen, closeModal }: CouponModalProps) {
  const { couponList, checkCoupon } = useCouponList();
  const totalPrice = useTotalPrice();

  const isValidCoupon = (totalPrice: number, minimumPrice: number) => {
    return totalPrice < minimumPrice;
  };

  return isOpen ? (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <CouponContainerTitle>쿠폰함</CouponContainerTitle>
      <ModalContentWrapper>
        {
          <CouponListWrapper>
            {couponList.map((coupon) => {
              return (
                <CouponItem
                  key={coupon.id}
                  onClick={() => {
                    checkCoupon(coupon.id);
                    closeModal();
                  }}
                  disabled={isValidCoupon(totalPrice, coupon.minimumPrice)}
                  benefit={couponBenefitText(coupon.type, coupon.value)}
                  condition={couponCondition(coupon.minimumPrice)}
                  name={coupon.name}
                />
              );
            })}
          </CouponListWrapper>
        }
        <ButtonWrapper>
          <Button
            size="l"
            onClick={() => {
              closeModal();
            }}
          >
            취소하기
          </Button>
          <Button size="l" primary>
            선택완료
          </Button>
        </ButtonWrapper>
      </ModalContentWrapper>
    </Modal>
  ) : null;
}

export default CouponModal;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 80%;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalContentWrapper = styled.div`
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  flex-direction: 'column';
`;

const CouponListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin: 0 auto;

  max-height: 80vh;
  overflow-y: auto;

  max-width: 320px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 640px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 960px;
  }
`;

const CouponContainerTitle = styled.div`
  font-size: 2rem;
  text-align: left;
  font-weight: 600;
  padding-left: 2rem;
  padding-bottom: 0.6rem;
  margin-bottom: 2rem;

  border-bottom: 2px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};
`;
