import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import ServerSelector from '../../ServerSelector/ServerSelector';
import CartButton from './CartButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import HeaderCartErrorBoundary from '../../../errorHandler/HeaderCartErrorBoundary';
import Colors from '../../../constant/Colors';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <GiShoppingCart color={Colors.white} size="55px" />
        <Title>SHOP</Title>
      </LogoLink>
      <ServerSelector />
      <RightContainer>
        <HeaderCartErrorBoundary>
          <Suspense
            fallback={
              <LoadingSpinner color={Colors.staleTurquoise} diameter="32px" spinnerWidth="5px" />
            }
          >
            <HeaderLink to="/cart">
              <CartButton />
            </HeaderLink>
          </Suspense>
        </HeaderCartErrorBoundary>
        <HeaderLink to="/orders">주문목록</HeaderLink>
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

  background-color: ${Colors.grey1};

  color: ${Colors.white};

  z-index: 1;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  color: ${Colors.white};
`;

const LogoLink = styled(StyledLink)`
  column-gap: 15px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 40px;
  font-weight: 900;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;

  margin-left: 20px;
  height: 40px;
`;

const HeaderLink = styled(StyledLink)`
  column-gap: 6px;

  font-size: 24px;
`;

export default Header;
