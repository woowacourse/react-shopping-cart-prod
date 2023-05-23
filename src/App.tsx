import LoadingHeader from '@Components/Header/LoadingHeader';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@Components/Header';

import ErrorBoundary from '@Pages/ErrorBoundary';
import NotFound from '@Pages/NotFound';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import localStorageHelper from '@Utils/localStorageHelper';

function App() {
  useEffect(() => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<LoadingHeader />}>
        <Header />
      </Suspense>
      <CommonPageStyle>
        <ErrorBoundary fallback={NotFound}>
          <Outlet />
        </ErrorBoundary>
      </CommonPageStyle>
    </>
  );
}

export default App;
