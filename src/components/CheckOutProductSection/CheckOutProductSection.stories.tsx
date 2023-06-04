import { Meta, StoryObj } from '@storybook/react';
import CheckOutProductSection from './CheckOutProductSection';

const meta = {
  component: CheckOutProductSection,
  title: 'CheckOutProductSection',
} satisfies Meta<typeof CheckOutProductSection>;

export default meta;
type Story = StoryObj<typeof CheckOutProductSection>;

export const Default: Story = {
  render: () => <CheckOutProductSection />,
};
