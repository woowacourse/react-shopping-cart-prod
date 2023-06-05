import styled from '@emotion/styled';
import UserCartInfo from './UserCartInfo';
import { Link } from 'react-router-dom';
import Selector from '../Selector/Selector';
import { Text } from '../Text/Text';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Nav>
          <LogoWrapper to="/">
            <HeaderLogo
              src="https://cdn-mart.baemin.com/front-end/assets-static/bmmart_logo_2021@3x.png"
              alt="logo"
            />
          </LogoWrapper>
          <Tab to="/event">
            <Text size="smaller" weight="normal">
              이벤트
            </Text>
          </Tab>
        </Nav>

        <CartWrapper>
          <Selector />
          <UserCartInfo />
        </CartWrapper>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;

const Nav = styled.div`
  display: flex;
`;

const Tab = styled(Link)`
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 120px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderInner = styled.div`
  width: 1140px;
  display: flex;
  flex-direction: row;
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
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CartWrapper = styled.div`
  display: flex;
  align-items: center;
`;
