import React from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../src/GlobalStyle';
import type { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import storybookHandlers from '../src/mocks/storybookHandlers';

initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: storybookHandlers,
  },
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <RecoilRoot>
        <GlobalStyle />
        <Story />
      </RecoilRoot>
    </MemoryRouter>
  ),
  mswDecorator,
];

export default preview;
