import { HTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface CouponItemProps extends HTMLAttributes<HTMLButtonElement> {
  benefit: string;
  name: string;
  condition: string;
  disabled?: boolean;
  onClick?: () => void;
}

function CouponItem({ benefit, name, condition, onClick, disabled }: CouponItemProps) {
  return (
    <Coupon onClick={onClick} disabled={disabled}>
      <ContentWrapper>
        <CouponContentPrimary>{name}</CouponContentPrimary>
        <CouponBenefit>{benefit}</CouponBenefit>
        <CouponContentSecondary>{condition}</CouponContentSecondary>
      </ContentWrapper>
    </Coupon>
  );
}

export default CouponItem;

const Coupon = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;

  width: 30rem;

  padding-left: 2rem;
  height: 12rem;
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 2px;

  background-color: ${({ theme }) => theme.lightColor};

  color: #000;
  font-size: 20px;
  text-align: left;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:disabled {
    background-color: ${({ theme }) => theme.secondaryColor};
    cursor: not-allowed;
  }
`;

const CouponBenefit = styled.p`
  color: ${({ theme }) => theme.infoColor};
  font-weight: 600;
  font-size: 3rem;
  font-family: 'Do Hyeon';
  margin-bottom: 0.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1 1;
  row-gap: 0.5rem;
  flex-wrap: nowrap;
  flex-direction: column;
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
