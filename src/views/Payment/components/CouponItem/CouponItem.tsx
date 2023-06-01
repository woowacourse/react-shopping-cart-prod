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
        <CouponBenefit>{benefit}</CouponBenefit>
        <CouponContentPrimary>{name}</CouponContentPrimary>
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
  height: 10rem;
  margin: 10px;
  border: 2px solid ${({ theme }) => theme.secondaryColor};

  background-color: ${({ theme }) => theme.lightColor};

  color: #000;
  font-size: 20px;
  text-align: left;

  &:disabled {
    background-color: ${({ theme }) => theme.secondaryColor};
    cursor: not-allowed;
  }
`;

const CouponBenefit = styled.p`
  color: ${({ theme }) => theme.infoColor};
  font-weight: 600;
  font-size: 1.8rem;
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
