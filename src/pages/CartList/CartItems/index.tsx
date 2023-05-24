import { useRecoilValue } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

import CartItem from '../CartItem';

function CartItems() {
  const cartItems = useRecoilValue(cartItemsState);

  return (
    <>
      {cartItems?.map((item) => (
        <CartItem cartId={item.id} product={item.product} key={item.product.id} />
      ))}
    </>
  );
}

export default CartItems;
