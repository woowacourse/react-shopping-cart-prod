import cartHandlers from 'mocks/handlers/cart.handler';
import productHandlers from 'mocks/handlers/product.handler';
import userHandlers from 'mocks/handlers/user.handler';

export default [...productHandlers, ...cartHandlers, ...userHandlers];
