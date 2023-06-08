import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import ServerSelect from '../ServerSelect/ServerSelect';
import { CartIcon, OrderIcon, UserIcon } from '../../../assets/svg';
import useMenu from '../../user/UserMenu/useMenu';
import UserMenu from '../../user/UserMenu/UserMenu';

const Header = () => {
  const { cart } = useCart();
  const { isMenuOpen, isActive, openMenu, menuRef } = useMenu();

  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImage
          src="https://cdn-mart.baemin.com/front-end/assets-static/bmmart_logo_2021@3x.png"
          alt="배민상회 로고"
        />
      </Logo>
      <RightContainer>
        <ServerSelect />
        <UserInfo onClick={openMenu} ref={menuRef}>
          <UserInfoInner>
            <UserIcon />
            <span>나의상회</span>
          </UserInfoInner>
          {isMenuOpen && <UserMenu isActive={isActive} />}
        </UserInfo>
        <LinkWrapper to="/cart">
          <CartIcon />
          <span>장바구니</span>
          {cart.length > 0 && (
            <CartTotalQuantity>
              <span>{cart.length}</span>
            </CartTotalQuantity>
          )}
        </LinkWrapper>
        <LinkWrapper to="/orders">
          <OrderIcon />
          <span>주문목록</span>
        </LinkWrapper>
      </RightContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 8%;
  background-color: ${(props) => props.theme.color.WHITE};
  border-bottom: 1px solid ${(props) => props.theme.color.GRAY_300};
  z-index: ${(props) => props.theme.zIndex.HEADER};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 15px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 136px;
  height: 38px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const UserInfo = styled.div`
  position: relative;
`;

const UserInfoInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  & > span {
    font-size: 10px;
  }
`;

const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;

  & > span {
    font-size: 10px;
  }
`;

const CartTotalQuantity = styled.span`
  position: absolute;
  top: -2px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.ORANGE};
  color: ${(props) => props.theme.color.WHITE};
  font-size: 12px;
`;

export default Header;
