import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/globalStyle';
import type { Decorator, Preview } from '@storybook/react';
import { handlers } from '../src/mocks/handlers';
import { initialize, mswDecorator } from 'msw-storybook-addon';

let options = {};

if (location.hostname === 'gilpop8663.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  };
}

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

export const decorators: Decorator[] = [mswDecorator];

export default preview;
