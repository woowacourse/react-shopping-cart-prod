import { cartHanlders } from '@/mocks/handlers/cart';
import { customerHanlders } from '@/mocks/handlers/customer';
import { orderHanlders } from '@/mocks/handlers/order';
import { productHanlders } from '@/mocks/handlers/product';
import { setupWorker } from 'msw';

export const worker = setupWorker();
