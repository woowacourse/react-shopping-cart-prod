import { setupWorker } from 'msw';
import { productHandler, cartHandler, couponHandler } from './handlers';

export const worker = setupWorker(...productHandler, ...cartHandler, ...couponHandler);
