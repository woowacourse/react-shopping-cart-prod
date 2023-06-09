import { cartSelector } from '../../../atoms/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import * as S from './CartBadge.styles';

const CartBadge = () => {
  const cartItemsAmount = useRefreshableRecoilValue(cartSelector).length;

  return cartItemsAmount ? <S.Badge>{cartItemsAmount}</S.Badge> : null;
};

export default CartBadge;
