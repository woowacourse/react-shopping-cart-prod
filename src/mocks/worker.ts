import { setupWorker } from 'msw';
import { productHandlers } from './productHandlers';
import { cartHandlers } from './cartHandlers';
import { orderHandlers } from './orderHandlers';

export const worker = setupWorker(
  ...productHandlers,
  ...cartHandlers,
  ...orderHandlers
);
