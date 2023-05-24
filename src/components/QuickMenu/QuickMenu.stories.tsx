import type { Meta, StoryObj } from '@storybook/react';

import QuickMenu from '.';

const meta: Meta<typeof QuickMenu> = {
  title: 'QuantityController',
  component: QuickMenu,
};

export default meta;

type Story = StoryObj<typeof QuickMenu>;

export const DefaultQuickMenu: Story = {};
