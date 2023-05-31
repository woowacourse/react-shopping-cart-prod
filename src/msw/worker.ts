import { setupWorker } from 'msw';
import { getHandlers, postHandlers, deleteHandlers, patchHandlers, putHandlers } from './index';

export const worker = setupWorker(
  ...getHandlers,
  ...postHandlers,
  ...deleteHandlers,
  ...patchHandlers,
  ...putHandlers
);
