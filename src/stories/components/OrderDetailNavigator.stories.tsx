import { Meta } from '@storybook/react';
import OrderDetailNavigatorComponent from '../../components/orderList/OrderDetailNavigator';

const meta = {
  component: OrderDetailNavigatorComponent,
  title: 'Components/OrderList/OrderDetailNavigator',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 'calc(100vw - 32vw)' }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof OrderDetailNavigatorComponent>;

export default meta;

export const OrderDetailNavigator = () => {
  return <OrderDetailNavigatorComponent orderId={1} />;
};
