import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { FallbackRender } from '@components/FallbackRender/FallbackRender';

import { RecoilRoot } from 'recoil';

import { App } from './App';

import { worker } from './msw/worker';

(async () => {
  if (process.env.REACT_APP_API_DEFAULT) {
    return;
  }

  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname += '/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });
})();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Suspense>
          <App />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </React.StrictMode>
);
