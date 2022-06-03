import { setupWorker } from 'msw';
import { productHandler, authHandler, customerHandler } from './handlers';

export const worker = setupWorker(...productHandler, ...authHandler, ...customerHandler);
