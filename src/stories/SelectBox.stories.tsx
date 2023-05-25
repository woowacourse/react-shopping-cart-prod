import { Meta, StoryObj } from '@storybook/react';

import SelectBox from '../components/Common/SelectBox';

const meta = {
  title: 'Common/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { options: ['아커', '황펭'] },
};
