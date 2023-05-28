import { setupWorker } from 'msw';
import { joinPath } from '../api/utils/http';
import { BASE_URL } from '../config/environment';
import handlers from './handlers';

const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: joinPath(BASE_URL, 'mockServiceWorker.js'),
  },
});
