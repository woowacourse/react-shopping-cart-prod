import { authHandler } from './auth';
import { cartHandler } from './shopping-cart';

export const handlers = [...cartHandler, ...authHandler];
