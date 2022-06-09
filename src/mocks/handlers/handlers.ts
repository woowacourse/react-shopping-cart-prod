import authHandlers from './authHandlers';
import productsHandlers from './productsHandlers';

const handlers = [...productsHandlers, ...authHandlers];

export { handlers };
