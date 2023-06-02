import { cartHandlers } from './cart';
import { orderHandlers } from './order';
import { productsHandlers } from './products';

export const handlers = [...productsHandlers, ...cartHandlers, ...orderHandlers];
