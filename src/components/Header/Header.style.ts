import styled from "styled-components";

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

export const MenuWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  font-size: 18px;
  color: black;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  
  cursor: pointer;
`;

export const LogoImage = styled.img`
  height: 35px;
`;

export const NavBar = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const MenuIcon = styled.div`
  color: ${({ theme }) => theme.color.dark};
`;

export const MenuTitle = styled.div`
  margin-top: 2px;
  font-size: 10px;
  text-align: center;

  color: ${({ theme }) => theme.color.dark};
`;

export const CartCountWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CartCount = styled.div`
  border-radius: 50%;
  background-color: #04c09e;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartCountText = styled.div`
  font-size: 16px;
  color: #fff;
`;
