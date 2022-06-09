import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { alignCenter } from '../../styles/mixin';

const NavBarContainer = styled.div`
  ${alignCenter};
  padding: 0 10%;
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.TEAL_400};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.GRAY_300};
`;

const NavBarTitle = styled(Link)`
  ${alignCenter}
  flex: 1;
  width: 300px;
  height: 40px;
  text-decoration: none;

  img {
    width: 40px;
    height: 36px;
  }

  h1 {
    padding: 10px 0 0 10px;
    font-size: 30px;
    font-weight: 900;
    text-align: center;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.GRAY_50};
  }
`;

const NavBarMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 500;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.GRAY_50};

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    padding: 5px;
    border: 1.5px solid white;
    border-radius: 5px;
    background: transparent;
    font-size: 15px;
    color: inherit;
  }
`;

const SubBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 40px;
  background-color: ${({ theme }) => theme.colors.GRAY_400};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.GRAY_300};
  height: 20px;
  gap: 10px;

  a {
    font-size: 12px;
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  button {
    font-size: 12px;
    background: none;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

export { NavBarContainer, NavBarTitle, NavBarMenu, SubBar };
