import { Meta } from '@storybook/react';
import OrderDetailComponent from '../../components/orderDetail/OrderDetail';

const meta = {
  component: OrderDetailComponent,
  title: 'Components/OrderDetail',
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
} satisfies Meta<typeof OrderDetailComponent>;

export default meta;

export const OrderDetail = (args: { totalPrice: number }) => {
  return <OrderDetailComponent {...args} />;
};
