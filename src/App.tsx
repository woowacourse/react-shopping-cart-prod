import LoadingHeader from '@Components/Header/LoadingHeader';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@Components/Header';
import QuickMenu from '@Components/QuickMenu';
import QuickMenuMobile from '@Components/QuickMenuMobile';

import ErrorBoundary from '@Pages/ErrorBoundary';
import NotFound from '@Pages/NotFound';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import localStorageHelper from '@Utils/localStorageHelper';

function App() {
  useEffect(() => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
    if (!localStorageHelper.hasKey('orderItems')) localStorageHelper.setInitValue('orderItems', []);
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
        <Suspense>
          <QuickMenu />
          <QuickMenuMobile />
        </Suspense>
      </CommonPageStyle>
    </>
  );
}

export default App;
