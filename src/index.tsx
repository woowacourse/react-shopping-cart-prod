import { ModalProvider } from 'noah-modal';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import AllCoupon from '@Components/Modal/AllCoupon';
import MyCoupon from '@Components/Modal/MyCoupon';

import { worker } from './mocks/browser';
import router from './router';

async function main() {
  if (window.location.pathname === '/react-shopping-cart-prod') {
    window.location.pathname = '/react-shopping-cart-prod/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  });

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <RecoilRoot>
        <ModalProvider
          modals={[
            {
              title: '쿠폰 사용하기',
              component: <MyCoupon />,
              name: 'myCoupon',
              delayMsTime: 300,
              position: 'middle',
            },
            {
              title: '쿠폰 발급받기',
              component: <AllCoupon />,
              name: 'allCoupon',
              delayMsTime: 300,
              position: 'middle',
            },
          ]}
        >
          <RouterProvider router={router} />
        </ModalProvider>
      </RecoilRoot>
    </React.StrictMode>,
  );
}

main();
