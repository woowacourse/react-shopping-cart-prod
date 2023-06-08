import useCartItems from '@Hooks/useCartItems';

import * as S from './style';

function CartAmount({ isLoading = false }: { isLoading?: boolean }) {
  const { cartItemsAmount } = useCartItems();

  return <S.ProductAmount>든든배송 상품 ({isLoading ? 0 : cartItemsAmount}개)</S.ProductAmount>;
}

export default CartAmount;
