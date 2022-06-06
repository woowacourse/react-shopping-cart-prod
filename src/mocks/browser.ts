import handlers from 'mocks/handlers';
import { setupWorker } from 'msw';

const worker = setupWorker(...handlers);

export default worker;
