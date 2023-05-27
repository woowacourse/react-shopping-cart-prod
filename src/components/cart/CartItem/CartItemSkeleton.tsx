import * as S from './CartItem.styles';

const CartItemSkeleton = () => {
  return (
    <S.CartItemContainer>
      <S.CartItemImageWrapper className="skeleton" />
      <S.CartItemName className="skeleton" />
      <S.CartItemPriceContainer className="skeleton" />
      <S.CartItemPriceContainer className="skeleton" />
      <S.CartItemDeleteButton className="skeleton" />
    </S.CartItemContainer>
  );
};

export default CartItemSkeleton;
