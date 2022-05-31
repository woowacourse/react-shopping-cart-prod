import React from 'react';

import SignUpForm from 'components/SignUpForm';

export default {
  title: 'Template/SignUpForm',
  component: SignUpForm,
};

const Template = (args) => <SignUpForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: '회원가입',
  userName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
