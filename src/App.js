import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

import Router from './Router';

import * as API from './service';

const App = () => {
  API.initToken();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
