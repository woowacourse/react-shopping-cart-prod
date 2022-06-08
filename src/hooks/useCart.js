// @ts-nocheck
import { useSelector } from 'react-redux';

const useCart = id => {
  const { shoppingCart } = useSelector(state => state.reducer);

  const isInCart = shoppingCart.some(product => product.productId === id);
  const product = shoppingCart.find(product => product.productId === id);

  return [isInCart, product];
};

export default useCart;
