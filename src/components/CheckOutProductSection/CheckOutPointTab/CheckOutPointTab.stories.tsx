import { Meta, StoryObj } from '@storybook/react';
import CheckOutPointTab from './CheckOutPointTab';
import { CheckOutPointCostProvider } from 'context/CheckOutPointCostProvider';

const meta = {
  component: CheckOutPointTab,
  title: 'CheckOutPointTab',
  decorators: [
    (Story) => (
      <CheckOutPointCostProvider>
        <Story />
      </CheckOutPointCostProvider>
    ),
  ],
} satisfies Meta<typeof CheckOutPointTab>;

export default meta;
type Story = StoryObj<typeof CheckOutPointTab>;

export const Default: Story = {
  render: () => <CheckOutPointTab />,
};
