import customerHandlers from '../../mocks/handlers/customers';
import SignupPage from './SignupPage';

export default {
  title: 'Page/SignupPage',
  component: SignupPage,
};

function Template(args) {
  return <SignupPage {...args} />;
}

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: {
      customers: customerHandlers,
    },
  },
};
