import { ComponentMeta, ComponentStory } from '@storybook/react';
import Login from 'pages/Login';
import React from 'react';

export default {
  component: Login,
  title: 'Login',
} as ComponentMeta<typeof Login>;

const Template = args => <Login {...args} />;

export const Default: ComponentStory<typeof Login> = Template.bind({});
