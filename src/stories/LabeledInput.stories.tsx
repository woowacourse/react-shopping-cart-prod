import { ComponentMeta, ComponentStory } from '@storybook/react';
import LabeledInput from 'components/common/LabeledInput';
import React from 'react';

export default {
  component: LabeledInput,
  title: 'LabeledInput',
} as ComponentMeta<typeof LabeledInput>;

const Template = args => <LabeledInput {...args} />;

export const Default: ComponentStory<typeof LabeledInput> = Template.bind({});
Default.args = {
  label: '이메일',
  placeholder: '이메일 주소를 입력해주세요',
  id: 'email',
  type: 'email',
};
