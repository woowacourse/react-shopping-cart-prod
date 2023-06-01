import { Meta, StoryObj } from '@storybook/react';

import CartCheckoutBox from '../../components/cart/CartCheckoutBox/CartCheckoutBox';
import {
  CART_LIST_LOCAL_STORAGE_KEY,
  MEMBER_INFORMATION_LOCAL_STORAGE_KEY,
} from '../../constants/localStorage';
import { MEMBER_DISCOUNT_RATE, MEMBER_RANK } from '../../constants/member';
import { MemberInformation } from '../../types/member';
import { saveToLocalStorage } from '../../utils/localStorage';
import { mockCartList } from '../mocks/mockCartList';

const meta = {
  title: 'ShoppingCart/Cart/CartCheckoutBox',
  component: CartCheckoutBox,
} satisfies Meta<typeof CartCheckoutBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const newMember: MemberInformation = {
        id: Number(new Date()),
        rank: MEMBER_RANK[2],
        discountRate: MEMBER_DISCOUNT_RATE[MEMBER_RANK[2]],
      };

      saveToLocalStorage(MEMBER_INFORMATION_LOCAL_STORAGE_KEY, newMember);
      saveToLocalStorage(CART_LIST_LOCAL_STORAGE_KEY, mockCartList);

      return <Story />;
    },
  ],
};

export const Empty: Story = {};
