import { useSelector } from 'react-redux';

const useCart = id => {
  const { shoppingCart } = useSelector(state => state.cartReducer);

  const isInCart = shoppingCart.some(product => product.productId === id);
  const productInCart = shoppingCart.find(product => product.productId === id);

  return [isInCart, productInCart];
};

export default useCart;
