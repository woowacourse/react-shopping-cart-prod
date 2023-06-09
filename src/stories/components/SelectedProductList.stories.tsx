import { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import SelectedProductList from '../../components/cart/SelectedProductList';
import { cartState, selectedCartItems } from '../../recoil';

const meta = {
  component: SelectedProductList,
  title: 'Components/Cart/SelectedProductList',
  tags: ['autodocs'],
} satisfies Meta<typeof SelectedProductList>;

export default meta;

export const ProductListInCart = () => {
  localStorage.clear();

  useEffect(() => {
    const cart = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: 'PET보틀-정사각(420ml)',
          price: 43400,
          imageUrl: '/assets/product1.svg',
        },
      },
      {
        id: 2,
        quantity: 4,
        product: {
          id: 2,
          name: 'PET보틀-밀크티(370ml)',
          price: 73400,
          imageUrl: '/assets/product2.svg',
        },
      },
    ];
  }, []);

  return <SelectedProductList />;
};

export const NothingInCart = () => {
  const setCart = useSetRecoilState(cartState);
  const setSelectedItems = useSetRecoilState(selectedCartItems);

  useEffect(() => {
    setCart([]);
    setSelectedItems([]);
  }, [setCart, setSelectedItems]);

  return <SelectedProductList />;
};
