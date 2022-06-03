import { setupWorker } from 'msw';
import productHandlers from './productHandlers';
import userHandlers from './userHandlers';

export default setupWorker(...productHandlers, ...userHandlers);
