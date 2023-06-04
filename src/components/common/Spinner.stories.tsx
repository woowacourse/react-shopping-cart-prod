import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import Spinner from './Spinner';

const meta = {
  title: 'common/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '48px',
        }}
      >
        잠시만 기다려주세요! <Story />
      </div>
    ),
  ],
};

export const WithButton: Story = {
  decorators: [
    (Story) => (
      <Button disabled>
        <Story />
      </Button>
    ),
  ],
};
