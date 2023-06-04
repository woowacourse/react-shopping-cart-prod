import { cartHandlers } from './cart';
import { couponHandlers } from './coupon';
import { orderHandlers } from './order';
import { productsHandlers } from './products';

export const handlers = [...productsHandlers, ...cartHandlers, ...orderHandlers, ...couponHandlers];
