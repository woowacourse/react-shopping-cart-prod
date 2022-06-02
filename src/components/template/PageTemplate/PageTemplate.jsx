import React from 'react';

import Header from 'components/template/Header/Header';

import * as S from 'components/template/PageTemplate/PageTemplate.style';
import useReduxState from 'hooks/useReduxState';
import { Outlet } from 'react-router-dom';
import { isLoggedInSelector } from 'store/selector';

function PageTemplate() {
  const [isLoggedIn] = useReduxState(isLoggedInSelector);

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} />
      <S.Main>
        <Outlet />
      </S.Main>
    </div>
  );
}

export default PageTemplate;
