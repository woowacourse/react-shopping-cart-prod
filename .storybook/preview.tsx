import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/globalStyle';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
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

export default preview;
