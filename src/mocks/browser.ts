import { cartHandlers } from '@/mocks/handlers/cart';
import { customerHandlers } from '@/mocks/handlers/customer';
import { productHandlers } from '@/mocks/handlers/product';
import { setupWorker } from 'msw';

export const worker = setupWorker(...cartHandlers, ...customerHandlers, ...productHandlers);
