import { cartHandlers } from './cart';
import { orderHandlers } from './order';
import { productHandlers } from './product';

const handlers = [...productHandlers, ...cartHandlers, ...orderHandlers];

export { handlers };
