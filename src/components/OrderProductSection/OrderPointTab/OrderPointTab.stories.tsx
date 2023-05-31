import { Meta, StoryObj } from '@storybook/react';
import OrderPointTab from './OrderPointTab';
import { OrderPointCostProvider } from 'context/OrderPointCostProvider';

const meta = {
  component: OrderPointTab,
  title: 'OrderPointTab',
  decorators: [
    (Story) => (
      <OrderPointCostProvider>
        <Story />
      </OrderPointCostProvider>
    ),
  ],
} satisfies Meta<typeof OrderPointTab>;

export default meta;
type Story = StoryObj<typeof OrderPointTab>;

export const Default: Story = {
  render: () => <OrderPointTab />,
};
