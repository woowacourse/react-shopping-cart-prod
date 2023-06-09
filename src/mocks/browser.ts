import { setupWorker } from 'msw';
import { productHandler, cartHandler, couponHandler, orderHandler } from './handlers';

export const worker = setupWorker(
  ...productHandler,
  ...cartHandler,
  ...couponHandler,
  ...orderHandler
);

export const startWorker = async () => {
  if (window.location.pathname === '/react-shopping-cart-prod') {
    window.location.pathname += '/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
    },
  });
};
