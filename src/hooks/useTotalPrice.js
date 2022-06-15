// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTotalPrice = () => {
  const { shoppingCart, order } = useSelector(state => state.cartReducer);

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    return order.reduce((total, currentId) => {
      const product = shoppingCart.find(product => product.productId === currentId);
      return total + product.price * product.quantity;
    }, 0);
  }, [shoppingCart, order]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  return { totalPrice };
};

export default useTotalPrice;
