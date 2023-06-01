import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import storybookHandlers from '../../../mocks/storybookHandlers';

const meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { msw: storybookHandlers },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
