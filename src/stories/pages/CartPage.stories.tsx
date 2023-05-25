import { Meta } from '@storybook/react';
import CartPage from '../../pages/CartPage';
const meta = {
  component: CartPage,
  title: 'Pages/CartPage',
} satisfies Meta<typeof CartPage>;

export default meta;

export const Cart = () => {
  return (
    <div style={{ width: '1270px' }}>
      <CartPage />
    </div>
  );
};
