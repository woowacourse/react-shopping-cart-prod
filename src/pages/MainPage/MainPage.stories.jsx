import productsHandlers from 'mocks/handlers/products';

import MainPage from 'pages/MainPage/MainPage';

export default {
  title: 'Page/MainPage',
  component: MainPage,
};

function Template(args) {
  return <MainPage {...args} />;
}

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: {
      products: productsHandlers,
    },
  },
};
