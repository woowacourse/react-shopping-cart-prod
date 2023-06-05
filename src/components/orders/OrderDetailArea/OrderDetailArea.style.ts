import { styled } from 'styled-components';

export const OrderPaymentAmountWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  margin-top: 3rem;
  padding-bottom: 5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 3fr 2fr;
  }
`;
