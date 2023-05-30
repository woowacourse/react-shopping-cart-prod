import { handlers as cartItemsHandlers } from './cart-items';
import { handlers as cartPointsHandlers } from './cart-points';
import { handlers as ordersHandlers } from './orders';
import { handlers as productsHandlers } from './products';
import { handlers as profileHandlers } from './profile';

const handlers = [
  ...profileHandlers,
  ...ordersHandlers,
  ...cartPointsHandlers,
  ...productsHandlers,
  ...cartItemsHandlers,
];

export default handlers;
