import type { Preview } from '@storybook/react';
import React from 'react';
import { ResetStyle } from '../src/styles/ResetStyle';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

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
      <>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ResetStyle />
            <Story />
          </RecoilRoot>
        </QueryClientProvider>
      </>
    ),
  ],
};

export default preview;
