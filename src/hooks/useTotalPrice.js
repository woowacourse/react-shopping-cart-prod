// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTotalPrice = () => {
  const { shoppingCart, order } = useSelector(state => state.cartReducer);

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;
    order.forEach(id => {
      const product = shoppingCart.find(product => product.productId === id);
      if (product) {
        const { price, quantity } = product;
        total += price * quantity;
      }
    });
    return total;
  }, [shoppingCart, order]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  return { totalPrice };
};

export default useTotalPrice;
