import type { Preview } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/globalStyle';
import { worker } from '../src/mocks/browser';

import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';

let options = {};
// if (location.hostname === 'ukkodeveloper.github.io') {
//   options = {
//     serviceWorker: {
//       url: '/repo-name/mockServiceWorker.js',
//     },
//   };
// }

initialize(options);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: handlers,
  },

  decorators: [
    mswDecorator,
    (Story) => (
      <RecoilRoot>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Story />
          </ThemeProvider>
        </BrowserRouter>
      </RecoilRoot>
    ),
  ],
};

export default preview;
