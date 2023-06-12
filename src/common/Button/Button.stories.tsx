import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta = {
  component: Button,
  title: 'Button',
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LargeSecondary = {
  args: {
    size: 'l',
    primary: false,
    children: '안녕하세요',
  },
} satisfies Story;

export const LargePrimary = {
  args: {
    size: 'l',
    primary: true,
    children: '안녕하세요',
  },
} satisfies Story;

export const MediumPrimary = {
  args: {
    size: 'm',
    primary: true,
    children: '안녕하세요',
  },
} satisfies Story;

export const MediumDisabled = {
  args: {
    size: 'm',
    primary: true,
    children: '안녕하세요',
    disabled: true,
  },
} satisfies Story;
