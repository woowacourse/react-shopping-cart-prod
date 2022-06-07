import authHandlers from './authHandlers';
import cartHandlers from './cartHandlers';
import productsHandlers from './productsHandlers';

const handlers = [...productsHandlers, ...authHandlers, ...cartHandlers];

export { handlers };
