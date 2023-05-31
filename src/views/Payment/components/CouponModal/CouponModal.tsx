import { Modal } from '@common/Modal';
import { Column, Row } from '@styles/style';
import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface CouponModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

// {
//   id: 1,
//   name: '생일 쿠폰',
//   type: 'percent',
//   value: 10,
//   minimumPrice: 0,
// }

const couponCondition = (minimumPrice: number) => {
  if (!minimumPrice) {
    return '금액 상관없이 적용';
  }

  return `${minimumPrice.toLocaleString('ko-KR')}원 이상 구매시 적용`;
};

const couponBenefitText = (type: string, value: number) => {
  switch (type) {
    case 'percent': {
      return `전체 금액에서 ${value}% 할인`;
    }

    case 'price': {
      return `전체 금액에서 ${value}원 할인`;
    }

    case 'delivery': {
      return `배송료 ${value}원 할인`;
    }

    default: {
      throw new Error('coupon benefit text를 만들 수 없는 coupon 타입입니다.');
    }
  }
};

function CouponModal(props: CouponModalProps) {
  return props.isOpen ? (
    <Modal {...props}>
      <CouponContainerTitle>쿠폰함</CouponContainerTitle>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          <CouponListWrapper>
            <Coupon>
              <ContentWrapper>
                <CouponBenefit>{couponBenefitText('percent', 10)}</CouponBenefit>
                <CouponContentPrimary>생일 쿠폰(name)</CouponContentPrimary>
                <CouponContentSecondary>{couponCondition(50000)}</CouponContentSecondary>
              </ContentWrapper>
            </Coupon>

            <Coupon>
              <ContentWrapper>
                <CouponBenefit>{couponBenefitText('percent', 10)}</CouponBenefit>
                <CouponContentPrimary>생일 쿠폰(name)</CouponContentPrimary>
                <CouponContentSecondary>{couponCondition(50000)}</CouponContentSecondary>
              </ContentWrapper>
            </Coupon>

            <Coupon>
              <ContentWrapper>
                <CouponBenefit>{couponBenefitText('percent', 10)}</CouponBenefit>
                <CouponContentPrimary>생일 쿠폰(name)</CouponContentPrimary>
                <CouponContentSecondary>{couponCondition(50000)}</CouponContentSecondary>
              </ContentWrapper>
            </Coupon>

            <Coupon>
              <ContentWrapper>
                <CouponBenefit>{couponBenefitText('percent', 10)}</CouponBenefit>
                <CouponContentPrimary>생일 쿠폰(name)</CouponContentPrimary>
                <CouponContentSecondary>{couponCondition(50000)}</CouponContentSecondary>
              </ContentWrapper>
            </Coupon>

            <Coupon>
              <ContentWrapper>
                <CouponBenefit>{couponBenefitText('percent', 10)}</CouponBenefit>
                <CouponContentPrimary>생일 쿠폰(name)</CouponContentPrimary>
                <CouponContentSecondary>{couponCondition(50000)}</CouponContentSecondary>
              </ContentWrapper>
            </Coupon>
          </CouponListWrapper>
        }
      </div>
    </Modal>
  ) : null;
}

export default CouponModal;

const CouponListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin: 0 auto;

  max-width: 300px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 300px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 600px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 900px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    max-width: 1200px;
  }
`;

const CouponBenefit = styled.p`
  color: ${({ theme }) => theme.infoColor};
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const CouponContentPrimary = styled.p`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.5rem;
  font-weight: 600;
`;

const CouponContentSecondary = styled.p`
  color: ${({ theme }) => theme.secondaryColor};
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1 1;
  row-gap: 0.5rem;
  flex-wrap: nowrap;
  flex-direction: column;
`;

const CouponContainerTitle = styled.div`
  font-size: 4rem;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};
`;

const Coupon = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 8px;

  padding: 5rem;
  height: 10rem;
  margin: 10px;
  border: 2px solid ${({ theme }) => theme.secondaryColor};

  /* border-radius: 10px; */
  background-color: ${({ theme }) => theme.lightColor};

  color: #000;
  font-size: 20px;
  text-align: left;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;
