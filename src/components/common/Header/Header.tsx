import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCartService from '../../../hooks/useCartService';
import ServerSelect from '../ServerSelect/ServerSelect';
import star from '../../../assets/image/logo.png';
import colors from '../../../colors';

interface HeaderProps {
  children: string;
}

const Header = ({ children }: HeaderProps) => {
  const { cart } = useCartService();

  return (
    <HeaderContainer>
      <Logo to="/">
        <Star src={star} />
        <Title>{children}</Title>
      </Logo>
      <RightContainer>
        <ServerSelect />
        <CartButton to="/cart">
          장바구니
          {cart.length > 0 && (
            <CartTotalQuantity>{cart.length}</CartTotalQuantity>
          )}
        </CartButton>
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
  padding: 0 10%;
  background-color: ${colors.transparentBlack};
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px ${colors.pureBlack};
  border-bottom: 0.5px solid ${colors.faintGold};
  z-index: 1;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 15px;
  cursor: pointer;
`;

const Star = styled.img`
  width: 50px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: 'Playfair Display';
  font-weight: 500;
  color: ${colors.gold};

  @media (max-width: 710px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
`;

const CartButton = styled(Link)`
  display: flex;
  column-gap: 6px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${colors.pureBlack};
`;

const CartTotalQuantity = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${colors.gold};
  color: ${colors.pureBlack};
  font-size: 16px;
`;

export default Header;
