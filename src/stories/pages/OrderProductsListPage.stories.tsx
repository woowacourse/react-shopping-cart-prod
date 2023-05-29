import { Meta, StoryObj } from '@storybook/react';

import OrderProductsListPage from '../../pages/OrderProductsListPage';

const meta = {
  title: 'Pages/OrderProductsListPage',
  component: OrderProductsListPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof OrderProductsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
