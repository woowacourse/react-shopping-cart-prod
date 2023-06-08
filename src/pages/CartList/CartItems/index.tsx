import { useRecoilValue } from 'recoil';

import EmptyProduct from '@Components/EmptyProduct';

import cartItemsState from '@Atoms/cartItemsState';

import * as S from './style';
import CartItem from '../CartItem';

function CartItems() {
  const cartItems = useRecoilValue(cartItemsState);

  if (cartItems.length === 0) return <EmptyProduct text="장바구니에 담긴 상품이 없습니다." />;

  return (
    <S.CartListLayout>
      {cartItems?.map((item) => (
        <CartItem cartId={item.id} product={item.product} key={item.product.id} />
      ))}
    </S.CartListLayout>
  );
}

export default CartItems;
