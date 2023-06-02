import { setupWorker } from 'msw';
import { productHandler, cartHandler, couponHander } from './handlers';

export const worker = setupWorker(
  ...productHandler,
  ...cartHandler,
  ...couponHander,
);
