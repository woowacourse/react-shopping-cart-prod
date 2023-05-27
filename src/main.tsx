import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { worker } from './mocks/browser';
import router from './router/router';

import GlobalStyle from './styles/globalStyle';
import { theme } from './styles/theme';

/**
 * 프로젝트 시작할 때 products mock data 준비하도록 설정
 */

async function main() {
  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });
}

// main();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
