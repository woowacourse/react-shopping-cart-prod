import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import ServerSelect from '../ServerSelect/ServerSelect';
import { CartIcon, OrderIcon } from '../../../assets/svg';

const Header = () => {
  const { cart } = useCart();

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
        <CartLink to="/cart">
          <CartIcon />
          <span>장바구니</span>
          {cart.length > 0 && (
            <CartTotalQuantity>
              <span>{cart.length}</span>
            </CartTotalQuantity>
          )}
        </CartLink>
        <OrderListLink to="/orders">
          <OrderIcon />
          <span>주문목록</span>
        </OrderListLink>
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
  background-color: ${(props) => props.theme.color.white};
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  z-index: ${(props) => props.theme.zIndex.header};
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

const CartLink = styled(Link)`
  display: flex;
  flex-direction: column;
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
  background: ${(props) => props.theme.color.orange};
  color: ${(props) => props.theme.color.white};
  font-size: 12px;
`;

const OrderListLink = styled(Link)`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  & > span {
    font-size: 10px;
  }
`;

export default Header;
