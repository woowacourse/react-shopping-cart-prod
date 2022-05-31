import GuideText from '.';

export default {
  AuthButton: 'Components/GuideText',
  component: GuideText,
};

const Template = args => <GuideText {...args} />;

export const LoginTemplate = Template.bind({});
LoginTemplate.args = {
  guide: 'Don’t have an account?',
  destination: 'Sign up',
  path: '/signup',
};

export const SignupTemplate = Template.bind({});
SignupTemplate.args = {
  guide: 'Already have an account',
  destination: 'Login',
  path: '/login',
};
