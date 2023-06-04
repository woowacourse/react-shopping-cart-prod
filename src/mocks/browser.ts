import { setupWorker } from 'msw';
import { productHandler, cartHandler, couponHandler, orderHandler } from './handlers';

export const worker = setupWorker(
  ...productHandler,
  ...cartHandler,
  ...couponHandler,
  ...orderHandler
);
