import { Meta, StoryObj } from '@storybook/react';
import EmptyCartSection from './EmptyCartSection';

const meta = {
  component: EmptyCartSection,
  title: 'EmptyCartSection',
} satisfies Meta<typeof EmptyCartSection>;

export default meta;
type Story = StoryObj<typeof EmptyCartSection>;

export const Default: Story = {
  render: () => <EmptyCartSection />,
};
