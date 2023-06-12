import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';
import { handlers } from '@mocks/handlers';

const meta = {
  component: Header,
  title: 'Header',
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
