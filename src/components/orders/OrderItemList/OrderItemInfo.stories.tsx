import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import OrderItemInfo from './OrderItemInfo';

const meta = {
  component: OrderItemInfo,
  title: 'OrderItemInfo',
} satisfies Meta<typeof OrderItemInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '친환경 실링용기-ECO 19153',
    imageUrl: MOCK_PRODUCT_LIST[0].imageUrl,
    price: 180600,
    quantity: 3,
  },
};
