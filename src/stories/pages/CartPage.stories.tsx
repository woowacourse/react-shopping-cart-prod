import { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Header from '../../components/common/Header';
import productList from '../../mock/productList.json';
import CartPage from '../../pages/CartPage';
import { cartState, checkedItemList, selectedCoupon, totalPriceSelector } from '../../recoil';
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
  const setCheckedItemIdList = useSetRecoilState<number[]>(checkedItemList);

  useEffect(() => {
    setCart([
      { id: 1, quantity: 2, product: productList[0] },
      { id: 2, quantity: 3, product: productList[1] },
      { id: 3, quantity: 1, product: productList[2] },
      { id: 4, quantity: 10, product: productList[3] },
    ]);
    setCheckedItemIdList([1, 2, 3, 4]);
  }, [setCart, setCheckedItemIdList]);

  const totalPrice = useRecoilValue(totalPriceSelector);
  const coupon = useRecoilValue(selectedCoupon);

  return (
    <S.Wrapper>
      <ProductListInCart />
      <Order totalPrice={totalPrice} priceDiscount={coupon.priceDiscount} />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    width: 1270px;
    margin: 36px 30px 0 0;

    @media (max-width: 1270px) {
      flex-direction: column;
      margin-right: 0;

      & section {
        max-width: 100%;
      }

      & section:last-child {
        margin: 30px 0 80px;
      }
    }
  `,
};
