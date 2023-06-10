import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { CartIcon } from '../../../assets';
import Menu from '../Menu/Menu';
import Selector from '../Selector/Selector';
import { URL } from '../../../abstract/constants';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoWrapper to={URL.ROOT}>
          <CartIcon fill="#FFF" style={{ marginRight: '20px' }} />
          <Title>SHOP</Title>
        </LogoWrapper>
        <MenuWrapper>
          <Selector />
          <Menu />
        </MenuWrapper>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  height: 100px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1000;

  @media screen and (max-width: 660px) {
    height: 130px;
  }
`;

const HeaderInner = styled.div`
  width: 1280px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;

  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 330px;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font: bold 56px/58px;
  color: #fff;
`;
const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;

  @media screen and (max-width: 660px) {
    align-items: center;
  }
`;
