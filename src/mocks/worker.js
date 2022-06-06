import { setupWorker } from 'msw';
import handlers from '.';

export const worker = setupWorker(...handlers);
