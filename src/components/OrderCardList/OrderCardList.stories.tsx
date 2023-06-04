import { Meta, StoryObj } from '@storybook/react';
import OrderCardList from './OrderCardList';

const meta = {
  component: OrderCardList,
  title: 'order-list-page/OrderCardList',
} satisfies Meta<typeof OrderCardList>;

export default meta;
type Story = StoryObj<typeof OrderCardList>;

export const Default: Story = {
  render: () => <OrderCardList />,
};
