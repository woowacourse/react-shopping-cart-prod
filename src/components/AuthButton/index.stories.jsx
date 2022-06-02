import AuthButton from '.';

export default {
  title: 'Components/AuthButton',
  component: AuthButton,
};

const Template = args => <AuthButton {...args} />;

export const AuthButtonTemplate = Template.bind({});
AuthButtonTemplate.args = {
  actionType: 'Login',
  action: () => {},
  isDisabled: true,
};
