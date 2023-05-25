import { useRecoilValue } from 'recoil';

import cartItemsAmountState from '@Selector/cartItemsAmountState';

import * as S from './style';

function CartAmount({ isLoading = false }: { isLoading?: boolean }) {
  const cartItemsAmount = isLoading ? 0 : useRecoilValue(cartItemsAmountState);

  return <S.ProductAmount>든든배송 상품 ({cartItemsAmount}개)</S.ProductAmount>;
}

export default CartAmount;
