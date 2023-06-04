import { Meta, StoryObj } from '@storybook/react';
import EmptyDataCard from './EmptyDataCard';

const meta = {
  component: EmptyDataCard,
  title: 'EmptyCartSection',
} satisfies Meta<typeof EmptyDataCard>;

export default meta;
type Story = StoryObj<typeof EmptyDataCard>;

export const Default: Story = {
  render: () => <EmptyDataCard />,
};
