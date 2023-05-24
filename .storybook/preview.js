import { worker } from '../src/mocks/browser';

// async function main() {
//   const url =
//     location.hostname === 'nlom0218.github.io' ? '/react-shopping-cart/mockServiceWorker.js' : '/mockServiceWorker.js';

//   await worker.start({
//     serviceWorker: { url },
//   });
// }
// main();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <BrowserRouter>{storyFn()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
};
