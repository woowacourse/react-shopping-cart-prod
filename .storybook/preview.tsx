import React from 'react';
import type { Preview } from '@storybook/react';
import { styled } from 'styled-components';
import { GlobalStyle } from '../src/GlobalStyle';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { handlers } from '../src/mock/handlers/index';

let options = {};
if (location.hostname === 'feb-dain.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  };
}

initialize(options);

const preview: Preview = {
  parameters: {
    msw: handlers,
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      defaultViewport: 'Desktop',
      viewports: {
        iphone6: {
          name: 'iPhone SE',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        ipad: {
          name: 'IPad',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#fff',
        },
        {
          name: 'black',
          value: '#000',
        },
      ],
    },
  },

  decorators: [
    (Story) => (
      <RecoilRoot>
        <GlobalStyle />
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </RecoilRoot>
    ),
    mswDecorator,
  ],
};

export default preview;
