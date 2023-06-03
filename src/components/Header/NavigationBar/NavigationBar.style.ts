import styled from 'styled-components';

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const OrderListIcon = styled.img`
  width: 24px;
  height: 28px;
`;

export const LogoTitle = styled.div`
  font-size: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.dark};
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderListButton = styled.button`
  font-size: 20px;
  color: ${({ theme }) => theme.color.dark};
`;
