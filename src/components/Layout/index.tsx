// @ts-nocheck
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import { Header, CartIcon, UserMenu } from 'components';

import { ROUTES } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import Styled from './index.style';

const Layout = () => {
  const location = useLocation();
  const { nickname } = useSelector(state => state.authReducer);
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const isAuthenticated = getCookie('accessToken');

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
                  <Styled.CartLink to={ROUTES.CART}>Cart</Styled.CartLink>
                  <Styled.OrderLink to={ROUTES.HOME}>Order</Styled.OrderLink>
                  <UserMenu nickname={nickname} />
                </Styled.RightSide>
              ) : (
                <Styled.LoginLink to="/login">Login</Styled.LoginLink>
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
