import { Meta } from '@storybook/react';
import OrderItemComponent from '../../components/orderList/OrderItem';
import productList from '../../mock/productList.json';
import { Cart } from '../../types';

const meta = {
  component: OrderItemComponent,
  title: 'Components/OrderList/OrderItem',
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
  args: {
    id: 1,
    imageUrl: `${productList[0].imageUrl}`,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    quantity: 3,
  },

  argTypes: {
    id: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 고유한 `id`입니다.',
    },

    imageUrl: {
      options: Array.from({ length: 11 })
        .map((_, index) => ({
          [`product${index + 1}`]: productList[index].imageUrl,
        }))
        .reduce((acc, cur) => {
          return { ...acc, ...cur };
        }, {}),
      control: {
        type: 'select',
      },
      description: '상품의 사진을 바꿀 수 있습니다.',
    },

    name: {
      description: '상품의 이름을 설정할 수 있습니다.',
    },

    price: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 가격을 설정할 수 있습니다.',
    },

    quantity: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 수량을 바꿀 수 있습니다.<br> 수량을 변경하면 상품의 가격도 변경됩니다.',
    },
  },
} satisfies Meta<typeof OrderItemComponent>;

export default meta;

export const OrderItem = (args: Cart) => {
  return <OrderItemComponent {...args} />;
};
