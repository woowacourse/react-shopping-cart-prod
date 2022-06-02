// @ts-nocheck
import { Outlet, useLocation } from 'react-router-dom';
import Header from 'components/Header';
import { ROUTES } from 'utils/constants';
import CartIcon from 'components/CartIcon';
import { useSelector } from 'react-redux';
import UserMenu from 'components/UserMenu';

import { useEffect, useState } from 'react';
import Styled from './index.style';

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated, nickname } = useSelector(state => state.authReducer);
  const [isHeaderShow, setIsHeaderShow] = useState(true);

  useEffect(() => {
    setIsHeaderShow(location.pathname !== '/login' && location.pathname !== '/signup');
  }, [location]);

  return (
    <Styled.Container>
      {isHeaderShow && (
        <div>
          <Header
            left={
              <Styled.HomeLink to={ROUTES.HOME}>
                <CartIcon category="header" /> WOOWA SHOP
              </Styled.HomeLink>
            }
            right={
              isAuthenticated ? (
                <Styled.RightSide>
                  <Styled.CartLink to={ROUTES.CART}>장바구니</Styled.CartLink>
                  <Styled.OrderLink to={ROUTES.HOME}>주문목록</Styled.OrderLink>
                  <UserMenu nickname={nickname} />
                </Styled.RightSide>
              ) : (
                <Styled.LoginLink to="/login">로그인</Styled.LoginLink>
              )
            }
          />
        </div>
      )}

      <Styled.OutletContainer>
        <Outlet />
      </Styled.OutletContainer>
    </Styled.Container>
  );
};

export default Layout;
