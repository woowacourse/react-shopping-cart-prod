import { Meta, StoryObj } from '@storybook/react';
import OrderCardList from './OrderCardList';

const meta = {
  component: OrderCardList,
  title: 'OrderCardList',
} satisfies Meta<typeof OrderCardList>;

export default meta;
type Story = StoryObj<typeof OrderCardList>;

export const Default: Story = {
  render: () => <OrderCardList />,
};
