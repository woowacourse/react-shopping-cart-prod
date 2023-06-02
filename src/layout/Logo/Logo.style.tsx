import { styled } from 'styled-components';

export const LogoWrapper = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.lightColor};
`;

export const CartIcon = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 1rem;
`;
