import { setupWorker } from 'msw';
import { product } from 'mocks/handlers/product';
import { cart } from 'mocks/handlers/cart';
import { members } from './handlers/members';

export const worker = setupWorker(...product, ...cart, ...members);
