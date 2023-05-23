import useCartItems from '@Hooks/useCartItems';

import CartItem from '../CartItem';

function CartItems() {
  const { cartItems } = useCartItems();

  return (
    <>
      {cartItems?.map((item) => (
        <CartItem cartId={item.id} product={item.product} key={item.product.id} />
      ))}
    </>
  );
}

export default CartItems;
