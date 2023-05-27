import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateCartItem } from '../api/cartList';
import { cartAtom, cartSelectorFamily } from '../store/cart';
import { Product } from '../types/product';

const useCartAtom = (id: number, product?: Product) => {
  let name: string;
  let imageUrl: string;
  let price: number;

  if (product) {
    name = product.name;
    imageUrl = product.imageUrl;
    price = product.price;
  }

  const setCart = useSetRecoilState(cartAtom);
  const productInCart = useRecoilValue(cartSelectorFamily(id));
  const [count, setCount] = useState(productInCart?.quantity);

  const minusOneWhenOverOne = () => {
    if (count - 1 === 0) {
      setCount(1);
      return;
    }
    updateCartItem(id, count - 2);
    setCount(count);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: count - 1 } : item
      )
    );
  };

  const removeCartItemFromAtom = () => {
    setCart((prev) => [...prev.filter((item) => item.id !== id)]);
  };

  return {
    count,
    productInCart,
    removeCartItemFromAtom,
    minusOneWhenOverOne,
  };
};

export default useCartAtom;
