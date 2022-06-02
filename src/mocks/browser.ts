// src/mocks/browser.js
import { setupWorker } from 'msw';
import type { SetupWorkerApi } from 'msw';
import { cartListHandler } from './handlers/cartListHandler';
import { userHandlers } from './handlers/userHandler';
import { itemListHandler } from './handlers/itemListHandler';

// This configures a Service Worker with the given request handlers.
export const worker: SetupWorkerApi = setupWorker(
  ...itemListHandler,
  ...cartListHandler,
  ...userHandlers
);
