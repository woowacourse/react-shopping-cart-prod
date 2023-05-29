import OrderItem from 'src/components/OrderItem';
import handlers from 'src/mocks/handlers';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof OrderItem>;
const meta: Meta<typeof OrderItem> = {
  title: 'Order/OrderItem',
  component: OrderItem,
};
export default meta;

export const Default: Story = {
  args: {
    order: {
      id: 1,
      orderTime: '2023-05-26T18:25:43.511Z',
      productList: [
        {
          name: '뽀로로 튼튼한 성장기 어린이 음료 235mL',
          totalPrice: 2550,
          quantity: 3,
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrv1JEzSxNjrQgR2VcpDw5wUJV4_RiJEwRb-gn2-Q&s',
        },
        {
          name: '데자와 민트초코 밀크티 ',
          totalPrice: 50000,
          quantity: 4,
          imageUrl:
            'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2020%2F11%2Ftejava-mint-chocolate-milk-tea-2020-release-info-1.jpg?q=90&w=1400&cbr=1&fit=max',
        },
      ],
    },
  },
  parameters: {
    msw: handlers,
  },
};
