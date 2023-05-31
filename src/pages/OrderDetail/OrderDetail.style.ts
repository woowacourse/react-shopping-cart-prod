import styled from 'styled-components';

export const OrderInfoWrapper = styled.div`
  display: flex;
  gap: 40px;
  padding-bottom: 80px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;
