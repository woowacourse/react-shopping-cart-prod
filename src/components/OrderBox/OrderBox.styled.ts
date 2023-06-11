import { styled } from 'styled-components';

export const OrderBox = styled.li`
  border: 1px solid var(--grey-300);
  border-radius: 8px;

  margin-bottom: 45px;

  font-size: 13px;

  overflow: hidden;

  & > * {
    padding: 20px 24px;
  }
`;
