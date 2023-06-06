import type { Meta, StoryObj } from '@storybook/react';

import OrderDetailList from '../../components/orderDetail/OrderDetailList/OrderDetailList';
import { ORDERS_LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import { saveToLocalStorage } from '../../utils/localStorage';
import { mockOrderList } from '../mocks/mockOrderList';

const meta = {
  title: 'ShoppingCart/OrderDetail/OrderDetailList',
  component: OrderDetailList,
  argTypes: {
    orderId: {
      control: false,
    },
  },
  args: {
    orderId: 1685433648003,
  },
  decorators: [
    (Story) => {
      saveToLocalStorage(ORDERS_LOCAL_STORAGE_KEY, mockOrderList);

      return <Story />;
    },
  ],
} satisfies Meta<typeof OrderDetailList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
