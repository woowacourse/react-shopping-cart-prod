import type { Meta, StoryObj } from '@storybook/react';

import Header from '../../components/common/Header/Header';

const meta = {
  title: 'ShoppingCart/Common/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
