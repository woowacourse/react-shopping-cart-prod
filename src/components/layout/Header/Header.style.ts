import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Navbar = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.lightColor};
  margin-bottom: 3rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

export const HeaderLink = styled(Link)`
  font-size: 2.4rem;
`;
