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
  args: {
    options: [
      { value: '아커', text: '아커' },
      { value: '황펭', text: '황펭' },
    ],
  },
};
