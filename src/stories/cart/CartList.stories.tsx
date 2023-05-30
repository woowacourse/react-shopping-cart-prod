import { Meta, StoryObj } from '@storybook/react';

import CartList from '../../components/cart/CartList/CartList';
import CartListSkeleton from '../../components/cart/CartList/CartListSkeleton';
import { CART_LIST_LOCAL_STORAGE_KEY } from '../../constants/localStorage';
import { saveToLocalStorage } from '../../utils/localStorage';

const meta = {
  title: 'ShoppingCart/Cart/CartList',
  component: CartList,
} satisfies Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartListData = [
  {
    id: 1684161725526,
    quantity: 7,
    product: {
      id: 1,
      name: '종이용기(1100cc)-단골이 됐으면 좋겠다',
      price: 61100,
      discountRate: 0,
      discountedPrice: 61100,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/cba783a5-b35d-4b9d-b58e-56801594351f.jpg?h=400&w=400',
    },
  },
  {
    id: 1684161727333,
    quantity: 1,
    product: {
      id: 2,
      name: '올인원 세트-물티수저',
      price: 57600,
      discountRate: 0,
      discountedPrice: 57600,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg?h=400&w=400',
    },
  },
  {
    id: 1684161728982,
    quantity: 1,
    product: {
      id: 3,
      name: '종이용기(900cc)-너무맛있겠다',
      price: 60000,
      discountRate: 5,
      discountedPrice: 57000,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/4ece565d-7fbf-4af4-b4a0-e545c15eda10.jpg?h=400&w=400',
    },
  },
];

export const Default: Story = {
  decorators: [
    (Story) => {
      saveToLocalStorage(CART_LIST_LOCAL_STORAGE_KEY, mockCartListData);

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
