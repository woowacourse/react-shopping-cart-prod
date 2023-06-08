import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/worker';

import '../public/assets/logoWhite.svg';
import '../public/assets/logoBlack.svg';
import '../public/assets/cart.svg';
import '../public/assets/arrowUp.svg';
import '../public/assets/arrowDown.svg';
import '../public/assets/trashCan.svg';
import '../public/assets/whiteCheck.svg';
import '../public/assets/404.svg';
import '../public/assets/emptyProduct.svg';
import '../public/assets/shoppingBag.svg';

worker.start();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
