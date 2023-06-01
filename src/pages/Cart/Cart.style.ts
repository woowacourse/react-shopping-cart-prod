import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const CartPageContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const Main = styled.main`
  display: flex;

  padding: 3.4rem 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  padding-bottom: 1.6rem;
  border-bottom: 4px solid ${theme.colors.secondaryColor};

  font-weight: 400;
  font-size: 2rem;
  line-height: 3.3rem;

  letter-spacing: 0.5px;
`;

export const FlexWrapper = styled.section`
  display: flex;

  justify-content: space-between;

  width: 100%;
`;

export const FlexColWrapper = styled.section`
  flex: 1.2;
  display: flex;
  flex-direction: column;
`;

export const SelectAndPaymentWrapper = styled.div`
  width: 45rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: none;
  }
`;

export const CartCouponSelectWrapper = styled.div`
  margin-bottom: 4rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 4rem;
  }
`;
