import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import GlobalStyles from '../src/styles/GlobalStyles';
import type { Preview } from '@storybook/react';
import handler from '../src/mocks/handlers';
import { CheckOutPointCostProvider } from '../src/context/CheckOutPointCostProvider';

const customViewport = {
  Default: {
    name: 'HD',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },

  FHD: {
    name: 'FHD',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },

  tablet: {
    name: 'tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },

  mobile: {
    name: 'mobile',
    styles: {
      width: '380px',
      height: '768px',
    },
  },
};

initialize({ serviceWorker: { url: `${process.env.PUBLIC_URL}/mockServiceWorker.js` } });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: { ...customViewport },
      defaultViewport: 'Default',
    },
    msw: {
      handlers: [...handler],
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <RecoilRoot>
          <CheckOutPointCostProvider>
            <Story />
          </CheckOutPointCostProvider>
        </RecoilRoot>
      </BrowserRouter>
    ),

    mswDecorator,
    withThemeFromJSXProvider({ GlobalStyles }),
  ],
};

export default preview;
