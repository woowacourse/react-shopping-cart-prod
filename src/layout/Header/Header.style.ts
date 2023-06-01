import { styled } from 'styled-components';

export const Navbar = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.lightColor};
  position: fixed;
  width: 100%;
  z-index: 100;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;
