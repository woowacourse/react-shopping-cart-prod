import { setupWorker } from 'msw';

import {
  productHandlers,
  cartProductHandlers,
  couponHandlers,
  orderHandlers,
} from './handlers';

// Configure the Service Worker for in-browser request interception
export const worker = setupWorker(
  ...productHandlers,
  ...cartProductHandlers,
  ...couponHandlers,
  ...orderHandlers
);
