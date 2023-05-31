import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { useEffect } from 'react';
import CartIcon from '../../../assets/icons/CartIcon';
import { BASE_URL } from '../../../constant';
import serverNameState from '../../../globalState/atoms/serverName';
import { isProperServerName } from '../../../types/server';
import cartState from '../../../globalState/atoms/cartState';
import getCartLength from '../../../globalState/selectors/getCartLength';
import fetchCartItems from '../../../globalState/selectors/fetchCartItems';

const Header = () => {
  const navigate = useNavigate();
  const cartLength = useRecoilValue(getCartLength);
  const [serverName, setServerName] = useRecoilState(serverNameState);
  const resetCart = useResetRecoilState(cartState);
  const resetCartFetcher = useRecoilRefresher_UNSTABLE(fetchCartItems);

  useEffect(() => {
    resetCartFetcher();
    resetCart();
  }, [serverName]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleServerNameSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedServerName = event.target.value;

    if (!isProperServerName(selectedServerName)) return;

    setServerName(selectedServerName);
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
      <RightContainer>
        <select onChange={handleServerNameSelectChange} value={serverName}>
          {Object.keys(BASE_URL).map((serverNameOption) => (
            <option key={serverNameOption}>{serverNameOption}</option>
          ))}
        </select>
        <CartButton onClick={handleCartButtonClick}>
          <p>장바구니</p>
          <CartTotalQuantity>{cartLength}</CartTotalQuantity>
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
  gap: 25px;
`;

const CartButton = styled.div`
  display: flex;
  column-gap: 6px;
  font-size: 24px;

  cursor: pointer;

  @media screen and (max-width: 520px) {
    & > p {
      display: none;
    }
  }
`;

const CartTotalQuantity = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  border-radius: 50%;
  background: #04c09e;

  font-size: 16px;
`;

export default Header;
