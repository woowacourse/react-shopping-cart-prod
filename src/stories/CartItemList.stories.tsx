import { Meta } from '@storybook/react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { GlobalStyle } from '../GlobalStyle';
import { CartItemsSection } from '../components/cartPage/cartItemsSection/CartItemsSection';
import { CartItemDetail, cartItemsState } from '../recoil/atoms/cartAtom';
import { useEffect } from 'react';
import { useMockData } from '../hooks/useMockData';
import { APIAtom } from '../recoil/atoms/serverAtom';

const meta = {
  title: 'CartItems',
  component: CartItemsSection,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <Story />
          <GlobalStyle />
        </RecoilRoot>
      );
    },
  ],
} as Meta;

export default meta;

export const CartItemsComponent = () => {
  const apiEndPoint = useRecoilValue(APIAtom);
  const setCartItems = useSetRecoilState(cartItemsState(apiEndPoint));
  const { mockData } = useMockData();

  useEffect(() => {
    setCartItems(() => {
      const cartItems: CartItemDetail[] = [];

      Array.from({ length: 5 }).forEach((_, index) => {
        cartItems.push({
          id: index,
          quantity: Math.round(Math.random() * 10) + 1,
          product: mockData[index],
        });
      });

      return cartItems;
    });
  }, []);

  return <CartItemsSection />;
};
