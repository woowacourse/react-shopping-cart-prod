// @ts-nocheck
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useAuth from 'hooks/db/useAuth';

import { Header, CartIcon, UserMenu } from 'components';

import { ROUTES, PATHNAME } from 'utils/constants';
import Styled from './index.style';

const Layout = () => {
  const location = useLocation();
  const { nickname, isAuthenticated } = useAuth();
  const [isHeaderShow, setIsHeaderShow] = useState(true);

  useEffect(() => {
    setIsHeaderShow(
      location.pathname !== PATHNAME.TO_LOGIN &&
        location.pathname !== PATHNAME.TO_SIGNUP &&
        location.pathname !== PATHNAME.TO_SERVER,
    );
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
                <Styled.LoginLink to={PATHNAME.TO_LOGIN}>Login</Styled.LoginLink>
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
