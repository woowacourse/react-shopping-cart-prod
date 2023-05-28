import { cartHandlers } from './cart';
import { memberHandlers } from './member';
import { orderHandlers } from './order';
import { productHandlers } from './product';

const handlers = [...productHandlers, ...cartHandlers, ...orderHandlers, ...memberHandlers];

export { handlers };
