import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import ServerSelector from '../../ServerSelector/ServerSelector';
import CartButton from './CartButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Header = () => {
  const navigate = useNavigate();

  const gotoMain = () => navigate('/');

  const gotoCart = () => navigate('/cart');

  const gotoOrderList = () => navigate('/orders');

  return (
    <HeaderContainer>
      <Logo onClick={gotoMain}>
        <GiShoppingCart color="#ffffff" size="55px" />
        <Title>SHOP</Title>
      </Logo>
      <ServerSelector />
      <RightContainer>
        <Suspense fallback={<LoadingSpinner color="#04c09e" diameter="32px" spinnerWidth="5px" />}>
          <CartButton onClick={gotoCart} />
        </Suspense>
        <Button onClick={gotoOrderList}>주문목록</Button>
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

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 6px;

  border: none;
  background: none;

  color: white;
  font-size: 24px;
  cursor: pointer;
`;

export default Header;
