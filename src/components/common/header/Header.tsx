import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { CartIcon } from '../../../assets';
<<<<<<< HEAD
import Menu from '../Menu/Menu';
=======
import UserCartInfo from './UserCartInfo';
>>>>>>> upstream/hafnium1923
import { Link } from 'react-router-dom';
import Selector from '../Selector/Selector';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoWrapper to="/">
          <CartIcon fill="#FFFFFF" style={{ marginRight: '20px' }} />
          <Text color="#FFFFFF" size="largest" weight="bold" lineHeight="58px">
            SHOP
          </Text>
        </LogoWrapper>
<<<<<<< HEAD
        <MenuWrapper>
          <Selector />
          <Menu />
        </MenuWrapper>
=======
        <CartWrapper>
          <Selector />
          <UserCartInfo />
        </CartWrapper>
>>>>>>> upstream/hafnium1923
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
<<<<<<< HEAD
  height: 100px;
=======
  height: 80px;
>>>>>>> upstream/hafnium1923
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1000;
<<<<<<< HEAD

  @media screen and (max-width: 660px) {
    height: 130px;
  }
=======
>>>>>>> upstream/hafnium1923
`;

const HeaderInner = styled.div`
  width: 1280px;
  display: flex;
<<<<<<< HEAD
=======
  flex-direction: row;
>>>>>>> upstream/hafnium1923
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
<<<<<<< HEAD
    flex-direction: column;
=======
>>>>>>> upstream/hafnium1923
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

<<<<<<< HEAD
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;

  @media screen and (max-width: 660px) {
    align-items: center;
  }
=======
const CartWrapper = styled.div`
  display: flex;
  align-items: center;
>>>>>>> upstream/hafnium1923
`;
