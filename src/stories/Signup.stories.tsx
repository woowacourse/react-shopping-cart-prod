import { ComponentMeta, ComponentStory } from '@storybook/react';
import Signup from 'pages/Signup';
import React from 'react';

export default {
  component: Signup,
  title: 'Signup',
} as ComponentMeta<typeof Signup>;

const Template = args => <Signup {...args} />;

export const Default: ComponentStory<typeof Signup> = Template.bind({});
