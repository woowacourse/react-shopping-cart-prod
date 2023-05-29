import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import QuickMenu from '.';

const meta: Meta<typeof QuickMenu> = {
  title: 'QuickMenu',
  component: QuickMenu,
  decorators: [
    (storyFn) => (
      <RecoilRoot>
        <BrowserRouter>{storyFn()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof QuickMenu>;

export const DefaultQuickMenu: Story = {};
