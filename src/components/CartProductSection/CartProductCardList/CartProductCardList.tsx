import CartProductCard from './CartProductCard/CartProductCard';
import { useRecoilValue } from 'recoil';
import { cartProductsState } from 'state/cartProducts';
import Box from 'components/@common/Box';

const CartProductCardList = () => {
  const cartProducts = useRecoilValue(cartProductsState);

  return (
    <Box sizing={{ width: '100%' }} flex={{ flexDirection: 'column' }} role="list">
      {[...cartProducts.entries()].map(([id, cartProduct]) => (
        <CartProductCard key={id} cartProduct={cartProduct} />
      ))}
    </Box>
  );
};

export default CartProductCardList;
