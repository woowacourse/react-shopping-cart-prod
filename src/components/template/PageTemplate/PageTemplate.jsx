import React from 'react';
import { Outlet } from 'react-router-dom';

import { isLoggedInSelector } from 'store/selector';

import useReduxState from 'hooks/useReduxState';

import Header from 'components/template/Header/Header';
import * as S from 'components/template/PageTemplate/PageTemplate.style';

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
