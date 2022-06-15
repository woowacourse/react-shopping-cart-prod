import { setupWorker } from 'msw';
import { productHandler, authHandler, customerHandler, cartHandler } from './handlers';

export const worker = setupWorker(
  ...productHandler,
  ...authHandler,
  ...customerHandler,
  ...cartHandler,
);
