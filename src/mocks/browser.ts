import { cartHandlers } from '@/mocks/handlers/cart';
import { customerHandlers } from '@/mocks/handlers/customer';
import { productHandlers } from '@/mocks/handlers/product';
import { setupWorker } from 'msw';
import { orderListHandlers } from '@/mocks/handlers/orderList';

export const worker = setupWorker(
  ...cartHandlers,
  ...customerHandlers,
  ...productHandlers,
  ...orderListHandlers,
);
