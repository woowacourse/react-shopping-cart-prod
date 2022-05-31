import AuthButton from '.';

export default {
  AuthButton: 'Components/AuthButton',
  component: AuthButton,
};

const Template = args => <AuthButton {...args} />;

export const AuthButtonTemplate = Template.bind({});
AuthButtonTemplate.args = {
  actionType: 'Login',
  action: () => {
    console.log('hi');
  },
  isDisabled: true,
};
