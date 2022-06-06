import customerHandlers from 'mocks/handlers/customers';

import SigninPage from 'pages/SigninPage/SigninPage';

export default {
  title: 'Page/SigninPage',
  component: SigninPage,
};

function Template(args) {
  return <SigninPage {...args} />;
}

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: {
      customers: customerHandlers,
    },
  },
};
