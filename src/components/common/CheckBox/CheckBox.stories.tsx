import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckBox from './CheckBox';

const CheckBoxWithState = ({ labelText }: { labelText?: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <CheckBox
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
      labelText={labelText}
    />
  );
};

const meta = {
  title: 'CheckBox',
  component: CheckBoxWithState,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    labelText: 'label',
  },
};
