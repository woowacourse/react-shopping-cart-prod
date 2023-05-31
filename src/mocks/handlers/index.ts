import { productsHandlers } from './products';
import { cartHandlers } from './cart';
import { orderHandlers } from './order';
import { pointHandlers } from './point';

export const handlers = [
  ...productsHandlers,
  ...cartHandlers,
  ...orderHandlers,
  ...pointHandlers,
];
