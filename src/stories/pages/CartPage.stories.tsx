import { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Header from '../../components/common/Header';
import productList from '../../mock/productList.json';
import CartPage from '../../pages/CartPage';
import { cartState, checkedItemList, totalPriceSelector } from '../../recoil';
import { Order } from '../components/Order.stories';
import { ProductListInCart } from '../components/SelectedProductList.stories';

const meta = {
  component: CartPage,
  title: 'Pages/CartPage',
  decorators: [
    (Story) => (
      <>
        <Header title='STORE' />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof CartPage>;

export default meta;

export const Cart = () => {
  const setCart = useSetRecoilState(cartState);
  const setCheckedItems = useSetRecoilState<number[]>(checkedItemList);

  useEffect(() => {
    setCart([
      { id: 1, quantity: 2, product: productList[0] },
      { id: 2, quantity: 3, product: productList[1] },
      { id: 3, quantity: 1, product: productList[2] },
      { id: 4, quantity: 10, product: productList[3] },
    ]);
    setCheckedItems([1, 2, 3, 4]);
  }, [setCart, setCheckedItems]);

  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <div style={{ width: '1270px', display: 'flex', justifyContent: 'space-between' }}>
      <ProductListInCart />
      <Order totalPrice={totalPrice} />
    </div>
  );
};
