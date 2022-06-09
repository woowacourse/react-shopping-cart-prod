import Routers from 'Router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorPage from 'pages/ErrorPage/ErrorPage.page';

import SnackBar from 'components/@shared/SnakBar/SnackBar.component';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ErrorBoundary fallback={<ErrorPage>오류가 발생했습니다</ErrorPage>}>
          <Routers />
          <SnackBar />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
