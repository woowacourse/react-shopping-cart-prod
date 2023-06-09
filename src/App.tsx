import LoadingHeader from '@Components/Header/LoadingHeader';
import EmptyQuickMenu from '@Components/QuickMenu/empty';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from '@Components/Header';
import QuickMenu from '@Components/QuickMenu';
import QuickMenuMobile from '@Components/QuickMenuMobile';

import ErrorBoundary from '@Pages/ErrorBoundary';
import NotFound from '@Pages/NotFound';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import localStorageHelper from '@Utils/localStorageHelper';

import { theme } from './style';

if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
if (!localStorageHelper.hasKey('orderItems')) localStorageHelper.setInitValue('orderItems', []);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Suspense fallback={<LoadingHeader />}>
          <Header />
        </Suspense>
        <CommonPageStyle>
          <ErrorBoundary fallback={NotFound}>
            <Outlet />
          </ErrorBoundary>
          <Suspense>
            <ErrorBoundary fallback={EmptyQuickMenu}>
              <QuickMenu />
              <QuickMenuMobile />
            </ErrorBoundary>
          </Suspense>
        </CommonPageStyle>
      </ThemeProvider>
    </>
  );
}

export default App;
