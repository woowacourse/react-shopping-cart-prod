// @ts-nocheck
import { useSelector } from 'react-redux';

const useCartStore = id => {
  const { shoppingCart } = useSelector(state => state.cartReducer);

  const isInCart = shoppingCart.some(product => product.productId === id);
  const product = shoppingCart.find(product => product.productId === id);

  return [isInCart, product];
};

export default useCartStore;
