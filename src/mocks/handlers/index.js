import cartHandlers from './cart';
import membersHandlers from './members';
import productsHandlers from './products';

export const handlers = [...productsHandlers, ...cartHandlers, ...membersHandlers];
