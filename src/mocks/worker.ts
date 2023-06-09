import { setupWorker } from 'msw';
import { productHandlers } from './productHandlers';
import { cartHandlers } from './cartHandlers';
import { userHandlers } from './userHandlers';
import { orderHandlers } from './orderHandlers';

export const worker = setupWorker(
  ...productHandlers,
  ...cartHandlers,
  ...userHandlers,
  ...orderHandlers
);
