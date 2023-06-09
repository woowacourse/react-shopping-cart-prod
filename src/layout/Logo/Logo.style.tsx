import { styled } from "styled-components";

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

export const LogoName = styled.p`
  font-size: 2.6rem;
  font-weight: 400;
  font-family: "Do Hyeon";
  color: ${({ theme }) => theme.lightColor};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
