import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import CartIcon from '../../../assets/icons/CartIcon';
import ServerSelector from './ServerSelector';
import CartButton from './CartButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartButtonClick = () => {
    navigate('/cart');
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>
        <CartIcon />
        <Title>SHOP</Title>
      </Logo>
      <ServerSelector />
      <RightContainer>
        <Suspense fallback={<LoadingSpinner color="#04c09e" diameter="32px" spinnerWidth="5px" />}>
          <CartButton onClick={handleCartButtonClick} />
        </Suspense>
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

  background-color: #333;

  color: #fff;

  z-index: 1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;

  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  padding-top: 8px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 40px;
`;

export default Header;
