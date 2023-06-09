import type { Meta, StoryObj } from '@storybook/react';

import OrderList from '../../components/order/OrderList/OrderList';
import { ORDERS_LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import { saveToLocalStorage } from '../../utils/localStorage';
import { mockOrderList } from '../mocks/mockOrderList';
import { StoryContainerWrapper } from '../styles';

const meta = {
  title: 'ShoppingCart/Order/OrderList',
  component: OrderList,
} satisfies Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      saveToLocalStorage(ORDERS_LOCAL_STORAGE_KEY, mockOrderList);

      return <Story />;
    },
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => {
      return (
        <StoryContainerWrapper>
          <Story />
        </StoryContainerWrapper>
      );
    },
  ],
};
