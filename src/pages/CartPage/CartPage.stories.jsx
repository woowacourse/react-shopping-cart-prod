import cartHandlers from '../../mocks/handlers/cart';
import CartPage from './CartPage';

export default {
  title: 'Page/CartPage',
  component: CartPage,
};

function Template(args) {
  return <CartPage {...args} />;
}

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: {
      cart: cartHandlers,
    },
  },
};
