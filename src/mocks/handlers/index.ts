import cartHandlers from 'mocks/handlers/cart';
import customerHandlers from 'mocks/handlers/customers';
import productsHandlers from 'mocks/handlers/products';

const handlers = [...customerHandlers, ...productsHandlers, ...cartHandlers];

export default handlers;
