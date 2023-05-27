import type { Meta, StoryObj } from '@storybook/react';
import { SelectBox } from '.';

const meta = {
  component: SelectBox,
  title: 'SelectBox',
} satisfies Meta<typeof SelectBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    options: [
      {
        value: 'wuga',
        name: '우가',
      },
      {
        value: 'test',
        name: '우스',
      },
    ],
  },
} satisfies Story;
