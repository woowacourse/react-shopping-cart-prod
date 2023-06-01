import type { Meta, StoryObj } from '@storybook/react';

import SecondaryButton from '.';

/**
 * `SecondaryButton`은 Button 보다 작은 버튼을 보여주기 위해 사용되는 컴포넌트입니다.
 */
const meta: Meta<typeof SecondaryButton> = {
  title: 'Button/SecondaryButton',
  component: SecondaryButton,
};

export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const DefaultButton: Story = {
  args: {
    text: 'button',
  },
};
