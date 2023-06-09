import { CART_LIST_SKELETON_ITEM_LENGTH } from '../../../constants/ui';
import CartItemSkeleton from '../CartItem/CartItemSkeleton';
import * as S from './CartList.styles';

const CartListSkeleton = () => {
  return (
    <S.ListContainer>
      {Array.from({ length: CART_LIST_SKELETON_ITEM_LENGTH }, (_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </S.ListContainer>
  );
};

export default CartListSkeleton;
