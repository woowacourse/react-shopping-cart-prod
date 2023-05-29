import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as CartIcon } from 'assets/cart-icon.svg';
import ROUTE_PATH from 'constants/routePath';
import { useRecoilValue } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import FlexBox from 'components/@common/FlexBox';
import SelectBox from 'components/@common/SelectBox/SelectBox';
import { ServerOwner } from 'types/serverOwner';
import BASE_URL from 'constants/apiBaseURL';
import { SERVER_OWNER } from 'constants/storeKey';

const serverOwnerOptions = Object.entries(BASE_URL).map(([name, value]) => ({ name: name, value: name }));

const Header = ({ children }: PropsWithChildren) => {
  const cartProductCount = useRecoilValue(cartProductsState).size;

  const handleServerOwner = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ServerOwner;

    localStorage.setItem(SERVER_OWNER, value);
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <FlexLink to={ROUTE_PATH.root}>
        <Title>{children}</Title>
      </FlexLink>

      <FlexBox gap="4px">
        <FlexLink to={ROUTE_PATH.user}>
          <span>유저 선택</span>
        </FlexLink>
        <SelectBox
          value={(localStorage.getItem(SERVER_OWNER) ?? '솔로스타') as ServerOwner}
          options={serverOwnerOptions}
          onChange={handleServerOwner}
        />
        <FlexLink to={ROUTE_PATH.cart}>
          <Cart />
          <CartProductCount>{cartProductCount}</CartProductCount>
        </FlexLink>
      </FlexBox>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: var(--header-height);
  padding: 0 16.66%;
  background-color: #333333;
`;

const Cart = styled(CartIcon)`
  width: 30px;
  height: 30px;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 420px) {
    font-size: 20px;
  }

  @media (max-width: 360px) {
    font-size: 18px;
  }
`;

const CartProductCount = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #06c09e;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  line-height: 24px;
`;

const FlexLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
`;

export default Header;
