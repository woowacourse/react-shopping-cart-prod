import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 9.2rem;

  padding: 3.6rem 2.5rem 3.6rem 4rem;
  border: 1px solid ${theme.colors.secondaryColor};

  font-weight: 400;
  font-size: 2rem;
  line-height: 2.4rem;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
  background: ${theme.colors.grayColor};
`;
