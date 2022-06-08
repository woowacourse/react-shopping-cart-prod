import cartHandlers from 'mocks/handlers/cart';
import productsHandlers from 'mocks/handlers/products';
import customerHandlers from 'mocks/handlers/customers';

const handlers = [...cartHandlers, ...customerHandlers, ...productsHandlers];

export default handlers;
