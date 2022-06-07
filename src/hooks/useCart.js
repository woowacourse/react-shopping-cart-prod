import { useSelector } from 'react-redux';

const useCart = id => {
  const { shoppingCart } = useSelector(state => state.cartReducer);

  const isInCart = shoppingCart.some(product => product.id === id);
  const productInCart = shoppingCart.find(product => product.id === id);

  return [isInCart, productInCart];
};

export default useCart;
