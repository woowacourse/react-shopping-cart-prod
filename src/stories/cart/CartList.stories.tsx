import { Meta, StoryObj } from '@storybook/react';

import CartList from '../../components/cart/CartList/CartList';
import CartListSkeleton from '../../components/cart/CartList/CartListSkeleton';
import { CART_LIST_LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import { saveToLocalStorage } from '../../utils/localStorage';
import { mockCartList } from '../mocks/mockCartList';

const meta = {
  title: 'ShoppingCart/Cart/CartList',
  component: CartList,
} satisfies Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      saveToLocalStorage(CART_LIST_LOCAL_STORAGE_KEY, mockCartList);

      return <Story />;
    },
  ],
};

export const Empty: Story = {};

export const Skeleton: Story = {
  render: () => {
    return <CartListSkeleton />;
  },
};
