import { styled } from 'styled-components';

export const OrderSummarySkeleton = styled.div`
  position: relative;

  min-width: 344px;
  height: 360px;

  background-color: var(--grey-200);

  margin: 45px 0 0 30px;

  border: 1px solid var(--grey-300);
  border-radius: 8px;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;
