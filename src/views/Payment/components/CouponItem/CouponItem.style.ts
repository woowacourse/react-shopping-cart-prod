import {styled} from "styled-components";

export const Coupon = styled.button<{ selected?: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;

  width: 30rem;

  padding-left: 2rem;
  height: 12rem;
  margin: 10px;
  border: ${({ theme, selected }) =>
  selected ? `${theme.infoColor} 3px solid` : `${theme.primaryColor} 1px solid`};
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

export const CouponBenefit = styled.p`
  color: ${({ theme }) => theme.infoColor};
  font-weight: 600;
  font-size: 3rem;
  font-family: 'Do Hyeon';
  margin-bottom: 0.5rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1 1;
  row-gap: 0.5rem;
  flex-wrap: nowrap;
  flex-direction: column;
`;

export const CouponContentPrimary = styled.p`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CouponContentSecondary = styled.p<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) => (disabled ? theme.primaryColor : theme.secondaryColor)};
  font-size: 1.5rem;
`;
