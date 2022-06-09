import { handlers } from './handlers/handlers';
import { setupWorker } from 'msw';

const worker = setupWorker(...handlers);

export { worker };
