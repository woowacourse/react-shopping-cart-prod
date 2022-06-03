import cartHandlers from './cart';
import productsHandlers from './products';
import customerHandlers from './customers';

const handlers = [...customerHandlers, ...productsHandlers, ...cartHandlers];

export default handlers;
