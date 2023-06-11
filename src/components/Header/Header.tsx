import * as styled from './Header.styled';
import { CartSize } from './CartSize/CartSize';

import { ApiSelectBox } from './ApiSelectbox/ApiSelectBox';

import { CartLinkIcon, CartLogo, UserIcon } from '@assets/svg';

export const Header = () => {
  return (
    <styled.Container>
      <styled.Content>
        <styled.Title to="/">
          <span>우테코</span>
          <CartLogo />
          <span>카트</span>
        </styled.Title>
        <styled.RightWrapper>
          <ApiSelectBox />
          <styled.CartPageLink to="/shopping-cart">
            <CartLinkIcon />
            <span>장바구니</span>
            <CartSize />
          </styled.CartPageLink>
          <styled.OrdersPageLink to="/orders">
            <UserIcon />
            <span>주문 목록</span>
          </styled.OrdersPageLink>
        </styled.RightWrapper>
      </styled.Content>
    </styled.Container>
  );
};
