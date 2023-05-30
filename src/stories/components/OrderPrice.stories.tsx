import { Meta } from '@storybook/react';
import OrderPriceComponent from '../../components/orderDetail/OrderPrice';

const meta = {
  component: OrderPriceComponent,
  title: 'Components/OrderDetail/OrderPrice',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 'calc(100vw - 42vw)' }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    totalPrice: 3000,
  },
} satisfies Meta<typeof OrderPriceComponent>;

export default meta;

export const OrderItem = (args: { totalPrice: number }) => {
  return <OrderPriceComponent {...args} />;
};
