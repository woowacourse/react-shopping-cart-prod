import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import handlers from '../src/mocks/handlers';
import worker from '../src/mocks/browser';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import React from 'react';

let options = {};
if (location.hostname === 'hozzijeong.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

// Initialize MSW
initialize(options);

export const decorators = [
  mswDecorator,
  Story => {
    return (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    );
  },
];

const preview: Preview = {
  parameters: {
    msw: handlers,
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      defaultViewport: 'Default',
    },
  },
};

if (typeof global.process === 'undefined') {
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}
