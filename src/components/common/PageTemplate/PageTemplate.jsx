import React from 'react';

import { Header } from 'components/common';

import * as Styled from 'components/common/PageTemplate/PageTemplate.style';
import useReduxState from 'hooks/useReduxState';
import { ROUTE } from 'route';
import { Outlet } from 'react-router-dom';

const userHeaderLinks = [
  { path: ROUTE.shoppingCart.path, name: '장바구니' },
  { path: ROUTE.orderList.path, name: '주문목록' },
];
const nonUserHeaderLinks = [
  { path: ROUTE.login.path, name: '로그인' },
  { path: ROUTE.register.path, name: '회원가입' },
];

function PageTemplate() {
  const [isLoggedIn] = useReduxState(({ user }) => user.isLoggedIn);

  return (
    <div className="app">
      <Header navLinkInfo={isLoggedIn ? userHeaderLinks : nonUserHeaderLinks} />
      <Styled.Main>
        <Outlet />
      </Styled.Main>
    </div>
  );
}

export default PageTemplate;
