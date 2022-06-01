import React from 'react';

import { Header } from 'components/common';

import * as Styled from 'components/common/PageTemplate/PageTemplate.style';
import useReduxState from 'hooks/useReduxState';
import { Outlet } from 'react-router-dom';

function PageTemplate() {
  const [isLoggedIn] = useReduxState(({ user }) => user.isLoggedIn);

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} />
      <Styled.Main>
        <Outlet />
      </Styled.Main>
    </div>
  );
}

export default PageTemplate;
