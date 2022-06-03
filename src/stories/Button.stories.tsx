import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'components/common/Button';
import React from 'react';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template = args => <Button {...args} />;

export const Default: ComponentStory<typeof Button> = Template.bind({});
Default.args = {
  backgroundColor: 'brown',
};

export const Auth: ComponentStory<typeof Button> = Template.bind({});
Auth.args = {
  backgroundColor: 'primary',
  width: '300px',
  height: '36px',
  children: '확인',
  color: 'white',
  fontSize: '14px',
};
