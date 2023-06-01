import { Modal } from '@common/Modal';

import { useCart } from '@views/Cart/recoil/cartState';
import useCouponList from '@views/Payment/recoil/couponListState';

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
      return `전체 ${value}% 할인`;
    }

    case 'price': {
      return `전체 ${value}원 할인`;
    }

    case 'delivery': {
      return `배송료 ${value}원 할인`;
    }

    default: {
      throw new Error('coupon benefit text를 만들 수 없는 coupon 타입입니다.');
    }
  }
};

function CouponModal({ isOpen, closeModal }: CouponModalProps) {
  const { couponList, checkCoupon } = useCouponList();
  const { totalPrice } = useCart();

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
          <Button size="l">취소하기</Button>
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

  max-width: 300px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 640px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 723px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 1000px;
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
