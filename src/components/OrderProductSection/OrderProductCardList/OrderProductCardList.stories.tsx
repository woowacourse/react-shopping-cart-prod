import { Meta, StoryObj } from '@storybook/react';
import OrderProductCardList from './OrderProductCardList';

const meta = {
  component: OrderProductCardList,
  title: 'OrderProductCardList',
} satisfies Meta<typeof OrderProductCardList>;

export default meta;
type Story = StoryObj<typeof OrderProductCardList>;

export const Default: Story = {
  render: () => <OrderProductCardList />,
};
