import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.color.light};
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BigLogoImage = styled.img`
  height: 35px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const SmallLogoImage = styled.img`
  height: 80px;
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const CartWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const CartIcon = styled.img`
  width: 28px;
  height: 28px;
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

export const CartCountWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  background-color: #04c09e;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;

export const OrderListButton = styled.button`
  font-size: 20px;
  color: ${({ theme }) => theme.color.dark};
`;
