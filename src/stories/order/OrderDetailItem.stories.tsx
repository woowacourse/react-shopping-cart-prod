import type { Meta, StoryObj } from '@storybook/react';
import OrderDetailItem from '../../components/order/OrderDetailItem';

const meta = {
  title: 'ShoppingCart/order/OrderDetailItem',
  component: OrderDetailItem,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof OrderDetailItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderDetail: {
      id: 1,
      orderNumber: 1,
      date: '2023-05-30',
      deliveryFee: 3000,
      usingCouponName: '신규 가입 할인 쿠폰',
      discountPrice: 3000,
      beforeDiscountPrice: 204900,
      totalOrderPrice: 201900,
      products: [
        {
          id: 1,
          name: '지구',
          price: 1000,
          imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
          quantity: 1,
        },
        {
          id: 2,
          name: '화성',
          price: 200000,
          imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
          quantity: 1,
        },
        {
          id: 3,
          name: '달',
          price: 300,
          imageUrl: 'https://cdn.pixabay.com/photo/2016/04/02/19/40/moon-1303512__480.png',
          quantity: 3,
        },
      ],
    },
  },
};
