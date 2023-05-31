import type { Meta, StoryObj } from '@storybook/react';
import Providers from '../../stories/Providers';
import { UserSelector } from '.';

const meta = {
  component: UserSelector,
  title: 'UserSelector',
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Story />
        </div>
      </Providers>
    ),
  ],
} satisfies Meta<typeof UserSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
