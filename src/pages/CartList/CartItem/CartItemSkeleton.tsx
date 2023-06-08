import Checkbox from '@Components/Checkbox';

import * as S from './style';

const CartItemSkeleton = () => {
  return (
    <S.Container width="100%">
      <Checkbox size="small" />
      <S.ShoppingItemImage />
      <S.ShoppingItemName isLoading>로딩 중</S.ShoppingItemName>
      <S.RightContents>
        <div></div>
        <div></div>
        <S.ShoppingItemPrice isLoading>로딩 중 로딩 중</S.ShoppingItemPrice>
      </S.RightContents>
    </S.Container>
  );
};

export default CartItemSkeleton;
