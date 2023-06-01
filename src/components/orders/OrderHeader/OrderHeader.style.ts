import { styled } from 'styled-components';
import { theme } from '@styles/theme';

export const Header = styled.div`
  padding: 3rem 0;
  border-bottom: 4px solid ${theme.colors.primaryColor};

  font-weight: 700;
  font-size: 3.2rem;
  line-height: 3.7rem;

  text-align: center;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryColor};
`;
