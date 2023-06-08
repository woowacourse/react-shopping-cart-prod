import { Meta } from '@storybook/react';
import OrderDetailComponent from '../../components/orderDetail/OrderDetail';
import { ORDER_STATUS } from '../../constants';
import { CouponItem, OrderList } from '../../types';

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
    deliveryFee: 3000,
    coupon: null,
    totalPayments: 6000,
    orderStatus: ORDER_STATUS.PAID,
  },
} satisfies Meta<typeof OrderDetailComponent>;

export default meta;

interface Props extends Pick<OrderList, 'orderStatus'> {
  totalPrice: number;
  deliveryFee: number;
  coupon: CouponItem;
  totalPayments: number;
}

export const OrderDetail = (args: Props) => {
  return <OrderDetailComponent {...args} />;
};
