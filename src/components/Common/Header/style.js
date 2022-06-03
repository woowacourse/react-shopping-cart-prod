import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.header`
  display: flex;
  width: 100vw;
  height: 80px;
  background: ${({ theme }) => theme.COLOR.CYAN_300};
  box-shadow: 0px 4px 4px rgb(0 0 0 / 30%);
  justify-content: space-around;
`;

export const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.COLOR.WHITE};
  text-decoration-line: none;
`;

export const LogoImage = styled.img`
  width: 50px;
  height: 44px;
`;

export const LogoText = styled.h1`
  padding: 15px 20px 10px 20px;
  font-weight: 900;
  font-family: ${({ theme }) => theme.FONT.PRIMARY};
`;

export const MenuContainer = styled.section`
  display: flex;
  gap: 15px;
`;

export const Badge = styled.div`
  position: absolute;
  top: 5px;
  right: -15px;
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.COLOR.WHITE};
  background-color: ${({ theme }) => theme.COLOR.GREY_500};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

export const AuthNavWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:hover :nth-child(2) {
    display: flex;
  }
`;

export const DropDownWrapper = styled.div`
  display: none;
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 1000;
`;
