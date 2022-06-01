import { setupWorker } from 'msw';
import { handlers } from './handlers';
import { handlers as authHandlers } from './authHandlers';
export const worker = setupWorker(...handlers, ...authHandlers);
