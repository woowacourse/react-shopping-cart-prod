import { styled } from 'styled-components';

export const OrderBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--grey-200);

  border-bottom: 3px solid var(--grey-300);
`;

export const OrderDate = styled.span`
  margin-left: 15px;
  font-size: 11px;

  opacity: 0.6;
`;
